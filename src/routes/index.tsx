import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Scissors,
  Calendar,
  Users,
  BarChart3,
  Package,
  Settings,
  LogIn,
  ChevronRight,
} from "lucide-react";

const SITE_URL = "http://localhost:3000";
const OG_IMAGE = "/favicon.ico";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Corte Certo",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Sistema de gestão mobile-first para barbearias: agenda, clientes, financeiro, estoque e agendamento online.",
  url: SITE_URL,
  offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Corte Certo — Gestão Completa para Barbearias" },
      {
        name: "description",
        content:
          "Agenda inteligente, clientes, financeiro e estoque em um só lugar. Sistema mobile-first para barbeiros que levam o negócio a sério.",
      },
      { property: "og:title", content: "Corte Certo — Gestão Completa para Barbearias" },
      {
        property: "og:description",
        content:
          "Agenda inteligente, clientes, financeiro e estoque em um só lugar. Sistema mobile-first para barbearias.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Corte Certo — Gestão Completa para Barbearias" },
      {
        name: "twitter:description",
        content: "Agenda, clientes, financeiro e estoque para sua barbearia.",
      },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(JSON_LD) }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans">
      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-24 pb-16 text-center max-w-5xl">
        <div className="mb-8 flex justify-center">
          <div className="rounded-3xl bg-primary/10 p-5 ring-1 ring-primary/20 shadow-2xl shadow-primary/10">
            <Scissors className="h-14 w-14 text-primary" />
          </div>
        </div>
        <h1 className="mb-6 text-6xl font-black tracking-tighter sm:text-7xl lg:text-8xl">
          Corte <span className="text-primary">Certo</span>
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
          O sistema de gestão <span className="text-foreground font-bold italic">mobile-first</span>{" "}
          para barbeiros que levam o negócio a sério.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
          <Button
            size="lg"
            className="h-16 px-10 text-xl font-black shadow-xl shadow-primary/20 rounded-2xl"
            asChild
          >
            <Link to="/auth">COMEÇAR AGORA</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-16 border-border bg-card px-10 text-xl font-black rounded-2xl hover:bg-secondary transition-all"
            asChild
          >
            <Link to="/auth" search={{ mode: "login" }}>
              <LogIn className="mr-3 h-6 w-6" /> ENTRAR
            </Link>
          </Button>
        </div>
      </header>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-24 max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Calendar className="h-8 w-8" />}
            title="Agenda Inteligente"
            description="Agendamentos rápidos, visualização clara e controle total do seu tempo."
          />
          <FeatureCard
            icon={<Users className="h-8 w-8" />}
            title="Gestão de Clientes"
            description="Histórico completo, aniversários e lembretes de retorno automático."
          />
          <FeatureCard
            icon={<BarChart3 className="h-8 w-8" />}
            title="Financeiro Completo"
            description="Controle de faturamento, despesas e lucro real em tempo real."
          />
          <FeatureCard
            icon={<Package className="h-8 w-8" />}
            title="Estoque"
            description="Alertas de reposição e controle de margem de lucro por produto."
          />
          <FeatureCard
            icon={<Scissors className="h-8 w-8" />}
            title="Serviços"
            description="Personalize seu catálogo com tempo e preços variados."
          />
          <FeatureCard
            icon={<Settings className="h-8 w-8" />}
            title="100% Mobile"
            description="Tudo o que você precisa na palma da mão, otimizado para seu smartphone."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <Card className="bg-primary border-none shadow-2xl rounded-[3rem] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <CardContent className="p-12 md:p-20 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-primary-foreground mb-6 tracking-tight">
              Pronto para organizar sua barbearia?
            </h2>
            <p className="text-primary-foreground/80 text-xl mb-10 max-w-2xl mx-auto font-medium">
              Junte-se a centenas de barbeiros que já simplificaram sua rotina com o Corte Certo.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="h-16 px-12 text-xl font-black rounded-2xl shadow-xl"
              asChild
            >
              <Link to="/auth">
                CRIAR MINHA CONTA <ChevronRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 text-center">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Scissors className="h-6 w-6 text-primary" />
            <span className="text-2xl font-black tracking-tight italic">Corte Certo</span>
          </div>
          <p className="text-muted-foreground font-bold tracking-wide">
            © 2026 CORTE CERTO. FEITO PARA QUEM DOMINA A TESOURA.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-border bg-card shadow-sm hover:border-primary/50 transition-all group rounded-3xl overflow-hidden">
      <CardHeader className="p-8">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary border border-border text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
          {icon}
        </div>
        <CardTitle className="text-2xl font-black tracking-tight mb-2 group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground text-base font-medium leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
