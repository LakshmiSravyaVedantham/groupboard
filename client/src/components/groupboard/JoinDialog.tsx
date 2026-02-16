import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { avatarColors } from "@shared/templates.ts";

interface JoinDialogProps {
  onJoin: (name: string, avatarColor: string) => void;
  onClose: () => void;
  loading?: boolean;
}

function getInitials(name: string): string {
  if (!name.trim()) return "?";
  return name.trim().split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
}

export function JoinDialog({ onJoin, onClose, loading }: JoinDialogProps) {
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState(
    avatarColors[Math.floor(Math.random() * avatarColors.length)]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onJoin(name.trim(), selectedColor);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-card border border-border rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-4 sm:hidden" />

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Join board</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-accent rounded-lg transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Avatar preview */}
        <div className="flex justify-center mb-6">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold transition-colors"
            style={{ backgroundColor: selectedColor }}
          >
            {getInitials(name)}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-2">Your name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              autoFocus
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/30"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-3">Color</label>
            <div className="flex gap-2.5 justify-center flex-wrap">
              {avatarColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "w-10 h-10 rounded-full transition-all",
                    selectedColor === color
                      ? "ring-2 ring-offset-2 ring-offset-card ring-white/50 scale-110"
                      : "opacity-50 hover:opacity-80 hover:scale-105"
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!name.trim() || loading}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-30 min-h-[44px]"
          >
            {loading ? "Joining..." : "Join"}
          </button>
        </form>
      </div>
    </div>
  );
}
