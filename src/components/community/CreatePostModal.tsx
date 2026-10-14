import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { useCreatePost } from "@/hooks/useCommunity";

export function CreatePostModal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const createPost = useCreatePost();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    
    createPost.mutate({ file: selectedFile, description }, {
      onSuccess: () => {
        setIsOpen(false);
        clearSelection();
        setDescription("");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-zinc-950 border-zinc-900 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Nova Publicação</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 mt-4">
          {!previewUrl ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-zinc-800 rounded-xl aspect-[4/5] flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-zinc-900/50 transition-colors"
            >
              <ImagePlus className="w-10 h-10 text-zinc-500" />
              <span className="text-sm text-zinc-400">Toque para escolher uma foto</span>
            </div>
          ) : (
            <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden group">
              <img src={previewUrl} alt="Preview" className="object-cover w-full h-full" />
              <Button 
                variant="destructive" 
                size="icon" 
                className="absolute top-2 right-2 rounded-full opacity-80 hover:opacity-100"
                onClick={clearSelection}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
          
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileSelect}
          />

          <Textarea 
            placeholder="Adicione uma legenda... (ex: Low fade com textura ✂️)"
            className="bg-zinc-900 border-zinc-800 resize-none h-24 focus-visible:ring-amber-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button 
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold"
            disabled={!selectedFile || createPost.isPending}
            onClick={handleSubmit}
          >
            {createPost.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                A Publicar...
              </>
            ) : (
              "Partilhar na Comunidade"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}