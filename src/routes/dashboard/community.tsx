"use client";

import { createFileRoute } from '@tanstack/react-router';
import React, { useState, useEffect } from 'react';
import { useCommunityFeed, useCreatePost, useToggleLike } from '@/lib/communityAndAdminQueries';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, ImageIcon, Send, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/dashboard/community')({
  component: CommunityFeed,
});

export default function CommunityFeed() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useCommunityFeed();
  const createPost = useCreatePost();
  const toggleLike = useToggleLike();
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | undefined>(undefined);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setCurrentUserId(data.session?.user?.id || null);
    });
  }, []);

  const posts = data?.pages.flatMap((page) => page ?? []) ?? [];

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !file) return;
    if (!currentUserId) return;
    
    await createPost.mutateAsync({ content, file, authorId: currentUserId });
    setContent('');
    setFile(undefined);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      <Card className="rounded-3xl border-border">
        <form onSubmit={handleCreatePost}>
          <CardContent className="pt-6">
            <Textarea
              placeholder="O que você quer compartilhar com a comunidade de barbeiros?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mb-4 resize-none border-none focus-visible:ring-0 px-0 text-base"
              rows={3}
            />
            <div className="flex items-center gap-4 border-t pt-4 mt-2">
              <div className="flex-1">
                <label 
                  htmlFor="file-upload" 
                  className="cursor-pointer flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
                >
                  <ImageIcon className="w-5 h-5" />
                  {file ? <span className="truncate max-w-[200px] inline-block">{file.name}</span> : 'Anexar imagem'}
                </label>
                <Input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || undefined)}
                />
              </div>
              <Button className="rounded-xl" type="submit" disabled={createPost.isPending || (!content.trim() && !file)}>
                {createPost.isPending ? 'Publicando...' : (
                  <>
                    <Send className="w-4 h-4 mr-2" /> 
                    Publicar
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>

      <div className="space-y-6">
        {posts.map((post: any) => {
          const isLikedByMe = false;

          return (
            <Card key={post.id} className="overflow-hidden shadow-sm rounded-3xl border-border">
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src={post.profiles?.avatar_url} />
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-foreground">
                      {post.profiles?.full_name || 'Barbeiro'}
                    </span>
                    <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider rounded-full">
                      Membro
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(post.created_at).toLocaleString('pt-BR', { dateStyle: 'medium', timeStyle: 'short' })}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pb-4 space-y-4">
                {post.content && (
                  <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{post.content}</p>
                )}
                {post.media_url && (
                  <div className="relative w-full overflow-hidden rounded-2xl border border-border">
                    <img
                      src={post.media_url}
                      alt="Anexo da publicação"
                      className="w-full max-h-[500px] object-cover"
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t pt-4 flex gap-6 pb-4">
                <button
                  type="button"
                  onClick={() => {
                    if (currentUserId) {
                      toggleLike.mutate({ postId: post.id, userId: currentUserId, isLiked: isLikedByMe });
                    }
                  }}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    isLikedByMe ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLikedByMe ? 'fill-current' : ''}`} />
                  <span>{post.likes_count?.[0]?.count || 0}</span>
                </button>
                <button type="button" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments_count?.[0]?.count || 0}</span>
                </button>
              </CardFooter>
            </Card>
          );
        })}

        {hasNextPage && (
          <Button 
            variant="outline" 
            className="w-full rounded-xl" 
            onClick={() => fetchNextPage()} 
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Carregando mais...' : 'Carregar mais publicações'}
          </Button>
        )}

        {posts.length === 0 && (
          <div className="text-center text-muted-foreground py-12 border-2 border-dashed rounded-3xl border-border">
            Nenhuma publicação encontrada. Seja o primeiro a compartilhar algo!
          </div>
        )}
      </div>
    </div>
  );
}