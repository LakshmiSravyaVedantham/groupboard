import { AnimatePresence, motion } from "framer-motion";
import { ClipboardList } from "lucide-react";
import { ItemCard } from "./ItemCard";
import { ItemRow } from "./ItemRow";
import { CompactList } from "./CompactList";
import { CategoryHeader } from "./CategoryHeader";
import type { Board, Item, Participant } from "@shared/schema.ts";
import type { BoardTheme } from "@/lib/themes";

interface BoardContentProps {
  board: Board;
  items: Item[];
  participants: Participant[];
  currentParticipantId?: number;
  viewMode: "card" | "table" | "compact";
  theme: BoardTheme;
  onClaim: (item: Item) => void;
  onUnclaim: (item: Item) => void;
  onMarkDone: (item: Item) => void;
  onUpdate: (item: Item, data: Record<string, any>) => void;
  onDelete: (item: Item) => void;
}

export function BoardContent({
  board, items, participants, currentParticipantId, viewMode, theme,
  onClaim, onUnclaim, onMarkDone, onUpdate, onDelete,
}: BoardContentProps) {
  const columns = board.config.columns;
  const groupByField = board.config.summaryConfig?.groupByField;

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20 text-muted-foreground"
      >
        <ClipboardList className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
        <p className="text-lg font-medium text-foreground">No items yet</p>
        <p className="text-sm mt-1">Use the form below to add your first item.</p>
      </motion.div>
    );
  }

  // Compact list view (new default — "better than sheets")
  if (viewMode === "compact") {
    return (
      <CompactList
        board={board}
        items={items}
        participants={participants}
        currentParticipantId={currentParticipantId}
        theme={theme}
        onClaim={onClaim}
        onUnclaim={onUnclaim}
        onMarkDone={onMarkDone}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    );
  }

  // Group items by category
  const groups: { label: string; items: Item[] }[] = [];
  if (groupByField) {
    const map = new Map<string, Item[]>();
    for (const item of items) {
      const key = item.data[groupByField] || "Other";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(item);
    }
    for (const [label, groupItems] of map) {
      groups.push({ label, items: groupItems });
    }
  } else {
    groups.push({ label: "", items });
  }

  const itemProps = (item: Item) => ({
    item,
    columns,
    participants,
    currentParticipantId,
    onClaim: () => onClaim(item),
    onUnclaim: () => onUnclaim(item),
    onMarkDone: () => onMarkDone(item),
    onUpdate: (data: Record<string, any>) => onUpdate(item, data),
    onDelete: () => onDelete(item),
  });

  // Table view
  if (viewMode === "table") {
    return (
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-muted/50">
              {columns.map((col) => (
                <th key={col.key} className="px-3 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
              <th className="px-3 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-3 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Claimed by</th>
              <th className="px-3 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-28">Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <>{group.label && (
                <tr key={`group-${group.label}`}>
                  <td colSpan={columns.length + 3} className="px-3 pt-3">
                    <CategoryHeader category={group.label} count={group.items.length} />
                  </td>
                </tr>
              )}
              {group.items.map((item) => (
                <ItemRow key={item.id} {...itemProps(item)} />
              ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Card view
  return (
    <div>
      <AnimatePresence mode="popLayout">
        {groups.map((group) => (
          <div key={group.label || "all"}>
            {group.label && (
              <CategoryHeader category={group.label} count={group.items.length} />
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-2">
              {group.items.map((item) => (
                <ItemCard key={item.id} {...itemProps(item)} />
              ))}
            </div>
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
