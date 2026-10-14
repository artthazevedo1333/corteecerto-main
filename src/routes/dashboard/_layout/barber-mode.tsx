import { createFileRoute, Link } from "@tanstack/react-router";
import { useDashboardData } from "@/hooks/useDashboardData";
import { NextAppointment } from "@/components/dashboard/NextAppointment";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, LayoutDashboard, Scissors } from "lucide-react";
import { ErrorBoundary } from "@/components/error-boundary";

export const Route = createFileRoute("/dashboard/_layout/barber-mode")({
  component: BarberModeWrapper,
});

function BarberModeWrapper() {
  return (
    <ErrorBoundary>
      <BarberMode />
    </ErrorBoundary>
  );
}

function BarberMode() {
  const { nextAppointment, loading, refresh } = useDashboardData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="icon" className="rounded-2xl">
            <Link to="/dashboard">
              <ArrowLeft className="h-6 w-6" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">Modo Trabalho</h1>
            <p className="text-muted-foreground font-medium">Foque no que importa: o cliente.</p>
          </div>
        </div>
        <div className="rounded-2xl bg-primary/10 p-3 border border-primary/20">
          <Scissors className="h-6 w-6 text-primary" />
        </div>
      </header>

      <div className="grid gap-8">
        <section className="space-y-4">
          <h2 className="text-xl font-black uppercase italic tracking-tight opacity-70">
            Atendimento Atual
          </h2>
          <NextAppointment appointment={nextAppointment} onUpdate={refresh} />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-black uppercase italic tracking-tight opacity-70">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Button
              asChild
              variant="secondary"
              className="h-24 rounded-[2rem] flex flex-col gap-2 font-black border-border border"
            >
              <Link to="/dashboard/agenda">
                <Calendar className="h-6 w-6 text-primary" />
                AGENDA
              </Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="h-24 rounded-[2rem] flex flex-col gap-2 font-black border-border border"
            >
              <Link to="/dashboard">
                <LayoutDashboard className="h-6 w-6 text-primary" />
                PAINEL
              </Link>
            </Button>
          </div>
        </section>
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md">
        <Button
          asChild
          className="w-full h-16 rounded-[2rem] font-black text-lg shadow-2xl shadow-primary/40 uppercase italic tracking-widest"
        >
          <Link to="/dashboard/agenda">PRÓXIMO CLIENTE</Link>
        </Button>
      </div>
    </div>
  );
}
