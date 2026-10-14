import { createFileRoute, redirect } from "@tanstack/react-router";

// Alias público do Painel Master. A rota /admin faz a checagem de role.
export const Route = createFileRoute("/owner")({
  beforeLoad: () => {
    throw redirect({ to: "/admin" });
  },
});
