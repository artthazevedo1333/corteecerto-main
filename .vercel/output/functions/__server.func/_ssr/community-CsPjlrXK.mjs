import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { d as Button, T as Textarea, A as Avatar, a as AvatarImage, b as AvatarFallback, B as Badge, c as cn } from "./router-DONcpGkq.mjs";
import { R as Root2, T as Trigger, P as Portal2, C as Content2, I as Item2, S as SubTrigger2, a as SubContent2, b as CheckboxItem2, c as ItemIndicator2, d as RadioItem2, L as Label2, e as Separator2 } from "../_libs/radix-ui__react-dropdown-menu.mjs";
import { a as useQueryClient, b as useMutation, u as useInfiniteQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-DsJMwvTf.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./dialog-2PAumXzc.mjs";
import { P as Plus, b as ImagePlus, X, L as LoaderCircle, E as EllipsisVertical, c as Pen, T as Trash2, d as CalendarClock, a as Heart, M as MessageCircle, e as Share2, B as Bookmark, f as ChevronRight, g as Check, h as Circle } from "../_libs/lucide-react.mjs";
import { f as formatDistanceToNow, p as ptBR } from "../_libs/date-fns.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/zod.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
const DropdownMenu = Root2;
const DropdownMenuTrigger = Trigger;
const DropdownMenuSubTrigger = reactExports.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SubTrigger2,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
const DropdownMenuSubContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SubContent2,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = SubContent2.displayName;
const DropdownMenuContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = Content2.displayName;
const DropdownMenuItem = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Item2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = Item2.displayName;
const DropdownMenuCheckboxItem = reactExports.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  CheckboxItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
const DropdownMenuRadioItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  RadioItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
const DropdownMenuLabel = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label2,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = Label2.displayName;
const DropdownMenuSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator2,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = Separator2.displayName;
function useCommunityPosts() {
  return useInfiniteQuery({
    queryKey: ["community_posts"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const limit = 5;
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      const { data, error } = await supabase.from("community_posts").select(`
          *,
          author:profiles(id, name, avatar_url, badge),
          likes:community_likes(user_id),
          comments:community_comments(id)
        `).order("created_at", { ascending: false }).range(pageParam * limit, (pageParam + 1) * limit - 1);
      if (error) throw error;
      return data.map((post) => ({
        ...post,
        likes_count: post.likes?.length || 0,
        comments_count: post.comments?.length || 0,
        is_liked_by_me: post.likes?.some((like) => like.user_id === userId),
        is_saved_by_me: false
      }));
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 5 ? allPages.length : void 0;
    }
  });
}
function useLikePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ postId, isLiked }) => {
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
    }
  });
}
function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ file, description }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Não autenticado");
      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;
      const { error: uploadError } = await supabase.storage.from("community_images").upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from("community_images").getPublicUrl(filePath);
      const { error: dbError } = await supabase.from("community_posts").insert({
        user_id: user.id,
        image_url: publicUrl,
        description
      });
      if (dbError) throw dbError;
    },
    onSuccess: () => {
      toast.success("Publicação criada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["community_posts"] });
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao criar publicação.");
    }
  });
}
function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postId) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Não autenticado");
      const { error } = await supabase.from("community_posts").delete().match({ id: postId, user_id: user.id });
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
function useEditPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ postId, description }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Não autenticado");
      const { error } = await supabase.from("community_posts").update({ description }).match({ id: postId, user_id: user.id });
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
function PostCard({ post, currentUserId, onLike, onSave, onShare, onComment }) {
  const isOwner = currentUserId === post.user_id;
  const deletePost = useDeletePost();
  const editPost = useEditPost();
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [editContent, setEditContent] = reactExports.useState(post.description);
  const handleSaveEdit = () => {
    if (editContent.trim() === post.description) {
      setIsEditing(false);
      return;
    }
    editPost.mutate({ postId: post.id, description: editContent }, {
      onSuccess: () => setIsEditing(false)
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "bg-card text-card-foreground border border-border rounded-xl overflow-hidden mb-8 shadow-sm transition-all hover:shadow-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 cursor-pointer group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-10 w-10 border border-border ring-2 ring-transparent group-hover:ring-primary/20 transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: post.author?.avatar_url, alt: post.author?.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-secondary text-secondary-foreground", children: post.author?.name?.charAt(0) || "B" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm hover:underline", children: post.author?.name || "Barbeiro" }),
            post.author?.badge && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "bg-primary/10 text-primary hover:bg-primary/20 text-[10px] px-2 py-0", children: post.author.badge })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: post.created_at ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ptBR }) : "agora mesmo" })
        ] })
      ] }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-5 w-5" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => setIsEditing(true), className: "cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-4 h-4 mr-2" }),
            "Editar"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            DropdownMenuItem,
            {
              onClick: () => deletePost.mutate(post.id),
              className: "cursor-pointer text-destructive focus:text-destructive",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 mr-2" }),
                "Excluir"
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative aspect-[4/5] w-full bg-secondary group cursor-pointer overflow-hidden",
        onDoubleClick: () => onLike(post.id, post.is_liked_by_me),
        children: [
          post.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: post.image_url,
              alt: "Corte",
              className: "object-cover w-full h-full transition-transform duration-500 group-hover:scale-105",
              loading: "lazy"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-muted-foreground", children: "Sem imagem" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "w-4 h-4 mr-2" }),
            "Agendar Horário"
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 pb-2 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onLike(post.id, post.is_liked_by_me), className: "group flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `h-6 w-6 transition-all active:scale-75 ${post.is_liked_by_me ? "fill-red-500 text-red-500" : "text-foreground group-hover:text-muted-foreground"}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: post.likes_count || 0 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onComment(post.id), className: "group flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-6 w-6 text-foreground group-hover:text-muted-foreground transition-colors" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: post.comments_count || 0 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onShare(post.id), className: "group flex items-center gap-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-5 w-5 text-foreground group-hover:text-muted-foreground transition-colors" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onSave(post.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: `h-6 w-6 transition-all active:scale-75 ${post.is_saved_by_me ? "fill-foreground text-foreground" : "text-foreground hover:text-muted-foreground"}` }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-5", children: isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          value: editContent,
          onChange: (e) => setEditContent(e.target.value),
          className: "resize-none min-h-[80px] text-sm",
          autoFocus: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => {
          setIsEditing(false);
          setEditContent(post.description);
        }, children: "Cancelar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: handleSaveEdit, disabled: editPost.isPending, children: "Salvar" })
      ] })
    ] }) : post.description && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground mr-2", children: post.author?.name }),
      post.description
    ] }) })
  ] });
}
function CommunityFeed() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useCommunityPosts();
  const likePost = useLikePost();
  const [currentUserId, setCurrentUserId] = reactExports.useState();
  reactExports.useEffect(() => {
    supabase.auth.getUser().then(({ data: data2 }) => {
      if (data2?.user) setCurrentUserId(data2.user.id);
    });
  }, []);
  const handleLike = (id, isLiked) => {
    likePost.mutate({ postId: id, isLiked });
  };
  const handleSave = (id) => {
    console.log("Guardar post:", id);
  };
  const handleShare = (id) => {
    console.log("Partilhar post:", id);
  };
  const handleComment = (id) => {
    console.log("Comentar post:", id);
  };
  if (status === "pending") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary" }) });
  }
  if (status === "error") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-destructive py-8 font-medium", children: "Erro ao carregar o feed da comunidade." });
  }
  if (!data?.pages[0] || data.pages[0].length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-muted-foreground py-20", children: "Nenhuma publicação encontrada. Seja o primeiro a partilhar um corte!" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md mx-auto py-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: data.pages.map((page, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: page.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      PostCard,
      {
        post,
        currentUserId,
        onLike: handleLike,
        onSave: handleSave,
        onShare: handleShare,
        onComment: handleComment
      },
      post.id
    )) }, i)) }),
    hasNextPage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 text-center flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => fetchNextPage(),
        disabled: isFetchingNextPage,
        className: "text-primary text-sm font-semibold hover:underline disabled:opacity-50 flex items-center gap-2",
        children: [
          isFetchingNextPage && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
          isFetchingNextPage ? "A carregar..." : "Carregar mais inspirações"
        ]
      }
    ) })
  ] });
}
function CreatePostModal({ children }) {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  const [previewUrl, setPreviewUrl] = reactExports.useState(null);
  const [description, setDescription] = reactExports.useState("");
  const fileInputRef = reactExports.useRef(null);
  const createPost = useCreatePost();
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };
  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleSubmit = async () => {
    if (!selectedFile) return;
    createPost.mutate({ file: selectedFile, description }, {
      onSuccess: () => {
        setIsOpen(false);
        clearSelection();
        setDescription("");
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md bg-zinc-950 border-zinc-900 text-zinc-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-xl font-semibold", children: "Nova Publicação" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 mt-4", children: [
        !previewUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            onClick: () => fileInputRef.current?.click(),
            className: "border-2 border-dashed border-zinc-800 rounded-xl aspect-[4/5] flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-zinc-900/50 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-10 h-10 text-zinc-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-zinc-400", children: "Toque para escolher uma foto" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] w-full rounded-xl overflow-hidden group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: previewUrl, alt: "Preview", className: "object-cover w-full h-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "destructive",
              size: "icon",
              className: "absolute top-2 right-2 rounded-full opacity-80 hover:opacity-100",
              onClick: clearSelection,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "file",
            accept: "image/*",
            className: "hidden",
            ref: fileInputRef,
            onChange: handleFileSelect
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            placeholder: "Adicione uma legenda... (ex: Low fade com textura ✂️)",
            className: "bg-zinc-900 border-zinc-800 resize-none h-24 focus-visible:ring-amber-500",
            value: description,
            onChange: (e) => setDescription(e.target.value)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold",
            disabled: !selectedFile || createPost.isPending,
            onClick: handleSubmit,
            children: createPost.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
              "A Publicar..."
            ] }) : "Partilhar na Comunidade"
          }
        )
      ] })
    ] })
  ] });
}
function CommunityPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 h-full flex flex-col bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6 max-w-md mx-auto w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Hub" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CreatePostModal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-primary hover:bg-primary/90 text-primary-foreground font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
        "Publicar"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto custom-scrollbar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CommunityFeed, {}) })
  ] });
}
export {
  CommunityPage as component
};
