"use client";

import { createFileRoute } from '@tanstack/react-router';
import { supabase } from '@/lib/supabase';
import { PostCard, type PostProps } from '@/components/community/PostCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, Grid, PlaySquare, Bookmark } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// 1. O Loader: Busca os dados do perfil e os posts APENAS desse utilizador
export const Route = createFileRoute('/dashboard/perfil/$profileId')({
  loader: async ({ params }) => {
    // Buscar Perfil
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

    // Buscar "Status/Stories" futuros
    // const stories = await fetchStories(params.profileId);

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

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-background/95 w-full pb-20">
      {/* Header do Perfil (Estilo Capa/Instagram) */}
      <div className="max-w-4xl mx-auto pt-10 px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12">
          
          <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background shadow-xl ring-2 ring-primary/20">
            <AvatarImage src={profile.avatar_url} className="object-cover" />
            <AvatarFallback className="text-4xl font-bold bg-primary text-primary-foreground">
              {profile.username?.charAt(0) || profile.full_name?.charAt(0) || "B"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <h1 className="text-3xl font-black text-foreground">
                {profile.username || profile.full_name || "Barbeiro Elite"}
              </h1>
              <div className="flex gap-2">
                <Badge variant="secondary" className="px-3 py-1 text-sm bg-primary/10 text-primary hover:bg-primary/20">
                  Mestre Barbeiro
                </Badge>
              </div>
            </div>

            <div className="flex gap-6 mb-4 text-sm font-medium">
              <div className="flex flex-col"><span className="text-lg font-bold text-foreground">{posts.length}</span> <span className="text-muted-foreground">Obras</span></div>
              <div className="flex flex-col"><span className="text-lg font-bold text-foreground">1.2k</span> <span className="text-muted-foreground">Seguidores</span></div>
              <div className="flex flex-col"><span className="text-lg font-bold text-foreground">342</span> <span className="text-muted-foreground">Seguindo</span></div>
            </div>

            <div className="space-y-1">
              <p className="font-semibold text-foreground">{profile.full_name}</p>
              <p className="text-sm text-foreground/80 whitespace-pre-wrap">
                {profile.bio || "Especialista em Fade e Navalha. Transformando visuais diariamente. ✂️🔥"}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3 pt-3 border-t border-border/40">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> Barbearia Central</span>
                <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3"/> Na Elite desde {format(new Date(profile.created_at), "MMM yyyy", { locale: ptBR })}</span>
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
          <button className="flex items-center gap-2 pt-4 border-t-2 border-transparent text-muted-foreground font-semibold text-sm tracking-widest uppercase hover:text-foreground">
            <Bookmark className="w-4 h-4"/> Coleção
          </button>
        </div>

        {/* Grid de Fotos (Estilo Instagram) */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4">
            {posts.map((post) => (
              <div key={post.id} className="aspect-square bg-muted relative group cursor-pointer overflow-hidden rounded-md sm:rounded-xl">
                <img src={post.image_url} alt="Corte" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <p className="text-white font-bold flex gap-4 text-sm md:text-base">
                      <span>❤️ 120</span>
                      <span>💬 45</span>
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