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
}

export function BoardHeader({ board, items, participants, theme, viewMode, onViewModeChange }: BoardHeaderProps) {
  const [shareOpen, setShareOpen] = useState(false);

  const claimed = items.filter(i => i.status === "claimed" || i.status === "done").length;
  const done = items.filter(i => i.status === "done").length;
  const total = items.length;
  const progress = total > 0 ? Math.round((claimed / total) * 100) : 0;

  return (
    <>
      <div className={cn("rounded-2xl p-5 sm:p-6 mb-5 shadow-lg", theme.headerGradient, theme.headerText)}>
        <div className="flex items-start justify-between gap-4">
          {/* Left: title + stats */}
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold truncate drop-shadow-sm">{board.title}</h1>
            {board.description && (
              <p className="text-white/80 text-sm mt-1 truncate">{board.description}</p>
            )}

            {/* Quick stats row */}
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                <Users className="w-3.5 h-3.5" />
                {participants.length} member{participants.length !== 1 ? "s" : ""}
              </div>
              <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {claimed}/{total} claimed
              </div>
              {total - claimed > 0 && (
                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {total - claimed} available
                </div>
              )}
            </div>
          </div>

          {/* Right: progress ring */}
          {total > 0 && (
            <div className="shrink-0 bg-white/20 backdrop-blur-sm rounded-xl p-2">
              <ProgressRing
                progress={progress}
                color="white"
                trackColor="rgba(255,255,255,0.25)"
                size={72}
                strokeWidth={7}
              />
            </div>
          )}
        </div>
      </div>

      {/* Toolbar row */}
      <div className="flex items-center justify-between gap-3 mb-4">
        {/* View mode toggle */}
        <div className="flex items-center bg-muted rounded-lg p-1 text-sm">
          {([
            { mode: "compact" as const, icon: List, label: "List" },
            { mode: "card" as const, icon: LayoutGrid, label: "Cards" },
            { mode: "table" as const, icon: Table, label: "Table" },
          ]).map(({ mode, icon: Icon, label }) => (
            <button
              key={mode}
              onClick={() => onViewModeChange(mode)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors text-xs font-medium",
                viewMode === mode ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setShareOpen(true)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors min-h-[40px]",
            theme.claimBg, theme.claimHover
          )}
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share Board</span>
          <span className="sm:hidden">Share</span>
        </button>
      </div>

      {shareOpen && (
        <ShareDialog shareCode={board.shareCode} onClose={() => setShareOpen(false)} />
      )}
    </>
  );
}
