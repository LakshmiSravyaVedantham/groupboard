import type { Board, Item } from "@shared/schema.ts";
import { CheckCircle2, Clock, DollarSign, Users } from "lucide-react";

interface BoardSummaryProps {
  board: Board;
  items: Item[];
}

export function BoardSummary({ board, items }: BoardSummaryProps) {
  const claimed = items.filter(i => i.status === "claimed" || i.status === "done").length;
  const done = items.filter(i => i.status === "done").length;
  const total = items.length;
  const progress = total > 0 ? Math.round((claimed / total) * 100) : 0;

  const sumField = board.config.summaryConfig?.sumField;
  const sumTotal = sumField
    ? items.reduce((acc, item) => acc + (Number(item.data[sumField]) || 0), 0)
    : null;

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium">
        <Users className="w-4 h-4" />
        {claimed}/{total} claimed
      </div>

      {done > 0 && (
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium">
          <CheckCircle2 className="w-4 h-4" />
          {done} done
        </div>
      )}

      {total - claimed > 0 && (
        <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-2 rounded-lg text-sm font-medium">
          <Clock className="w-4 h-4" />
          {total - claimed} available
        </div>
      )}

      {sumTotal !== null && sumTotal > 0 && (
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg text-sm font-medium">
          <DollarSign className="w-4 h-4" />
          Total: ${sumTotal.toLocaleString()}
        </div>
      )}

      {total > 0 && (
        <div className="flex items-center gap-2 ml-auto">
          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">{progress}%</span>
        </div>
      )}
    </div>
  );
}
