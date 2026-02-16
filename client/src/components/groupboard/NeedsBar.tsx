import { cn } from "@/lib/utils";
import type { Board, Item } from "@shared/schema.ts";
import type { BoardTheme } from "@/lib/themes";

interface NeedsBarProps {
  board: Board;
  items: Item[];
  theme: BoardTheme;
}

export function NeedsBar({ board, items, theme }: NeedsBarProps) {
  const unclaimed = items.filter(i => i.status === "unclaimed");
  if (unclaimed.length === 0) {
    return (
      <div className="flex items-center gap-2 p-3 bg-emerald-950/20 border border-emerald-800/30 rounded-xl mb-4 text-sm text-emerald-400 font-medium">
        All {items.length} items covered.
      </div>
    );
  }

  const groupByField = board.config.summaryConfig?.groupByField;

  if (groupByField) {
    const needs = new Map<string, number>();
    for (const item of unclaimed) {
      const cat = item.data[groupByField] || "Other";
      needs.set(cat, (needs.get(cat) || 0) + 1);
    }

    return (
      <div className={cn("rounded-xl border p-3 mb-4", theme.accentBorder, theme.accentLight)}>
        <span className={cn("text-xs font-medium", theme.accent)}>Still needed: </span>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {Array.from(needs).map(([cat, count]) => (
            <span
              key={cat}
              className={cn("px-2.5 py-0.5 rounded-md text-xs font-medium", theme.needsChip, theme.needsChipText)}
            >
              {count} {cat}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("rounded-xl border p-3 mb-4 flex items-center gap-2", theme.accentBorder, theme.accentLight)}>
      <span className={cn("text-sm font-medium", theme.accent)}>
        {unclaimed.length} item{unclaimed.length !== 1 ? "s" : ""} still open
      </span>
    </div>
  );
}
