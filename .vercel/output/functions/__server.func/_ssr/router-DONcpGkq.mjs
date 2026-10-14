import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useInfiniteQuery, a as useQueryClient, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { S as redirect } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { s as supabase } from "./client-DsJMwvTf.mjs";
import { R as Root, I as Image$1, F as Fallback } from "../_libs/radix-ui__react-avatar.mjs";
import { C as CircleAlert, R as RefreshCcw, H as House, L as LoaderCircle, I as Image, S as Send, a as Heart, M as MessageCircle } from "../_libs/lucide-react.mjs";
import { o as object, b as boolean, s as string, n as number } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/use-sync-external-store.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const Card = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
class ErrorBoundary extends reactExports.Component {
  state = {
    hasError: false,
    error: null
  };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[400px] w-full items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-md border-destructive/20 shadow-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "text-center pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-10 w-10 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl font-black uppercase tracking-tight", children: "Ops! Algo deu errado" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "text-center space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "Ocorreu um erro ao carregar esta seção. Não se preocupe, seus dados estão seguros." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-secondary/50 p-3 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground break-all", children: this.state.error?.message || "Erro desconhecido" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFooter, { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => window.location.reload(),
              className: "w-full font-black h-12 rounded-xl",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCcw, { className: "mr-2 h-4 w-4" }),
                " RECARREGAR PÁGINA"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => window.location.href = "/dashboard",
              className: "w-full font-black h-12 rounded-xl",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "mr-2 h-4 w-4" }),
                " VOLTAR AO INÍCIO"
              ]
            }
          )
        ] })
      ] }) });
    }
    return this.props.children;
  }
}
const appCss = "/assets/styles-CKGf1yR2.css";
function registerServiceWorker() {
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
    });
  });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Página não encontrada" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "A página que você está procurando não existe ou foi movida." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Voltar ao Início"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "Erro ao carregar página" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Ocorreu um erro inesperado. Tente atualizar a página ou volte para o início." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Tentar novamente"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Ir para o Início"
        }
      )
    ] })
  ] }) });
}
const Route$v = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Corte Certo" },
      {
        name: "description",
        content: "Corte Certo is a SaaS application for barbershops to manage appointments, clients, and business operations."
      },
      { name: "author", content: "Corte Certo" },
      { property: "og:title", content: "Corte Certo" },
      {
        property: "og:description",
        content: "Corte Certo is a SaaS application for barbershops to manage appointments, clients, and business operations."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Corte Certo" },
      {
        name: "twitter:description",
        content: "Corte Certo is a SaaS application for barbershops to manage appointments, clients, and business operations."
      },
      {
        property: "og:image",
        content: "/favicon.png?v=2"
      },
      {
        name: "twitter:image",
        content: "/favicon.png?v=2"
      }
    ],
    links: [
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon.png?v=2"
      },
      {
        rel: "stylesheet",
        href: appCss
      },
      {
        rel: "manifest",
        href: "/manifest.webmanifest"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "pt-BR", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$v.useRouteContext();
  reactExports.useEffect(() => {
    registerServiceWorker();
  }, []);
  reactExports.useEffect(() => {
    const handleError = (e) => {
      if (e.message === "ResizeObserver loop completed with undelivered notifications." || e.message === "ResizeObserver loop limit exceeded") {
        const resizeObserverErrDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div"
        );
        const resizeObserverErr = document.getElementById("webpack-dev-server-client-overlay");
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute("style", "display: none");
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute("style", "display: none");
        }
        e.stopImmediatePropagation();
      }
    };
    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) });
}
const Route$u = createFileRoute("/owner")({
  beforeLoad: () => {
    throw redirect({ to: "/admin" });
  }
});
const $$splitComponentImporter$r = () => import("./community-CsPjlrXK.mjs");
const Route$t = createFileRoute("/community")({
  component: lazyRouteComponent($$splitComponentImporter$r, "component")
});
const $$splitComponentImporter$q = () => import("./admin-Bxxymu-J.mjs");
const Route$s = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Admin SaaS — Corte Certo"
    }, {
      name: "description",
      content: "Painel master do proprietário para gestão administrativa do Corte Certo."
    }]
  }),
  // Removemos o beforeLoad daqui para evitar o bloqueio prematuro
  component: lazyRouteComponent($$splitComponentImporter$q, "component")
});
const $$splitComponentImporter$p = () => import("./index-Cvds9wBV.mjs");
const SITE_URL = "http://localhost:3000";
const OG_IMAGE = "/favicon.ico";
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Corte Certo",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Sistema de gestão mobile-first para barbearias: agenda, clientes, financeiro, estoque e agendamento online.",
  url: SITE_URL,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL"
  }
};
const Route$r = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Corte Certo — Gestão Completa para Barbearias"
    }, {
      name: "description",
      content: "Agenda inteligente, clientes, financeiro e estoque em um só lugar. Sistema mobile-first para barbeiros que levam o negócio a sério."
    }, {
      property: "og:title",
      content: "Corte Certo — Gestão Completa para Barbearias"
    }, {
      property: "og:description",
      content: "Agenda inteligente, clientes, financeiro e estoque em um só lugar. Sistema mobile-first para barbearias."
    }, {
      property: "og:type",
      content: "website"
    }, {
      property: "og:url",
      content: SITE_URL
    }, {
      property: "og:image",
      content: OG_IMAGE
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }, {
      name: "twitter:title",
      content: "Corte Certo — Gestão Completa para Barbearias"
    }, {
      name: "twitter:description",
      content: "Agenda, clientes, financeiro e estoque para sua barbearia."
    }, {
      name: "twitter:image",
      content: OG_IMAGE
    }],
    links: [{
      rel: "canonical",
      href: SITE_URL + "/"
    }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify(JSON_LD)
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$p, "component")
});
const $$splitComponentImporter$o = () => import("./index-DxU-zlAO.mjs");
const Route$q = createFileRoute("/auth/")({
  validateSearch: (search) => {
    return {
      mode: search.mode || "login",
      next: typeof search.next === "string" ? search.next : void 0
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const useCommunityFeed = (limit = 10) => {
  return useInfiniteQuery({
    queryKey: ["communityFeed"],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * limit;
      const to = from + limit - 1;
      const { data, error } = await supabase.from("community_posts").select(`
          *,
          likes_count:community_likes(count),
          comments_count:community_comments(count)
        `).order("created_at", { ascending: false }).range(from, to);
      if (error) throw error;
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage && lastPage.length === limit ? allPages.length : void 0;
    }
  });
};
const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ file, content, authorId }) => {
      let mediaUrl = null;
      if (file) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from("community_media").upload(fileName, file);
        if (uploadError) throw uploadError;
        const { data: publicUrlData } = supabase.storage.from("community_media").getPublicUrl(fileName);
        mediaUrl = publicUrlData.publicUrl;
      }
      const { data, error } = await supabase.from("community_posts").insert({
        content,
        media_url: mediaUrl,
        author_id: authorId
      }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communityFeed"] });
    }
  });
};
const useToggleLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ postId, userId, isLiked }) => {
      if (isLiked) {
        const { error } = await supabase.from("community_likes").delete().eq("post_id", postId).eq("author_id", userId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("community_likes").insert({ post_id: postId, author_id: userId });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communityFeed"] });
    }
  });
};
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Avatar = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    ref,
    className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
    ...props
  }
));
Avatar.displayName = Root.displayName;
const AvatarImage = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Image$1,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = Image$1.displayName;
const AvatarFallback = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = Fallback.displayName;
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const Route$p = createFileRoute("/dashboard/community")({
  component: CommunityFeed
});
function CommunityFeed() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useCommunityFeed();
  const createPost = useCreatePost();
  const toggleLike = useToggleLike();
  const [content, setContent] = reactExports.useState("");
  const [file, setFile] = reactExports.useState(void 0);
  const [currentUserId, setCurrentUserId] = reactExports.useState(null);
  reactExports.useEffect(() => {
    supabase.auth.getSession().then(({ data: data2 }) => {
      setCurrentUserId(data2.session?.user?.id || null);
    });
  }, []);
  const posts = data?.pages.flatMap((page) => page ?? []) ?? [];
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!content.trim() && !file) return;
    if (!currentUserId) return;
    await createPost.mutateAsync({ content, file, authorId: currentUserId });
    setContent("");
    setFile(void 0);
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[400px] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto py-8 px-4 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-3xl border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleCreatePost, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          placeholder: "O que você quer compartilhar com a comunidade de barbeiros?",
          value: content,
          onChange: (e) => setContent(e.target.value),
          className: "mb-4 resize-none border-none focus-visible:ring-0 px-0 text-base",
          rows: 3
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 border-t pt-4 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: "file-upload",
              className: "cursor-pointer flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-5 h-5" }),
                file ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[200px] inline-block", children: file.name }) : "Anexar imagem"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "file-upload",
              type: "file",
              accept: "image/*",
              className: "hidden",
              onChange: (e) => setFile(e.target.files?.[0] || void 0)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "rounded-xl", type: "submit", disabled: createPost.isPending || !content.trim() && !file, children: createPost.isPending ? "Publicando..." : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4 mr-2" }),
          "Publicar"
        ] }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      posts.map((post) => {
        const isLikedByMe = false;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden shadow-sm rounded-3xl border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center gap-4 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-10 h-10 border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: post.profiles?.avatar_url }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: "B" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: post.profiles?.full_name || "Barbeiro" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-[10px] uppercase font-bold tracking-wider rounded-full", children: "Membro" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: new Date(post.created_at).toLocaleString("pt-BR", { dateStyle: "medium", timeStyle: "short" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pb-4 space-y-4", children: [
            post.content && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground whitespace-pre-wrap leading-relaxed", children: post.content }),
            post.media_url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full overflow-hidden rounded-2xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: post.media_url,
                alt: "Anexo da publicação",
                className: "w-full max-h-[500px] object-cover"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFooter, { className: "border-t pt-4 flex gap-6 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  if (currentUserId) {
                    toggleLike.mutate({ postId: post.id, userId: currentUserId, isLiked: isLikedByMe });
                  }
                },
                className: `flex items-center gap-1.5 text-sm font-medium transition-colors ${"text-muted-foreground hover:text-red-500"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `w-5 h-5 ${""}` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: post.likes_count?.[0]?.count || 0 })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: post.comments_count?.[0]?.count || 0 })
            ] })
          ] })
        ] }, post.id);
      }),
      hasNextPage && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          className: "w-full rounded-xl",
          onClick: () => fetchNextPage(),
          disabled: isFetchingNextPage,
          children: isFetchingNextPage ? "Carregando mais..." : "Carregar mais publicações"
        }
      ),
      posts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-muted-foreground py-12 border-2 border-dashed rounded-3xl border-border", children: "Nenhuma publicação encontrada. Seja o primeiro a compartilhar algo!" })
    ] })
  ] });
}
const $$splitComponentImporter$n = () => import("../_layout-XtNQKbKJ.mjs");
const Route$o = createFileRoute("/dashboard/_layout")({
  staticData: {
    adminOnly: false
  },
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("../_slug-DaNL6nKR.mjs");
const Route$n = createFileRoute("/booking/$slug")({
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("./reset-C2t2HsXG.mjs");
const Route$m = createFileRoute("/auth/reset")({
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./index-B_B1bRk1.mjs");
const Route$l = createFileRoute("/dashboard/_layout/")({
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./vip-plans-hbq6O6x4.mjs");
const Route$k = createFileRoute("/dashboard/_layout/vip-plans")({
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
object({
  name: string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  price: number().min(0, "Preço deve ser positivo"),
  validity_days: number().min(1, "Validade mínima de 1 dia"),
  includesText: string().optional(),
  is_active: boolean()
});
const $$splitComponentImporter$i = () => import("./subscription-BvlPAXx2.mjs");
const Route$j = createFileRoute("/dashboard/_layout/subscription")({
  head: () => ({
    meta: [{
      title: "Assinatura — Corte Certo"
    }, {
      name: "description",
      content: "Gerencie seu plano, pagamento e faturamento do Corte Certo."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./settings-gnk-7iXO.mjs");
const Route$i = createFileRoute("/dashboard/_layout/settings")({
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./services-Cmaj5Jzn.mjs");
const Route$h = createFileRoute("/dashboard/_layout/services")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./reports-2-nSI3US.mjs");
const Route$g = createFileRoute("/dashboard/_layout/reports")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./recovery-CLjJwaqi.mjs");
const Route$f = createFileRoute("/dashboard/_layout/recovery")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./modules-B8tZ5Vq9.mjs");
const Route$e = createFileRoute("/dashboard/_layout/modules")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./inventory-CcwjQZvg.mjs");
const Route$d = createFileRoute("/dashboard/_layout/inventory")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./finance-B5iMsWgy.mjs");
const Route$c = createFileRoute("/dashboard/_layout/finance")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./crm-Ddwula_L.mjs");
const Route$b = createFileRoute("/dashboard/_layout/crm")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./commissions-t8Lbmafi.mjs");
const Route$a = createFileRoute("/dashboard/_layout/commissions")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./clients-pEcx94sg.mjs");
const Route$9 = createFileRoute("/dashboard/_layout/clients")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./booking-B9NuRRnG.mjs");
const Route$8 = createFileRoute("/dashboard/_layout/booking")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./barber-mode-BzRqN_wv.mjs");
const Route$7 = createFileRoute("/dashboard/_layout/barber-mode")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./ai-CWbCD6T7.mjs");
const Route$6 = createFileRoute("/dashboard/_layout/ai")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./agenda-BJqCCqtS.mjs");
const Route$5 = createFileRoute("/dashboard/_layout/agenda")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./security-CmZ5gSNO.mjs");
const Route$4 = createFileRoute("/dashboard/_layout/settings/security")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./notifications-DdB9TrhQ.mjs");
const Route$3 = createFileRoute("/dashboard/_layout/settings/notifications")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./communications-BkK3hde9.mjs");
const Route$2 = createFileRoute("/dashboard/_layout/settings/communications")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./business-DmUkaryA.mjs");
const Route$1 = createFileRoute("/dashboard/_layout/settings/business")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const Route = createFileRoute("/api/public/webhooks/payments")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const url = new URL(request.url);
        const gateway = url.searchParams.get("gateway") ?? "";
        if (!["asaas", "mercadopago"].includes(gateway)) {
          return new Response("Unknown or disabled gateway", { status: 400 });
        }
        const rawBody = await request.text();
        const { getProvider } = await import("./providers.server-CK_iqY3Q.mjs");
        const { logGatewayError } = await import("./errors.server-Bn_uWWtB.mjs");
        const provider = getProvider(gateway);
        const headersWithQuery = new Headers(request.headers);
        headersWithQuery.set("x-original-query", url.searchParams.toString());
        const validSig = await provider.verifySignature(headersWithQuery, rawBody);
        if (!validSig) return new Response("Invalid signature", { status: 401 });
        const event = await provider.parseWebhook(headersWithQuery, rawBody);
        if (!event.externalEventId) {
          return new Response("Missing external_event_id", { status: 400 });
        }
        const { supabaseAdmin } = await import("./client.server-DMSl3WSm.mjs");
        const { error: insertErr } = await supabaseAdmin.from("webhook_events").insert({
          gateway,
          event_type: event.type,
          external_event_id: event.externalEventId,
          payload: event.raw
        });
        if (insertErr) {
          if (insertErr.code === "23505") {
            return new Response("ok (duplicate)", { status: 200 });
          }
          console.error("[webhook] insert idempotency row failed", insertErr);
          return new Response("Idempotency store error", { status: 500 });
        }
        try {
          const userId = event.userId ?? await resolveUserByExternalSub(event.externalSubscriptionId);
          if (userId) {
            if (event.type === "payment_confirmed" || event.type === "subscription_renewed") {
              const { data: pending } = await supabaseAdmin.from("billing_history").select("id, metadata").eq("user_id", userId).eq("external_id", event.externalEventId).maybeSingle();
              const meta = pending?.metadata ?? {};
              const isPlanChange = meta?.pending_change === true && meta?.plan;
              if (isPlanChange) {
                await supabaseAdmin.rpc("change_plan_after_payment", {
                  _user_id: userId,
                  _new_plan: meta.plan,
                  _period_days: 30
                });
                const prevProvider = meta.previous_provider;
                const prevExternal = meta.previous_external_id;
                if (prevProvider && prevExternal) {
                  try {
                    await getProvider(prevProvider).cancelSubscription(prevExternal);
                  } catch (err) {
                    await logGatewayError({
                      userId,
                      gateway: prevProvider,
                      operation: "changePlan.cancelPrevious",
                      externalId: prevExternal,
                      message: err?.message ?? String(err)
                    });
                  }
                }
              } else {
                await supabaseAdmin.rpc("apply_payment_confirmed", {
                  _user_id: userId,
                  _plan: null,
                  _period_days: 30
                });
              }
              await supabaseAdmin.from("billing_history").insert({
                user_id: userId,
                amount_cents: event.amountCents ?? 0,
                currency: event.currency ?? "BRL",
                status: "confirmed",
                gateway,
                external_id: event.externalEventId,
                paid_at: event.paidAt ?? (/* @__PURE__ */ new Date()).toISOString(),
                receipt_url: event.receiptUrl ?? null,
                metadata: { event_type: event.type, plan_change: isPlanChange || false }
              });
            } else if (event.type === "payment_failed" || event.type === "charge_overdue") {
              await supabaseAdmin.rpc("apply_payment_failed", { _user_id: userId });
              await supabaseAdmin.from("billing_history").insert({
                user_id: userId,
                amount_cents: event.amountCents ?? 0,
                currency: event.currency ?? "BRL",
                status: "failed",
                gateway,
                external_id: event.externalEventId,
                metadata: { event_type: event.type }
              });
              await logGatewayError({
                userId,
                gateway,
                operation: "webhook.payment_failed",
                externalId: event.externalEventId,
                message: `Pagamento não aprovado (${event.type})`,
                payload: event.raw
              });
            } else if (event.type === "subscription_cancelled") {
              await supabaseAdmin.rpc("cancel_user_subscription", { _user_id: userId });
            }
          }
          await supabaseAdmin.from("webhook_events").update({ processed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("gateway", gateway).eq("external_event_id", event.externalEventId);
        } catch (err) {
          await supabaseAdmin.from("webhook_events").update({ error: String(err?.message ?? err) }).eq("gateway", gateway).eq("external_event_id", event.externalEventId);
          await logGatewayError({
            gateway,
            operation: "webhook.processing",
            externalId: event.externalEventId,
            message: err?.message ?? String(err),
            payload: event.raw
          });
          return new Response("Processing error", { status: 500 });
        }
        return new Response("ok", { status: 200 });
      }
    }
  }
});
async function resolveUserByExternalSub(externalId) {
  if (!externalId) return null;
  const { supabaseAdmin } = await import("./client.server-DMSl3WSm.mjs");
  const { data } = await supabaseAdmin.from("subscriptions").select("user_id").eq("provider_subscription_id", externalId).maybeSingle();
  return data?.user_id ?? null;
}
const OwnerRoute = Route$u.update({
  id: "/owner",
  path: "/owner",
  getParentRoute: () => Route$v
});
const CommunityRoute = Route$t.update({
  id: "/community",
  path: "/community",
  getParentRoute: () => Route$v
});
const AdminRoute = Route$s.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$v
});
const IndexRoute = Route$r.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$v
});
const AuthIndexRoute = Route$q.update({
  id: "/auth/",
  path: "/auth/",
  getParentRoute: () => Route$v
});
const DashboardCommunityRoute = Route$p.update({
  id: "/dashboard/community",
  path: "/dashboard/community",
  getParentRoute: () => Route$v
});
const DashboardLayoutRoute = Route$o.update({
  id: "/dashboard/_layout",
  path: "/dashboard",
  getParentRoute: () => Route$v
});
const BookingSlugRoute = Route$n.update({
  id: "/booking/$slug",
  path: "/booking/$slug",
  getParentRoute: () => Route$v
});
const AuthResetRoute = Route$m.update({
  id: "/auth/reset",
  path: "/auth/reset",
  getParentRoute: () => Route$v
});
const DashboardLayoutIndexRoute = Route$l.update({
  id: "/",
  path: "/",
  getParentRoute: () => DashboardLayoutRoute
});
const DashboardLayoutVipPlansRoute = Route$k.update({
  id: "/vip-plans",
  path: "/vip-plans",
  getParentRoute: () => DashboardLayoutRoute
});
const DashboardLayoutSubscriptionRoute = Route$j.update({
  id: "/subscription",
  path: "/subscription",
  getParentRoute: () => DashboardLayoutRoute
});
const DashboardLayoutSettingsRoute = Route$i.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => DashboardLayoutRoute
});
const DashboardLayoutServicesRoute = Route$h.update({
  id: "/services",
  path: "/services",
  getParentRoute: () => DashboardLayoutRoute
});
const DashboardLayoutReportsRoute = Route$g.update({
  id: "/reports",
  path: "/reports",
  getParentRoute: () => DashboardLayoutRoute
});
const DashboardLayoutRecoveryRoute = Route$f.update({
  id: "/recovery",
  path: "/recovery",
  getParentRoute: () => DashboardLayoutRoute
});
const DashboardLayoutModulesRoute = Route$e.update({
  id: "/modules",
  path: "/modules",
  getParentRoute: () => DashboardLayoutRoute
});
const DashboardLayoutInventoryRoute = Route$d.update({
  id: "/inventory",
  path: "/inventory",
  getParentRoute: () => DashboardLayoutRoute
});
const DashboardLayoutFinanceRoute = Route$c.update({
  id: "/finance",
  path: "/finance",
  getParentRoute: () => DashboardLayoutRoute
});
const DashboardLayoutCrmRoute = Route$b.update({
  id: "/crm",
  path: "/crm",
  getParentRoute: () => DashboardLayoutRoute
});
const DashboardLayoutCommissionsRoute = Route$a.update({
  id: "/commissions",
  path: "/commissions",
  getParentRoute: () => DashboardLayoutRoute
});
const DashboardLayoutClientsRoute = Route$9.update({
  id: "/clients",
  path: "/clients",
  getParentRoute: () => DashboardLayoutRoute
});
const DashboardLayoutBookingRoute = Route$8.update({
  id: "/booking",
  path: "/booking",
  getParentRoute: () => DashboardLayoutRoute
});
const DashboardLayoutBarberModeRoute = Route$7.update({
  id: "/barber-mode",
  path: "/barber-mode",
  getParentRoute: () => DashboardLayoutRoute
});
const DashboardLayoutAiRoute = Route$6.update({
  id: "/ai",
  path: "/ai",
  getParentRoute: () => DashboardLayoutRoute
});
const DashboardLayoutAgendaRoute = Route$5.update({
  id: "/agenda",
  path: "/agenda",
  getParentRoute: () => DashboardLayoutRoute
});
const DashboardLayoutSettingsSecurityRoute = Route$4.update({
  id: "/security",
  path: "/security",
  getParentRoute: () => DashboardLayoutSettingsRoute
});
const DashboardLayoutSettingsNotificationsRoute = Route$3.update({
  id: "/notifications",
  path: "/notifications",
  getParentRoute: () => DashboardLayoutSettingsRoute
});
const DashboardLayoutSettingsCommunicationsRoute = Route$2.update({
  id: "/communications",
  path: "/communications",
  getParentRoute: () => DashboardLayoutSettingsRoute
});
const DashboardLayoutSettingsBusinessRoute = Route$1.update({
  id: "/business",
  path: "/business",
  getParentRoute: () => DashboardLayoutSettingsRoute
});
const ApiPublicWebhooksPaymentsRoute = Route.update({
  id: "/api/public/webhooks/payments",
  path: "/api/public/webhooks/payments",
  getParentRoute: () => Route$v
});
const DashboardLayoutSettingsRouteChildren = {
  DashboardLayoutSettingsBusinessRoute,
  DashboardLayoutSettingsCommunicationsRoute,
  DashboardLayoutSettingsNotificationsRoute,
  DashboardLayoutSettingsSecurityRoute
};
const DashboardLayoutSettingsRouteWithChildren = DashboardLayoutSettingsRoute._addFileChildren(
  DashboardLayoutSettingsRouteChildren
);
const DashboardLayoutRouteChildren = {
  DashboardLayoutAgendaRoute,
  DashboardLayoutAiRoute,
  DashboardLayoutBarberModeRoute,
  DashboardLayoutBookingRoute,
  DashboardLayoutClientsRoute,
  DashboardLayoutCommissionsRoute,
  DashboardLayoutCrmRoute,
  DashboardLayoutFinanceRoute,
  DashboardLayoutInventoryRoute,
  DashboardLayoutModulesRoute,
  DashboardLayoutRecoveryRoute,
  DashboardLayoutReportsRoute,
  DashboardLayoutServicesRoute,
  DashboardLayoutSettingsRoute: DashboardLayoutSettingsRouteWithChildren,
  DashboardLayoutSubscriptionRoute,
  DashboardLayoutVipPlansRoute,
  DashboardLayoutIndexRoute
};
const DashboardLayoutRouteWithChildren = DashboardLayoutRoute._addFileChildren(
  DashboardLayoutRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  AdminRoute,
  CommunityRoute,
  OwnerRoute,
  AuthResetRoute,
  BookingSlugRoute,
  DashboardLayoutRoute: DashboardLayoutRouteWithChildren,
  DashboardCommunityRoute,
  AuthIndexRoute,
  ApiPublicWebhooksPaymentsRoute
};
const routeTree = Route$v._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Avatar as A,
  Badge as B,
  Card as C,
  ErrorBoundary as E,
  Input as I,
  Route$q as R,
  Textarea as T,
  AvatarImage as a,
  AvatarFallback as b,
  cn as c,
  Button as d,
  CardContent as e,
  CardHeader as f,
  CardTitle as g,
  CardDescription as h,
  CardFooter as i,
  buttonVariants as j,
  router as r
};
