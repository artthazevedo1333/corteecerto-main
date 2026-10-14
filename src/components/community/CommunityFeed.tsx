import { useEffect, useState } from "react";
import { PostCard, PostProps } from "./PostCard";
import { useCommunityPosts, useLikePost } from "@/hooks/useCommunity";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export function CommunityFeed() {
  // Trazemos os dados reais do Supabase via React Query
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useCommunityPosts();
  const likePost = useLikePost();
  
  const [currentUserId, setCurrentUserId] = useState<string>();

  // Descobrir quem é o utilizador logado para passar ao PostCard (para a edição)
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setCurrentUserId(data.user.id);
    });
  }, []);

  // Agora o onLike recebe o ID e se já tem gosto
  const handleLike = (id: string, isLiked: boolean) => {
    likePost.mutate({ postId: id, isLiked });
  };

  const handleSave = (id: string) => {
    console.log("Guardar post:", id);
  };

  const handleShare = (id: string) => {
    console.log("Partilhar post:", id);
  };

  const handleComment = (id: string) => {
    console.log("Comentar post:", id);
  };

  if (status === "pending") {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center text-destructive py-8 font-medium">
        Erro ao carregar o feed da comunidade.
      </div>
    );
  }

  // Se não houver posts
  if (!data?.pages[0] || data.pages[0].length === 0) {
    return (
      <div className="text-center text-muted-foreground py-20">
        Nenhuma publicação encontrada. Seja o primeiro a partilhar um corte!
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto py-6">
      <div className="flex flex-col gap-2">
        {data.pages.map((page, i) => (
          <div key={i}>
            {page.map((post: PostProps) => (
              <PostCard 
                key={post.id} 
                post={post} 
                currentUserId={currentUserId}
                onLike={handleLike}
                onSave={handleSave}
                onShare={handleShare}
                onComment={handleComment}
              />
            ))}
          </div>
        ))}
      </div>
      
      {/* Botão de carregar mais (Scroll Infinito) */}
      {hasNextPage && (
        <div className="py-8 text-center flex justify-center">
          <button 
            onClick={() => fetchNextPage()} 
            disabled={isFetchingNextPage}
            className="text-primary text-sm font-semibold hover:underline disabled:opacity-50 flex items-center gap-2"
          >
            {isFetchingNextPage && <Loader2 className="w-4 h-4 animate-spin" />}
            {isFetchingNextPage ? "A carregar..." : "Carregar mais inspirações"}
          </button>
        </div>
      )}
    </div>
  );
}