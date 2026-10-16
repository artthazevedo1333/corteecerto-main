"use client";

import { useState } from "react";
import { Bot, X, Send, Sparkles, Loader2, Minimize2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export function FloatingHelp() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Mensagem inicial de boas-vindas do nosso Especialista
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Olá! Sou a Inteligência Artificial do Corte Certo. Estou aqui para ajudar com a sua barbearia, o painel ou dar dicas. O que manda hoje?"
    }
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userText = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setIsLoading(true);

    try {
      // Puxa a chave e remove possíveis aspas sem querer
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.replace(/['"]/g, '');
      
      if (!apiKey || apiKey.includes("sua_chave")) {
        setMessages((prev) => [...prev, { role: "model", text: "⚠️ A chave do Gemini não foi carregada. Garanta que salvou o arquivo .env e reiniciou o servidor (npm run dev)." }]);
        setIsLoading(false);
        return;
      }

      const prompt = `Você é o bot de suporte oficial do SaaS "Corte Certo", um sistema de gestão de elite para barbearias. 
      Responda de forma muito natural, curta (máximo 2 parágrafos) e amigável, ajudando o barbeiro com as dúvidas dele.
      Pergunta do barbeiro: ${userText}`;

 const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }]
        })
      });

      const data = await res.json();
      
      // MÁGICA AQUI: Se a Google der erro, o bot vai avisar-nos o que é!
      if (data.error) {
        console.error("Erro detalhado do Gemini:", data.error);
        setMessages((prev) => [...prev, { role: "model", text: `🚫 Erro da Google: ${data.error.message}` }]);
        setIsLoading(false);
        return;
      }

      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Desculpe, tive um pequeno lapso de memória. Pode repetir?";

      setMessages((prev) => [...prev, { role: "model", text: botReply }]);
    } catch (error) {
      console.error("Erro na IA:", error);
      setMessages((prev) => [...prev, { role: "model", text: "Desculpe, a minha ligação à internet falhou." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[550px] max-h-[85vh] bg-card/95 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          
          {/* Cabeçalho do Chat */}
          <div className="bg-primary/10 border-b border-primary/10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-full shadow-sm">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-sm">Corte Certo IA</h3>
                <p className="text-xs text-primary font-medium">Especialista de Negócio</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-black/5" onClick={() => setIsOpen(false)}>
              <Minimize2 className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>

          {/* Área das Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50/30 dark:bg-black/5">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "model" && (
                  <Avatar className="w-8 h-8 border border-primary/20 shrink-0 mt-1">
                    <AvatarFallback className="bg-primary/10 text-primary"><Bot className="w-4 h-4" /></AvatarFallback>
                  </Avatar>
                )}
                <div className={`p-3 rounded-2xl max-w-[85%] text-sm shadow-sm leading-relaxed ${
                  msg.role === "user" 
                    ? "bg-primary text-primary-foreground rounded-tr-sm" 
                    : "bg-background border border-border/50 text-foreground rounded-tl-sm whitespace-pre-wrap"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <Avatar className="w-8 h-8 border border-primary/20 shrink-0 mt-1">
                  <AvatarFallback className="bg-primary/10 text-primary"><Bot className="w-4 h-4" /></AvatarFallback>
                </Avatar>
                <div className="p-4 bg-background border border-border/50 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2 text-muted-foreground text-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" /> A pensar...
                </div>
              </div>
            )}
          </div>

          {/* Área de Input e Botão de Suporte Humano */}
          <div className="bg-background">
            <div className="p-2 border-t border-border/50 flex justify-center bg-secondary/20">
               <a href="https://wa.me/5584996713586" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                 <MessageCircle className="w-3 h-3" /> Falar com um humano
               </a>
            </div>
            <div className="p-3 pt-2">
              <div className="relative flex items-center">
                <Input 
                  placeholder="Pergunte sobre gestão, agenda, dicas..." 
                  className="pr-12 h-12 rounded-full border-border/50 bg-secondary/30 focus-visible:ring-primary/50 text-sm"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button 
                  size="icon" 
                  className="absolute right-1.5 h-9 w-9 rounded-full shadow-sm"
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* O Botão Flutuante Principal */}
      {!isOpen && (
        <Button 
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-transform hover:scale-110 duration-300 group"
        >
          <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        </Button>
      )}
    </div>
  );
}