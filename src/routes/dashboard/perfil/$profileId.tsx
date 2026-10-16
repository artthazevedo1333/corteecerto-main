"use client";

import { createFileRoute, useRouter } from '@tanstack/react-router';
import { supabase } from '@/lib/supabase';
import { PostCard, type PostProps } from '@/components/community/PostCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, Grid, PlaySquare, Bookmark, Edit3, Loader2, Camera } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export const Route = createFileRoute('/dashboard/perfil/$profileId')({
  loader: async ({ params }) => {
    // Buscar Perfil do Barbeiro
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', params.profileId)
      .single();

    if (profileError || !profile) {
      throw new Error("Perfil não encontrado");
    }

    // Buscar Posts Deste Perfil
    const { data: rawPosts, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', params.profileId)
      .order('created_at', { ascending: false });

    const formattedPosts: PostProps[] = (rawPosts || []).map((post: any) => ({
        id: post.id,
        user_id: post.user_id,
        author: {
          id: profile.id,
          name: profile.username || profile.full_name || 'Barbeiro',
          avatar_url: profile.avatar_url || '',
        },
        image_url: post.image_url,
        description: post.caption || '',
        likes_count: 0, comments_count: 0,
        created_at: post.created_at,
        is_liked_by_me: false, is_saved_by_me: false
    }));

    return { profile, posts: formattedPosts };
  },
  component: ProfilePage,
});

