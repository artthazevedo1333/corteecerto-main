import { CalendarClock, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PublicPostProps {
  post: {
    image_url: string;
    description: string;
    author: {
      name: string;
      avatar_url: string;
      location: string;
    };
  };
}

export function PublicPostView({ post }: PublicPostProps) {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Cabeçalho Simplificado */}
        <div className="p-4 flex items-center gap-3 border-b border-zinc-800">
          <Avatar className="h-12 w-12 border border-zinc-700">
            <AvatarImage src={post.author.avatar_url} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold text-zinc-100">{post.author.name}</h3>
            <p className="text-xs text-zinc-400">{post.author.location}</p>
          </div>
        </div>

        {/* Imagem em Destaque */}
        <div className="relative aspect-[4/5] w-full bg-zinc-950">
          <img 
            src={post.image_url} 
            alt="Corte em Destaque" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-5 flex flex-col gap-6">
          <p className="text-sm text-zinc-300">
            {post.description}
          </p>

          <div className="flex flex-col gap-3 pt-2">
            {/* CTA 1: Para Clientes */}
            <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-md font-bold shadow-lg">
              <CalendarClock className="w-5 h-5 mr-2" />
              Agendar com este Barbeiro
            </Button>
            
            {/* Separador Visual */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-900/50 px-2 text-zinc-500">Ou</span>
              </div>
            </div>

            {/* CTA 2: Growth Loop para outros Barbeiros */}
            <Button variant="outline" className="w-full border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 h-12">
              <Scissors className="w-4 h-4 mr-2" />
              És barbeiro? Cria o teu portefólio grátis
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}