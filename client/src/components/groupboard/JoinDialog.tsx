import { useState } from "react";
import { X, UserPlus } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-background rounded-t-2xl sm:rounded-xl shadow-xl max-w-md w-full p-6 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle on mobile */}
        <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-4 sm:hidden" />

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-primary" />
            Join this board
          </h2>
          <button onClick={onClose} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Avatar preview */}
        <div className="flex justify-center mb-5">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg transition-colors"
            style={{ backgroundColor: selectedColor }}
          >
            {getInitials(name)}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium block mb-1.5">Your name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              autoFocus
              className="w-full px-3 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2.5">Pick your color</label>
            <div className="flex gap-3 justify-center flex-wrap">
              {avatarColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "w-11 h-11 rounded-full transition-all",
                    selectedColor === color
                      ? "ring-2 ring-offset-2 ring-primary scale-110 shadow-md"
                      : "hover:scale-105 opacity-70 hover:opacity-100"
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!name.trim() || loading}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-40 min-h-[48px]"
          >
            {loading ? "Joining..." : "Join Board"}
          </button>
        </form>
      </div>
    </div>
  );
}
