import { useState } from "react";
import { LayoutGrid, Table, List, Share2, Users, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProgressRing } from "./ProgressRing";
import { ShareDialog } from "./ShareDialog";
import type { Board, Item, Participant } from "@shared/schema.ts";
import type { BoardTheme } from "@/lib/themes";

interface BoardHeaderProps {
  board: Board;
  items: Item[];
  participants: Participant[];
  theme: BoardTheme;
  viewMode: "card" | "table" | "compact";
  onViewModeChange: (mode: "card" | "table" | "compact") => void;
  isHost: boolean;
}

export function BoardHeader({ board, items, participants, theme, viewMode, onViewModeChange, isHost }: BoardHeaderProps) {
  const [shareOpen, setShareOpen] = useState(false);

  const claimed = items.filter(i => i.status === "claimed" || i.status === "done").length;
  const total = items.length;
  const progress = total > 0 ? Math.round((claimed / total) * 100) : 0;

  return (
    <>
      <div className={cn("rounded-2xl p-5 sm:p-6 mb-5 relative overflow-hidden", theme.headerGradient, theme.headerText)}>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }} />

        <div className="relative flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold truncate">{board.title}</h1>
            {board.description && (
              <p className="text-white/70 text-sm mt-1 truncate">{board.description}</p>
            )}

            <div className="flex flex-wrap gap-2 mt-4">
              <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                <Users className="w-3 h-3" />
                {participants.length}
              </div>
              <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                <CheckCircle2 className="w-3 h-3" />
                {claimed}/{total}
              </div>
              {total - claimed > 0 && (
                <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                  <Clock className="w-3 h-3" />
                  {total - claimed} open
                </div>
              )}
            </div>
          </div>

          {total > 0 && (
            <div className="shrink-0">
              <ProgressRing
                progress={progress}
                color="white"
                trackColor="rgba(255,255,255,0.2)"
                size={64}
                strokeWidth={6}
              />
            </div>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center bg-card border border-border rounded-lg p-0.5 text-sm">
          {([
            { mode: "compact" as const, icon: List, label: "List" },
            { mode: "card" as const, icon: LayoutGrid, label: "Cards" },
            { mode: "table" as const, icon: Table, label: "Table" },
          ]).map(({ mode, icon: Icon, label }) => (
            <button
              key={mode}
              onClick={() => onViewModeChange(mode)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all text-xs font-medium",
                viewMode === mode
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setShareOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-card border border-border text-foreground hover:bg-accent transition-colors min-h-[36px]"
        >
          <Share2 className="w-3.5 h-3.5" />
          Share
        </button>
      </div>

      {shareOpen && (
        <ShareDialog shareCode={board.shareCode} onClose={() => setShareOpen(false)} />
      )}
    </>
  );
}