function ProfilePage() {
  const { profile, posts } = Route.useLoaderData();
  const router = useRouter();
  
  // Estado para verificar se o utilizador logado é o dono do perfil
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  
  // Estados para a edição do perfil
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editName, setEditName] = useState(profile.full_name || profile.username || '');
  const [editBio, setEditBio] = useState(profile.bio || '');
  const [editBarbershop, setEditBarbershop] = useState(profile.barber_shop_name || ''); // Assumindo que criámos isto no SQL antes
  
  // Estados para a foto de perfil
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setCurrentUserId(user.id);
    };
    checkUser();
  }, []);

  const isOwner = currentUserId === profile.id;

  // Lógica de Edição de Perfil (Nome, Bio e Upload de Foto)
  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      let finalAvatarUrl = profile.avatar_url;

      // Se escolheu uma foto nova, faz o upload para o bucket 'avatars'
      if (newAvatarFile && currentUserId) {
        const fileExt = newAvatarFile.name.split('.').pop();
        const fileName = `${currentUserId}-${Math.random()}.${fileExt}`; // Nome único
        const filePath = `${currentUserId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, newAvatarFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);
          
        finalAvatarUrl = publicUrlData.publicUrl;
      }

      // Atualiza a tabela profiles
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: editName,
          bio: editBio,
          avatar_url: finalAvatarUrl,
          // barber_shop_name: editBarbershop // Descomente se tiver esta coluna na base de dados
        })
        .eq('id', profile.id);

      if (updateError) throw updateError;

      // Limpa os estados e força o recarregamento (SSR) da página
      setIsEditing(false);
      setNewAvatarFile(null);
      setAvatarPreview(null);
      router.invalidate(); 

    } catch (error) {
      console.error("Erro ao guardar perfil:", error);
      alert("Não foi possível atualizar o perfil. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-background/95 w-full pb-20">
      <div className="max-w-4xl mx-auto pt-10 px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12">
          
          <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background shadow-xl ring-2 ring-primary/20">
            <AvatarImage src={profile.avatar_url} className="object-cover" />
            <AvatarFallback className="text-4xl font-bold bg-primary text-primary-foreground">
              {profile.username?.charAt(0) || profile.full_name?.charAt(0) || "B"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black text-foreground">
                  {profile.full_name || profile.username || "Barbeiro"}
                </h1>
                <Badge variant="secondary" className="px-3 py-1 text-xs bg-primary/10 text-primary uppercase tracking-widest">
                  Elite
                </Badge>
              </div>

              {/* Botão de Editar Perfil (Apenas visível se for o dono) */}
              {isOwner && (
                <Sheet open={isEditing} onOpenChange={setIsEditing}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-full shadow-sm">
                      <Edit3 className="w-4 h-4 mr-2" /> Editar Perfil
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                    <SheetHeader className="mb-6">
                      <SheetTitle>Editar Perfil Profissional</SheetTitle>
                      <SheetDescription>Atualize a sua imagem de marca na Comunidade.</SheetDescription>
                    </SheetHeader>
                    
                    <div className="space-y-6">
                      {/* Alterar Foto */}
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                          <Avatar className="w-24 h-24 border-2 border-border">
                            <AvatarImage src={avatarPreview || profile.avatar_url} className="object-cover" />
                            <AvatarFallback>EU</AvatarFallback>
                          </Avatar>
                          <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Camera className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleAvatarSelect} />
                        <span className="text-sm text-muted-foreground">Clique na foto para alterar</span>
                      </div>

                      <div className="space-y-2">
                        <Label>Nome Artístico / Profissional</Label>
                        <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Barbearia</Label>
                        <Input placeholder="Onde trabalha?" value={editBarbershop} onChange={(e) => setEditBarbershop(e.target.value)} />
                      </div>

                      <div className="space-y-2">
                        <Label>Biografia</Label>
                        <Textarea 
                          placeholder="Fale um pouco sobre o seu estilo e especialidade..." 
                          className="resize-none h-24"
                          value={editBio} 
                          onChange={(e) => setEditBio(e.target.value)} 
                        />
                      </div>

                      <Button onClick={handleSaveProfile} disabled={isSaving} className="w-full mt-4">
                        {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                        {isSaving ? 'A Guardar...' : 'Guardar Alterações'}
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              )}
            </div>

            {/* Removemos os seguidores falsos e deixamos apenas os dados reais */}
            <div className="flex gap-6 mb-4 text-sm font-medium">
              <div className="flex flex-col"><span className="text-lg font-bold text-foreground">{posts.length}</span> <span className="text-muted-foreground">Obras</span></div>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                {profile.bio || "Sem biografia. Edite o seu perfil para adicionar mais detalhes sobre o seu trabalho."}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-4 pt-4 border-t border-border/40">
                {profile.barber_shop_name && (
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5"/> {profile.barber_shop_name}</span>
                )}
                <span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5"/> Na Elite desde {format(new Date(profile.created_at), "MMM yyyy", { locale: ptBR })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Separador de Tabs (Feed / Reels / Salvos) */}
        <div className="flex items-center justify-center gap-12 border-t border-border/60 mb-8">
          <button className="flex items-center gap-2 pt-4 border-t-2 border-primary text-foreground font-bold text-sm tracking-widest uppercase">
            <Grid className="w-4 h-4"/> Galeria
          </button>
          <button className="flex items-center gap-2 pt-4 border-t-2 border-transparent text-muted-foreground font-semibold text-sm tracking-widest uppercase hover:text-foreground">
            <PlaySquare className="w-4 h-4"/> Cortes Reels
          </button>
        </div>

        {/* Grid de Fotos (Estilo Instagram) */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4">
            {posts.map((post) => (
              <div key={post.id} className="aspect-square bg-muted relative group cursor-pointer overflow-hidden rounded-md sm:rounded-xl">
                {post.image_url ? (
                  <img src={post.image_url} alt="Corte" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                   <div className="w-full h-full flex items-center justify-center bg-secondary/50 text-xs text-muted-foreground p-2 text-center">
                     Sem Imagem
                   </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <p className="text-white font-bold flex gap-4 text-sm md:text-base">
                      <span>❤️ {post.likes_count || 0}</span>
                      <span>💬 {post.comments_count || 0}</span>
                   </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">Nenhuma obra na galeria ainda.</div>
        )}
      </div>
    </div>
  );
}