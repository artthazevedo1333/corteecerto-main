import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/nova-landing')({
  component: NovaLandingPage,
});

function NovaLandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-primary mb-4">Nova Landing Page em Construção</h1>
      <p className="text-muted-foreground text-lg mb-8">
        Aqui vamos desenhar a nova página de vendas sem tocar na original.
      </p>
    </div>
  );
}