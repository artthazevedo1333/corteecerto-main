import { CalendarClock, MapPin, Award } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface BarberProfileProps {
  barber: {
    id: string;
    name: string;
    avatar_url: string;
    bio: string;
    location: string;
    badges: string[];
    stats: {
      posts: number;
      followers: number;
    };
  };
  posts: { id: string; image_url: string }[];
}

export function BarberProfile({ barber, posts }: BarberProfileProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-zinc-950 min-h-screen pb-12">
      {/* Cabeçalho do Perfil */}
      <div className="px-4 pt-8 pb-6 border-b border-zinc-900">
        <div className="flex items-center gap-6 mb-6">
          <Avatar className="h-24 w-24 border border-zinc-800 shadow-xl">
            <AvatarImage src={barber.avatar_url} alt={barber.name} />
            <AvatarFallback className="bg-zinc-800 text-3xl">{barber.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex gap-6 text-center flex-1 justify-center">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-zinc-100">{barber.stats.posts}</span>
              <span className="text-xs text-zinc-500">Cortes</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-zinc-100">{barber.stats.followers}</span>
              <span className="text-xs text-zinc-500">Seguidores</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h1 className="text-lg font-bold text-zinc-100">{barber.name}</h1>
          <p className="text-sm text-zinc-400 mt-1">{barber.bio}</p>
          <div className="flex items-center gap-1 mt-2 text-xs text-zinc-500">
            <MapPin className="w-3 h-3" />
            {barber.location}
          </div>
        </div>

        {/* Gamificação - Badges */}
        {barber.badges.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {barber.badges.map((badge, idx) => (
              <Badge key={idx} variant="secondary" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                <Award className="w-3 h-3 mr-1" />
                {badge}
              </Badge>
            ))}
          </div>
        )}

        {/* CTA Principal */}
        <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg shadow-primary/20 h-12 text-md">
          <CalendarClock className="w-5 h-5 mr-2" />
          Agendar Horário
        </Button>
      </div>

      {/* Grelha de Portefólio (Estilo Instagram) */}
      <div className="grid grid-cols-3 gap-1 mt-1">
        {posts.map((post) => (
          <div key={post.id} className="aspect-square bg-zinc-900 cursor-pointer hover:opacity-90 transition-opacity">
            <img 
              src={post.image_url} 
              alt="Corte" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}