import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Ban, Coffee, Plane, Trash2, Loader2, Lock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type BlockType = "block" | "vacation" | "lunch";

interface ScheduleBlocksManagerProps {
  selectedDate?: Date;
  onChange?: () => void;
}

const BLOCK_META: Record<BlockType, { label: string; icon: any; color: string }> = {
  block: { label: "Bloqueio", icon: Ban, color: "text-red-500" },
  lunch: { label: "Almoço/Pausa", icon: Coffee, color: "text-orange-500" },
  vacation: { label: "Férias", icon: Plane, color: "text-blue-500" },
};

export function ScheduleBlocksManager({ selectedDate, onChange }: ScheduleBlocksManagerProps) {
  const [open, setOpen] = useState(false);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [type, setType] = useState<BlockType>("block");
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(
    selectedDate ? format(selectedDate, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
  );
  const [startTime, setStartTime] = useState("12:00");
  const [endDate, setEndDate] = useState(
    selectedDate ? format(selectedDate, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
  );
  const [endTime, setEndTime] = useState("13:00");

  const load = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return setLoading(false);
    const { data } = await supabase
      .from("schedule_blocks")
      .select("*")
      .eq("user_id", user.id)
      .gte("end_time", new Date().toISOString())
      .order("start_time");
    setBlocks(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (open) load();
  }, [open]);

  const handleTypeChange = (t: BlockType) => {
    setType(t);
    if (t === "vacation") {
      setStartTime("00:00");
      setEndTime("23:59");
      setTitle("Férias");
    } else if (t === "lunch") {
      setStartTime("12:00");
      setEndTime("13:00");
      setTitle("Horário de almoço");
    } else {
      setTitle("");
    }
  };

  const create = async () => {
    if (!title.trim()) return toast.error("Informe um título");
    setSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Não autenticado");
      const start = new Date(`${startDate}T${startTime}`);
      const end = new Date(`${endDate}T${endTime}`);
      if (end <= start) throw new Error("Fim deve ser depois do início");

      const { error } = await supabase.from("schedule_blocks").insert({
        user_id: user.id,
        title: title.trim(),
        block_type: type,
        start_time: start.toISOString(),
        end_time: end.toISOString(),
      });
      if (error) throw error;
      toast.success("Bloqueio criado");
      setTitle("");
      load();
      onChange?.();
    } catch (e: any) {
      toast.error(e.message || "Erro ao criar bloqueio");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("schedule_blocks").delete().eq("id", id);
    if (error) return toast.error("Erro ao remover");
    toast.success("Bloqueio removido");
    load();
    onChange?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-14 px-6 font-black text-base rounded-xl gap-2 border-orange-500/30 text-orange-500 hover:bg-orange-500/5"
        >
          <Lock className="h-5 w-5" />
          BLOQUEAR
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px] p-6 rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-black uppercase tracking-tight italic">
            Bloqueios de Agenda
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Type selector */}
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(BLOCK_META) as BlockType[]).map((t) => {
              const M = BLOCK_META[t];
              const Icon = M.icon;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleTypeChange(t)}
                  className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${
                    type === t ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${M.color}`} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {M.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-black uppercase tracking-widest">Título</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11"
              placeholder="Ex: Compromisso pessoal"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest">Início</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-11"
              />
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest">Fim</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-11"
              />
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="h-11"
              />
            </div>
          </div>

          <Button
            onClick={create}
            disabled={saving}
            className="w-full h-12 font-black uppercase rounded-xl"
          >
            {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : "CRIAR BLOQUEIO"}
          </Button>

          <div className="border-t border-border pt-4">
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">
              Bloqueios Ativos
            </p>
            {loading ? (
              <p className="text-sm text-muted-foreground">Carregando...</p>
            ) : blocks.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum bloqueio ativo.</p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {blocks.map((b) => {
                  const M = BLOCK_META[b.block_type as BlockType] || BLOCK_META.block;
                  const Icon = M.icon;
                  return (
                    <div
                      key={b.id}
                      className="flex items-center gap-3 p-3 rounded-xl border border-border"
                    >
                      <Icon className={`h-4 w-4 ${M.color} shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate">{b.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(b.start_time), "dd/MM HH:mm", { locale: ptBR })} →{" "}
                          {format(new Date(b.end_time), "dd/MM HH:mm", { locale: ptBR })}
                        </p>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive"
                        onClick={() => remove(b.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
