"use client";

import { createFileRoute, useRouter } from '@tanstack/react-router';
import { supabase } from '@/lib/supabase';
import { PostCard, type PostProps } from '@/components/community/PostCard';
import { useState, useRef } from 'react';
import { ImagePlus, Send, Loader2, X, Sparkles, TrendingUp, Search, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// 1. O Loader (SSR) - Mantido igual para performance
export const Route = createFileRoute('/dashboard/community')({
  loader: async () => {
    const { data: rawPosts, error } = await supabase
      .from('posts')
      .select(`
        id,
        user_id,
        image_url,
        caption,
        created_at,
        profiles (
          id,
          username,
          full_name,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar posts:', error);
      return { posts: [] };
    }

    const formattedPosts: PostProps[] = (rawPosts || []).map((post: any) => {
      const profile = Array.isArray(post.profiles) ? post.profiles[0] : post.profiles;
      return {
        id: post.id,
        user_id: post.user_id,
        author: {
          id: profile?.id || '',
          name: profile?.username || profile?.full_name || 'Barbeiro',
          avatar_url: profile?.avatar_url || '',
        },
        image_url: post.image_url,
        description: post.caption || '',
        likes_count: 0,
        comments_count: 0,
        created_at: post.created_at,
        is_liked_by_me: false,
        is_saved_by_me: false
      };
    });

    return { posts: formattedPosts };
  },
  component: ComunidadePage,
});

// 2. Componente de Criação (Agora com design mais agressivo e premium)
function CreatePostBox() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async () => {
    if (!content.trim() && !selectedImage) return;
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { alert("Sessão inválida!"); setIsSubmitting(false); return; }

      let imageUrl = '';
      if (selectedImage) {
        const fileExt = selectedImage.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;
        const { error: uploadError } = await supabase.storage.from('post_images').upload(filePath, selectedImage);
        if (uploadError) throw uploadError;
        const { data: publicUrlData } = supabase.storage.from('post_images').getPublicUrl(filePath);
        imageUrl = publicUrlData.publicUrl;
      }

      const { error: insertError } = await supabase.from('posts').insert({
        user_id: user.id, caption: content, image_url: imageUrl,
      });
      if (insertError) throw insertError;

      setContent(''); removeImage(); router.invalidate();
    } catch (error) {
      console.error("Erro:", error); alert("Falha ao publicar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-card to-secondary/20 border border-border/60 rounded-2xl p-6 mb-10 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl relative overflow-hidden group">
      {/* Detalhe de fundo subtil */}
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-700"></div>
      
      <div className="flex gap-5 relative z-10">
        <Avatar className="h-12 w-12 border-2 border-primary/20 shadow-sm">
          <AvatarFallback className="bg-primary text-primary-foreground font-black text-lg">EU</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-4">
          <Textarea 
            placeholder="Qual é a obra-prima de hoje? Partilhe com os mestres..."
            className="resize-none border-0 focus-visible:ring-0 px-1 pt-2 min-h-[60px] text-lg shadow-none bg-transparent placeholder:text-muted-foreground/60 font-medium"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
          />
          
          {imagePreview && (
            <div className="relative inline-block w-full rounded-xl overflow-hidden border-2 border-border/80 shadow-md transition-transform hover:scale-[1.01] duration-300">
              <img src={imagePreview} alt="Preview" className="w-full object-cover max-h-80" />
              <button onClick={removeImage} className="absolute top-3 right-3 bg-black/60 text-white p-2 rounded-full hover:bg-destructive transition-colors backdrop-blur-md">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border/40">
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageSelect} />
            <Button 
              variant="outline" 
              className="rounded-full px-5 border-border/50 hover:bg-secondary/50 hover:text-foreground font-medium transition-colors"
              onClick={() => fileInputRef.current?.click()}
              disabled={isSubmitting}
            >
              <ImagePlus className="w-4 h-4 mr-2 text-primary" />
              Anexar Obra
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={(!content.trim() && !selectedImage) || isSubmitting} 
              className="rounded-full px-8 py-5 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
              {isSubmitting ? 'A Publicar...' : 'Lançar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. A Página Principal
function ComunidadePage() {
  const { posts } = Route.useLoaderData();

  const handleLike = (id: string, isLiked: boolean) => console.log('Like:', id);
  const handleSave = (id: string) => console.log('Save:', id);
  const handleShare = (id: string) => console.log('Share:', id);
  const handleComment = (id: string) => console.log('Comment:', id);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-background/95 w-full relative overflow-hidden">
      
      {/* O PLUS: Animação de Fundo Premium (Tesoura Gigante Subtil) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.03] dark:opacity-[0.02]">
        <Scissors className="w-[800px] h-[800px] text-foreground animate-[spin_60s_linear_infinite]" />
      </div>

      {/* Conteúdo Principal (z-10 garante que fica por cima da marca d'água) */}
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 relative z-10">
        
        {/* Cabeçalho Premium */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/40">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-foreground flex items-center gap-3">
              Elite <span className="text-primary">Corte Certo</span>
            </h1>
            <p className="text-muted-foreground mt-1 text-sm font-medium">A maior rede de mestres barbeiros.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-secondary/50 py-2 px-4 rounded-full border border-border/50 backdrop-blur-sm">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-foreground">Em Alta</span>
          </div>
        </div>
        
        {/* Barra de Pesquisa */}
        <div className="mb-8 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Procurar mestres barbeiros ou barbearias..." 
              className="w-full h-14 pl-12 pr-4 rounded-full border border-border/60 bg-card shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-base backdrop-blur-sm"
            />
          </div>
        </div>
        
        {/* Carrossel de Stories */}
        <div className="flex gap-4 overflow-x-auto pb-6 mb-4 custom-scrollbar">
           <div className="flex flex-col items-center gap-2 cursor-pointer flex-shrink-0">
              <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 to-primary">
                 <Avatar className="w-full h-full border-2 border-background"><AvatarFallback className="font-bold text-xs bg-card">EU</AvatarFallback></Avatar>
              </div>
              <span className="text-xs font-semibold text-foreground">Meu Story</span>
           </div>
           {[1, 2, 3, 4, 5, 6].map(i => (
             <div key={i} className="flex flex-col items-center gap-2 cursor-pointer flex-shrink-0 hover:scale-105 transition-transform">
                <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-muted to-muted-foreground/30">
                   <Avatar className="w-full h-full border-2 border-background"><AvatarFallback className="text-xs bg-card">B{i}</AvatarFallback></Avatar>
                </div>
                <span className="text-xs font-medium text-muted-foreground">Mestre {i}</span>
             </div>
           ))}
        </div>

        <CreatePostBox />
        
        {/* Feed de Posts */}
        {posts && posts.length > 0 ? (
          <div className="space-y-10 relative z-10">
            {posts.map((post) => (
              <div key={post.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
                <PostCard 
                  post={post} 
                  currentUserId={undefined} 
                  onLike={handleLike}
                  onSave={handleSave}
                  onShare={handleShare}
                  onComment={handleComment}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl shadow-sm relative z-10">
            <div className="bg-primary/10 p-5 rounded-full mb-6 animate-pulse">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">A Tela Está em Branco</h3>
            <p className="text-muted-foreground max-w-md">
              Ainda não há trabalhos partilhados. Seja a lenda que inaugura a nossa galeria de arte.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}