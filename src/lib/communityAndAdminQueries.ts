import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useCommunityFeed = (limit = 10) => {
  return useInfiniteQuery({
    queryKey: ['communityFeed'],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * limit;
      const to = from + limit - 1;

      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          likes_count:community_likes(count),
          comments_count:community_comments(count)
        `)
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;
      return data;
    },
        initialPageParam: 0,
    getNextPageParam: (lastPage: any[] | null, allPages: any[][]) => {
      return lastPage && lastPage.length === limit ? allPages.length : undefined;
    },
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file, content, authorId }: { file?: File; content: string; authorId: string }) => {
      let mediaUrl = null;

      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('community_media')
          .upload(fileName, file);
          
        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('community_media')
          .getPublicUrl(fileName);
          
        mediaUrl = publicUrlData.publicUrl;
      }

      const { data, error } = await supabase
        .from('community_posts')
        .insert({ 
          content, 
          media_url: mediaUrl, 
          author_id: authorId 
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communityFeed'] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      const { error } = await supabase
        .from('community_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communityFeed'] });
    },
  });
};

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, userId, isLiked }: { postId: string; userId: string; isLiked: boolean }) => {
      if (isLiked) {
        const { error } = await supabase
          .from('community_likes')
          .delete()
          .eq('post_id', postId)
          .eq('author_id', userId); // Corrigido de user_id para author_id conforme o SQL da Fase 1
          
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('community_likes')
          .insert({ post_id: postId, author_id: userId }); // Corrigido de user_id para author_id
          
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communityFeed'] });
    },
  });
};

export const useAddAdminToWhitelist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase
        .from('admin_whitelist')
        .insert({ email })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminWhitelist'] });
    },
  });
};

export const useRemoveAdminFromWhitelist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (email: string) => {
      const { error } = await supabase
        .from('admin_whitelist')
        .delete()
        .eq('email', email);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminWhitelist'] });
    },
  });
};
