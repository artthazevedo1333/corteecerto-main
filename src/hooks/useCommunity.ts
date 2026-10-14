import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Hook para buscar os posts com Scroll Infinito
export function useCommunityPosts() {
  return useInfiniteQuery({
    queryKey: ["community_posts"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const limit = 5;
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;

      const { data, error } = await supabase
        .from("community_posts")
        .select(`
          *,
          author:profiles(id, name, avatar_url, badge),
          likes:community_likes(user_id),
          comments:community_comments(id)
        `)
        .order("created_at", { ascending: false })
        .range(pageParam * limit, (pageParam + 1) * limit - 1);

      if (error) throw error;

      return data.map((post: any) => ({
        ...post,
        likes_count: post.likes?.length || 0,
        comments_count: post.comments?.length || 0,
        is_liked_by_me: post.likes?.some((like: any) => like.user_id === userId),
        is_saved_by_me: false, 
      }));
    },
    getNextPageParam: (lastPage: any[], allPages: any[]) => {
      return lastPage.length === 5 ? allPages.length : undefined;
    },
  });
}

// Hook para dar/remover Gosto
export function useLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, isLiked }: { postId: string; isLiked: boolean }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Não autenticado");

      if (isLiked) {
        const { error } = await supabase.from("community_likes").delete().match({ post_id: postId, user_id: user.id });
        if (error) throw error;
      } else {
        const { error } = await supabase.from("community_likes").insert({ post_id: postId, user_id: user.id });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community_posts"] });
    },
  });
}

// Hook para criar uma nova publicação
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file, description }: { file: File; description: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Não autenticado");

      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // 1. Upload da imagem
      const { error: uploadError } = await supabase.storage
        .from("community_images") // Certifica-te que este bucket existe no Supabase
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Obter URL público
      const { data: { publicUrl } } = supabase.storage
        .from("community_images")
        .getPublicUrl(filePath);

      // 3. Inserir na tabela de posts
      const { error: dbError } = await supabase
        .from("community_posts")
        .insert({
          user_id: user.id,
          image_url: publicUrl,
          description,
        });

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      toast.success("Publicação criada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["community_posts"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Erro ao criar publicação.");
    }
  });
}
// Hook para Excluir Publicação
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Não autenticado");

      // O Supabase RLs deve garantir que só o dono exclui, mas passamos o user_id por segurança
      const { error } = await supabase
        .from("community_posts")
        .delete()
        .match({ id: postId, user_id: user.id });

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Publicação removida com sucesso.");
      queryClient.invalidateQueries({ queryKey: ["community_posts"] });
    },
    onError: () => {
      toast.error("Erro ao remover a publicação.");
    }
  });
}

// Hook para Editar Publicação
export function useEditPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, description }: { postId: string; description: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Não autenticado");

      const { error } = await supabase
        .from("community_posts")
        .update({ description })
        .match({ id: postId, user_id: user.id });

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Publicação atualizada.");
      queryClient.invalidateQueries({ queryKey: ["community_posts"] });
    },
    onError: () => {
      toast.error("Erro ao atualizar a publicação.");
    }
  });
}