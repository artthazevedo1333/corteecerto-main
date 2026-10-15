"use client";

import { useState } from "react";
import { Heart, MessageCircle, Bookmark, Share2, MoreVertical, Edit2, Trash2, CalendarClock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useDeletePost, useEditPost } from "@/hooks/useCommunity";
import { Textarea } from "@/components/ui/textarea";

export interface PostProps {
  id: string;
  user_id: string; // Para checar se o post é do utilizador logado
  author: {
    id: string;
    name: string;
    avatar_url: string;
    badge?: string;
  };
  image_url: string;
  description: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  is_liked_by_me: boolean;
  is_saved_by_me: boolean;
}

export function PostCard({ post, currentUserId, onLike, onSave, onShare, onComment }: { 
  post: PostProps;
  currentUserId?: string;
  onLike: (id: string, isLiked: boolean) => void;
  onSave: (id: string) => void;
  onShare: (id: string) => void;
  onComment: (id: string) => void;
}) {
  const isOwner = currentUserId === post.user_id;
  const deletePost = useDeletePost();
  const editPost = useEditPost();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.description);

  const handleSaveEdit = () => {
    if (editContent.trim() === post.description) {
      setIsEditing(false);
      return;
    }
    editPost.mutate({ postId: post.id, description: editContent }, {
      onSuccess: () => setIsEditing(false)
    });
  };

  return (
    <article className="bg-card text-card-foreground border border-border rounded-xl overflow-hidden mb-8 shadow-sm transition-all hover:shadow-md">
      {/* Cabeçalho do Post */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3 cursor-pointer group">
          <Avatar className="h-10 w-10 border border-border ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
            <AvatarImage src={post.author?.avatar_url} alt={post.author?.name} />
            <AvatarFallback className="bg-secondary text-secondary-foreground">
              {post.author?.name?.charAt(0) || "B"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm hover:underline">
                {post.author?.name || "Barbeiro"}
              </span>
              {post.author?.badge && (
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 text-[10px] px-2 py-0">
                  {post.author.badge}
                </Badge>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {post.created_at ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ptBR }) : "agora mesmo"}
            </span>
          </div>
        </div>

        {/* Menu de Ações (Apenas para o Dono) */}
        {isOwner && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => setIsEditing(true)} className="cursor-pointer">
                <Edit2 className="w-4 h-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => deletePost.mutate(post.id)} 
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Imagem (Proporção Premium) */}
      <div 
        className="relative aspect-[4/5] w-full bg-secondary group cursor-pointer overflow-hidden" 
        onDoubleClick={() => onLike(post.id, post.is_liked_by_me)}
      >
        {post.image_url ? (
          <img 
            src={post.image_url} 
            alt="Corte"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Sem imagem
          </div>
        )}
        
        {/* Call to Action Cliente (Hover) */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
           <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
             <CalendarClock className="w-4 h-4 mr-2" />
             Agendar Horário
           </Button>
        </div>
      </div>

      {/* Barra de Engajamento */}
      <div className="p-4 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button onClick={() => onLike(post.id, post.is_liked_by_me)} className="group flex items-center gap-1.5">
            <Heart className={`h-6 w-6 transition-all active:scale-75 ${post.is_liked_by_me ? 'fill-red-500 text-red-500' : 'text-foreground group-hover:text-muted-foreground'}`} />
            <span className="text-sm font-semibold">{post.likes_count || 0}</span>
          </button>
          <button onClick={() => onComment(post.id)} className="group flex items-center gap-1.5">
            <MessageCircle className="h-6 w-6 text-foreground group-hover:text-muted-foreground transition-colors" />
            <span className="text-sm font-semibold">{post.comments_count || 0}</span>
          </button>
          <button onClick={() => onShare(post.id)} className="group flex items-center gap-1.5">
            <Share2 className="h-5 w-5 text-foreground group-hover:text-muted-foreground transition-colors" />
          </button>
        </div>
        <button onClick={() => onSave(post.id)}>
          <Bookmark className={`h-6 w-6 transition-all active:scale-75 ${post.is_saved_by_me ? 'fill-foreground text-foreground' : 'text-foreground hover:text-muted-foreground'}`} />
        </button>
      </div>

      {/* Legenda e Edição */}
      <div className="px-4 pb-5">
        {isEditing ? (
          <div className="flex flex-col gap-2 mt-2">
            <Textarea 
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="resize-none min-h-[80px] text-sm"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="ghost" onClick={() => { setIsEditing(false); setEditContent(post.description); }}>Cancelar</Button>
              <Button size="sm" onClick={handleSaveEdit} disabled={editPost.isPending}>Salvar</Button>
            </div>
          </div>
        ) : (
          post.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground mr-2">{post.author?.name}</span>
              {post.description}
            </p>
          )
        )}
      </div>
    </article>
  );
}