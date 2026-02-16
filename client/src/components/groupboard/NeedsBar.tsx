import { AlertCircle } from "lucide-react";
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
      <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl mb-4 text-sm text-green-700 font-medium">
        <span className="text-lg">🎉</span>
        Everything is covered! All {items.length} items have been claimed.
      </div>
    );
  }

  const groupByField = board.config.summaryConfig?.groupByField;

  // Group unclaimed items by category
  if (groupByField) {
    const needs = new Map<string, number>();
    for (const item of unclaimed) {
      const cat = item.data[groupByField] || "Other";
      needs.set(cat, (needs.get(cat) || 0) + 1);
    }

    return (
      <div className={cn("rounded-xl border p-3 mb-4", theme.accentBorder, theme.accentLight)}>
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className={cn("w-4 h-4", theme.accent)} />
          <span className={cn("text-sm font-semibold", theme.accent)}>Still needed</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from(needs).map(([cat, count]) => (
            <span
              key={cat}
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium",
                theme.needsChip, theme.needsChipText
              )}
            >
              {count} {cat}{count > 1 ? "" : ""}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // No grouping — just show count
  return (
    <div className={cn("rounded-xl border p-3 mb-4 flex items-center gap-2", theme.accentBorder, theme.accentLight)}>
      <AlertCircle className={cn("w-4 h-4", theme.accent)} />
      <span className={cn("text-sm font-semibold", theme.accent)}>
        {unclaimed.length} item{unclaimed.length !== 1 ? "s" : ""} still need to be claimed
      </span>
    </div>
  );
}
