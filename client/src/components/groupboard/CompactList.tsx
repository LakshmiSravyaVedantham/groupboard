import { motion, AnimatePresence } from "framer-motion";
import { Hand, Check, Trash2, Undo2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { InlineEdit } from "./InlineEdit";
import { CategoryHeader } from "./CategoryHeader";
import type { Board, Item, Participant, ColumnDef } from "@shared/schema.ts";
import type { BoardTheme } from "@/lib/themes";

interface CompactListProps {
  board: Board;
  items: Item[];
  participants: Participant[];
  currentParticipantId?: number;
  theme: BoardTheme;
  onClaim: (item: Item) => void;
  onUnclaim: (item: Item) => void;
  onMarkDone: (item: Item) => void;
  onUpdate: (item: Item, data: Record<string, any>) => void;
  onDelete: (item: Item) => void;
}

function CompactRow({
  item, columns, participants, currentParticipantId, theme,
  onClaim, onUnclaim, onMarkDone, onUpdate, onDelete,
}: {
  item: Item;
  columns: ColumnDef[];
  participants: Participant[];
  currentParticipantId?: number;
  theme: BoardTheme;
  onClaim: () => void;
  onUnclaim: () => void;
  onMarkDone: () => void;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
}) {
  const claimedBy = participants.find(p => p.id === item.claimedBy);
  const isClaimedByMe = item.claimedBy === currentParticipantId;
  const primaryCol = columns[0];
  const primaryVal = item.data[primaryCol?.key];

  const bgClass = item.status === "done"
    ? theme.doneBg
    : item.status === "claimed"
      ? theme.claimedBg
      : theme.unclaimedBg;

  // Build a mobile subtitle from secondary fields
  const secondaryParts = columns.slice(1)
    .map(col => item.data[col.key])
    .filter(v => v !== undefined && v !== null && v !== "");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      className={cn(
        "px-3 py-2.5 rounded-lg border transition-all group",
        bgClass,
        item.status === "unclaimed" && "hover:shadow-md hover:border-gray-300"
      )}
      style={claimedBy ? { borderLeftWidth: 4, borderLeftColor: claimedBy.avatarColor } : {}}
    >
      {/* Main row */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Status dot */}
        <div className={cn(
          "w-2.5 h-2.5 rounded-full shrink-0",
          item.status === "done" ? "bg-green-500" : item.status === "claimed" ? "bg-blue-500" : "bg-gray-300"
        )} />

        {/* Primary field */}
        <div className="font-medium min-w-0 flex-1 sm:flex-none sm:w-48">
          <InlineEdit
            value={primaryVal}
            column={primaryCol}
            onSave={(val) => onUpdate({ [primaryCol.key]: val })}
            className="text-sm font-medium"
          />
        </div>

        {/* Desktop: secondary fields */}
        <div className="hidden sm:flex items-center gap-3 flex-1 min-w-0">
          {columns.slice(1).map((col) => (
            <div key={col.key} className="min-w-0 flex-1 max-w-[160px]">
              <InlineEdit
                value={item.data[col.key]}
                column={col}
                onSave={(val) => onUpdate({ [col.key]: val })}
                className="text-xs"
              />
            </div>
          ))}
        </div>

        {/* Desktop: who claimed it */}
        <div className="shrink-0 w-28 hidden sm:flex items-center gap-1.5">
          {claimedBy ? (
            <>
              <span
                className="w-5 h-5 rounded-full inline-flex items-center justify-center text-white text-[8px] font-bold shrink-0"
                style={{ backgroundColor: claimedBy.avatarColor }}
              >
                {claimedBy.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)}
              </span>
              <span className="text-xs truncate">{claimedBy.name}</span>
            </>
          ) : (
            <span className="text-xs text-muted-foreground/40 italic">unclaimed</span>
          )}
        </div>

        {/* Mobile: claimed avatar */}
        {claimedBy && (
          <span
            className="sm:hidden w-6 h-6 rounded-full inline-flex items-center justify-center text-white text-[9px] font-bold shrink-0"
            style={{ backgroundColor: claimedBy.avatarColor }}
            title={claimedBy.name}
          >
            {claimedBy.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)}
          </span>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-0.5 shrink-0">
          {item.status === "unclaimed" && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onClaim}
              className={cn(
                "flex items-center gap-1 px-2.5 py-2 rounded-lg text-white text-xs font-semibold transition-colors min-h-[40px]",
                theme.claimBg, theme.claimHover
              )}
            >
              <Hand className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Claim</span>
            </motion.button>
          )}
          {item.status === "claimed" && isClaimedByMe && (
            <>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onMarkDone}
                className="flex items-center gap-1 px-2 py-2 rounded-lg bg-green-600 text-white text-xs font-semibold hover:bg-green-700 min-h-[40px]"
              >
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Done</span>
              </motion.button>
              <button onClick={onUnclaim} className="p-2 text-muted-foreground hover:bg-muted rounded-lg min-h-[40px]" title="Unclaim">
                <Undo2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
          {item.status === "claimed" && !isClaimedByMe && (
            <span className="text-[11px] text-blue-600 font-medium px-1.5">Taken</span>
          )}
          {item.status === "done" && (
            <span className="text-[11px] text-green-600 font-medium px-1.5 flex items-center gap-0.5">
              <Check className="w-3 h-3" />
            </span>
          )}
          <button
            onClick={onDelete}
            className="p-2 text-muted-foreground/0 group-hover:text-muted-foreground/40 hover:!text-destructive hover:bg-destructive/10 rounded-lg transition-colors min-h-[40px]"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile: secondary detail line */}
      {secondaryParts.length > 0 && (
        <div className="sm:hidden flex items-center gap-2 mt-1 ml-[18px] text-xs text-muted-foreground truncate">
          {secondaryParts.join(" · ")}
        </div>
      )}
    </motion.div>
  );
}

export function CompactList({
  board, items, participants, currentParticipantId, theme,
  onClaim, onUnclaim, onMarkDone, onUpdate, onDelete,
}: CompactListProps) {
  const columns = board.config.columns;
  const groupByField = board.config.summaryConfig?.groupByField;

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

  return (
    <div className="space-y-1">
      <AnimatePresence mode="popLayout">
        {groups.map((group) => (
          <div key={group.label || "all"}>
            {group.label && (
              <CategoryHeader category={group.label} count={group.items.length} />
            )}
            <div className="space-y-1.5">
              {group.items.map((item) => (
                <CompactRow
                  key={item.id}
                  item={item}
                  columns={columns}
                  participants={participants}
                  currentParticipantId={currentParticipantId}
                  theme={theme}
                  onClaim={() => onClaim(item)}
                  onUnclaim={() => onUnclaim(item)}
                  onMarkDone={() => onMarkDone(item)}
                  onUpdate={(data) => onUpdate(item, data)}
                  onDelete={() => onDelete(item)}
                />
              ))}
            </div>
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
