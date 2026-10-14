import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] w-full items-center justify-center p-4">
          <Card className="w-full max-w-md border-destructive/20 shadow-2xl">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle className="h-10 w-10 text-destructive" />
              </div>
              <CardTitle className="text-2xl font-black uppercase tracking-tight">
                Ops! Algo deu errado
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground font-medium">
                Ocorreu um erro ao carregar esta seção. Não se preocupe, seus dados estão seguros.
              </p>
              <div className="rounded-lg bg-secondary/50 p-3 text-left">
                <p className="text-xs font-mono text-muted-foreground break-all">
                  {this.state.error?.message || "Erro desconhecido"}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button
                onClick={() => window.location.reload()}
                className="w-full font-black h-12 rounded-xl"
              >
                <RefreshCcw className="mr-2 h-4 w-4" /> RECARREGAR PÁGINA
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/dashboard")}
                className="w-full font-black h-12 rounded-xl"
              >
                <Home className="mr-2 h-4 w-4" /> VOLTAR AO INÍCIO
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
