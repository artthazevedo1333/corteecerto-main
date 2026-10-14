import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import {
  Plus,
  Search,
  ChevronRight,
  Scissors,
  Clock,
  DollarSign,
  Pencil,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { ErrorBoundary } from "@/components/error-boundary";
import { ServiceForm } from "@/components/dashboard/ServiceForm";

export const Route = createFileRoute("/dashboard/_layout/services")({
  component: ServicesPageWrapper,
});

function ServicesPageWrapper() {
  return (
    <ErrorBoundary>
      <ServicesPage />
    </ErrorBoundary>
  );
}

function ServicesPage() {
  const { t } = useTranslation();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("name", { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error: any) {
      toast.error("Erro ao carregar serviços");
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id: string) => {
    try {
      const { error } = await supabase.from("services").delete().eq("id", id);

      if (error) throw error;
      toast.success("Serviço removido");
      fetchServices();
    } catch (error) {
      toast.error("Erro ao remover serviço");
    }
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-8 pb-10">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase">Serviços</h1>
          <p className="text-muted-foreground font-medium text-lg">
            Preços e duração dos seus atendimentos.
          </p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-14 px-8 font-black text-base shadow-lg shadow-primary/20 rounded-xl">
              <Plus className="mr-2 h-6 w-6" /> NOVO SERVIÇO
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] p-8 rounded-3xl">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-black uppercase tracking-tight italic">
                Novo serviço
              </DialogTitle>
            </DialogHeader>
            <ServiceForm
              onSuccess={() => {
                setIsAddDialogOpen(false);
                fetchServices();
              }}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </header>

      {/* Search Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        </div>
        <Input
          placeholder="Buscar serviço por nome..."
          className="bg-card border-border pl-14 h-14 text-lg font-bold rounded-2xl shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Services List */}
      <div className="grid gap-6 sm:grid-cols-2">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse col-span-full">
            <Scissors className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <div className="text-lg font-bold text-muted-foreground">Carregando serviços...</div>
          </div>
        ) : filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <Card
              key={service.id}
              className="border-border bg-card hover:border-primary/50 transition-all group overflow-hidden shadow-sm rounded-2xl"
            >
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-5">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary border border-border text-primary font-black shadow-sm group-hover:bg-primary/5 transition-colors shrink-0">
                        <Scissors className="h-7 w-7" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-black text-xl tracking-tight leading-tight">
                            {service.name}
                          </h3>
                          <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-primary"
                              onClick={() => setEditingService(service)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="rounded-3xl p-8">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-xl font-black uppercase italic">
                                    Remover Serviço?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription className="text-base font-medium">
                                    Esta ação não pode ser desfeita. O serviço será removido
                                    permanentemente.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="mt-6">
                                  <AlertDialogCancel className="h-12 rounded-xl font-bold">
                                    CANCELAR
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    className="h-12 rounded-xl font-black bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    onClick={() => deleteService(service.id)}
                                  >
                                    REMOVER
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mt-1.5 font-medium line-clamp-2">
                          {service.description || "Sem descrição detalhada"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-6">
                    <div className="flex items-center gap-2 text-xs font-black text-muted-foreground bg-secondary px-3 py-1.5 rounded-full border border-border uppercase tracking-widest">
                      <Clock className="h-4 w-4 text-primary" /> {service.duration_minutes} MIN
                    </div>
                    <div className="flex items-center gap-2 text-xs font-black text-success bg-success/5 px-3 py-1.5 rounded-full border border-success/10 uppercase tracking-widest">
                      <DollarSign className="h-4 w-4" /> R${" "}
                      {service.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-24 border-2 border-dashed border-border rounded-3xl bg-secondary/10 col-span-full">
            <div className="bg-card h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-border">
              <Scissors className="h-10 w-10 text-muted-foreground/30" />
            </div>
            <h3 className="text-2xl font-black tracking-tight italic uppercase">Nenhum serviço</h3>
            <p className="text-muted-foreground font-medium text-lg mt-2">
              Comece adicionando seu primeiro serviço.
            </p>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="mt-8 font-black h-12 px-8 rounded-xl shadow-lg shadow-primary/20"
            >
              CRIAR MEU PRIMEIRO SERVIÇO
            </Button>
          </div>
        )}
      </div>

      <Dialog open={!!editingService} onOpenChange={(open) => !open && setEditingService(null)}>
        <DialogContent className="sm:max-w-[500px] p-8 rounded-3xl">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-black uppercase tracking-tight italic">
              Editar serviço
            </DialogTitle>
          </DialogHeader>
          {editingService && (
            <ServiceForm
              service={editingService}
              onSuccess={() => {
                setEditingService(null);
                fetchServices();
              }}
              onCancel={() => setEditingService(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
