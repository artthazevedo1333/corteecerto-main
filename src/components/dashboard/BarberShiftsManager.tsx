import React, { useState, useEffect } from 'react';
import { Clock, CalendarX, Save, CheckCircle2, AlertCircle, Scissors } from 'lucide-react';
// Ajuste o caminho de importação do seu cliente Supabase conforme a estrutura do seu projeto
import { supabase } from '@/lib/supabase';

// Tipagem para os horários de cada dia
type DaySchedule = {
  isOff: boolean;
  shiftStart: string;
  lunchStart: string;
  lunchEnd: string;
  shiftEnd: string;
};

type WeeklySchedule = Record<string, DaySchedule>;

const DIAS_SEMANA = [
  'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'
];

// Horário padrão inicial
const defaultDaySchedule: DaySchedule = {
  isOff: false,
  shiftStart: '09:00',
  lunchStart: '12:00',
  lunchEnd: '13:00',
  shiftEnd: '18:00',
};

interface BarberShiftsManagerProps {
  barberId: string; // ID do profissional que está sendo editado
}

export default function BarberShiftsManager({ barberId }: BarberShiftsManagerProps) {
  const [selectedDay, setSelectedDay] = useState<string>(DIAS_SEMANA[0]);
  const [schedule, setSchedule] = useState<WeeklySchedule>(() => {
    const initialState: WeeklySchedule = {};
    DIAS_SEMANA.forEach(dia => {
      // Por padrão, Domingo é folga na inicialização vazia
      initialState[dia] = { ...defaultDaySchedule, isOff: dia === 'Domingo' };
    });
    return initialState;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' } | null>(null);

  // Auto-fechar o toast após 3 segundos
  useEffect(() => {
    if (toast?.show) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleTimeChange = (field: keyof DaySchedule, value: string | boolean) => {
    setSchedule(prev => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setToast(null);

    try {
      // Prepara o payload para a RPC conforme esperado pelo seu backend.
      // Pode ser necessário ajustar o formato dependendo de como sua tabela/RPC foi construída.
      const payload = DIAS_SEMANA.map(day => ({
        day_of_week: day,
        is_off: schedule[day].isOff,
        shift_start: schedule[day].shiftStart,
        lunch_start: schedule[day].lunchStart,
        lunch_end: schedule[day].lunchEnd,
        shift_end: schedule[day].shiftEnd,
      }));

      const { error } = await supabase.rpc('update_barber_working_hours', {
        p_barber_id: barberId,
        p_schedule: payload
      });

      if (error) throw error;

      setToast({ show: true, message: 'Horários atualizados com sucesso!', type: 'success' });
    } catch (error) {
      console.error('Erro ao salvar horários:', error);
      setToast({ show: true, message: 'Erro ao salvar. Tente novamente.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const currentDayConfig = schedule[selectedDay];

  return (
    <div className="w-full max-w-4xl mx-auto bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden font-sans">
      
      {/* HEADER PREMIUM */}
      <div className="px-8 py-6 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 rounded-lg">
            <Clock className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-zinc-100">Jornada de Trabalho</h2>
            <p className="text-sm text-zinc-400">Configure os turnos, almoço e folgas do profissional</p>
          </div>
        </div>
        <Scissors className="w-6 h-6 text-zinc-700 opacity-50" />
      </div>

      <div className="p-8 flex flex-col lg:flex-row gap-8">
        
        {/* SELETOR DE DIAS DA SEMANA */}
        <div className="w-full lg:w-1/3 flex flex-col gap-2">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Dias da Semana</h3>
          {DIAS_SEMANA.map((dia) => (
            <button
              key={dia}
              onClick={() => setSelectedDay(dia)}
              className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 border ${
                selectedDay === dia
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 font-medium'
                  : 'bg-transparent border-transparent text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
            >
              <span>{dia}</span>
              {schedule[dia].isOff && (
                <span className="text-[10px] uppercase tracking-wider bg-zinc-800 text-zinc-400 px-2 py-1 rounded-md">
                  Folga
                </span>
              )}
            </button>
          ))}
        </div>

        {/* PAINEL DE CONFIGURAÇÃO DO DIA SELECIONADO */}
        <div className="w-full lg:w-2/3 bg-zinc-900 rounded-xl p-6 border border-zinc-800 relative">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-medium text-zinc-100 flex items-center gap-2">
              Configuração para <span className="text-amber-500 font-semibold">{selectedDay}</span>
            </h3>

            {/* TOGGLE DIA DE FOLGA */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">
                Marcar como Folga
              </span>
              <div className="relative inline-flex items-center">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={currentDayConfig.isOff}
                  onChange={(e) => handleTimeChange('isOff', e.target.checked)}
                />
                <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 peer-checked:after:bg-white after:border-zinc-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              </div>
            </label>
          </div>

          {/* GRID DE INPUTS DE HORÁRIO */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-300 ${currentDayConfig.isOff ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
            
            {/* Bloco: Turno */}
            <div className="space-y-4 bg-zinc-950 p-4 rounded-lg border border-zinc-800/50">
              <h4 className="text-sm font-semibold text-zinc-300 border-b border-zinc-800 pb-2">Horário do Turno</h4>
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-500 uppercase tracking-wide">Início do Expediente</label>
                  <input
                    type="time"
                    value={currentDayConfig.shiftStart}
                    onChange={(e) => handleTimeChange('shiftStart', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-zinc-200 outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all [color-scheme:dark]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-500 uppercase tracking-wide">Fim do Expediente</label>
                  <input
                    type="time"
                    value={currentDayConfig.shiftEnd}
                    onChange={(e) => handleTimeChange('shiftEnd', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-zinc-200 outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all [color-scheme:dark]"
                  />
                </div>
              </div>
            </div>

            {/* Bloco: Almoço/Pausa */}
            <div className="space-y-4 bg-zinc-950 p-4 rounded-lg border border-zinc-800/50">
              <h4 className="text-sm font-semibold text-zinc-300 border-b border-zinc-800 pb-2">Pausa para Almoço</h4>
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-500 uppercase tracking-wide">Saída para Almoço</label>
                  <input
                    type="time"
                    value={currentDayConfig.lunchStart}
                    onChange={(e) => handleTimeChange('lunchStart', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-zinc-200 outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all [color-scheme:dark]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-500 uppercase tracking-wide">Retorno do Almoço</label>
                  <input
                    type="time"
                    value={currentDayConfig.lunchEnd}
                    onChange={(e) => handleTimeChange('lunchEnd', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-zinc-200 outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all [color-scheme:dark]"
                  />
                </div>
              </div>
            </div>
            
          </div>

          {currentDayConfig.isOff && (
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none mt-16">
              <div className="bg-zinc-900/90 border border-zinc-800 text-zinc-300 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-sm">
                <CalendarX className="text-amber-500 w-6 h-6" />
                <span className="font-medium">O profissional não trabalha neste dia.</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER & ACTIONS */}
      <div className="px-8 py-5 border-t border-zinc-800 bg-zinc-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Toast Notification (Inline) */}
        <div className="flex-1">
          {toast && toast.show && (
            <div className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg animate-in fade-in slide-in-from-bottom-2 ${
              toast.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              {toast.message}
            </div>
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={isLoading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold px-6 py-2.5 rounded-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          <span>{isLoading ? 'Salvando...' : 'Salvar Alterações'}</span>
        </button>
      </div>
    </div>
  );
}