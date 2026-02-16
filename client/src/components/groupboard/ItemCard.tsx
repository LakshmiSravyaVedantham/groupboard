import { motion } from "framer-motion";
import { Hand, Check, Trash2, Undo2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { InlineEdit } from "./InlineEdit";
import { ParticipantAvatar } from "./ParticipantBar";
import type { Item, Participant, ColumnDef } from "@shared/schema.ts";

interface ItemCardProps {
  item: Item;
  columns: ColumnDef[];
  participants: Participant[];
  currentParticipantId?: number;
  onClaim: () => void;
  onUnclaim: () => void;
  onMarkDone: () => void;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
}

const statusConfig = {
  unclaimed: { label: "Available", bg: "bg-white border-gray-200 hover:border-gray-300", badge: "bg-gray-100 text-gray-600" },
  claimed: { label: "Claimed", bg: "bg-blue-50/60 border-blue-200", badge: "bg-blue-100 text-blue-700" },
  done: { label: "Done", bg: "bg-green-50/60 border-green-200", badge: "bg-green-100 text-green-700" },
};

export function ItemCard({
  item, columns, participants, currentParticipantId,
  onClaim, onUnclaim, onMarkDone, onUpdate, onDelete,
}: ItemCardProps) {
  const config = statusConfig[item.status];
  const claimedParticipant = participants.find(p => p.id === item.claimedBy);
  const isClaimedByMe = item.claimedBy === currentParticipantId;
  const primaryColumn = columns[0];
  const primaryValue = primaryColumn ? item.data[primaryColumn.key] : "";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={cn("rounded-xl border p-4 transition-all shadow-sm hover:shadow-md", config.bg)}
    >
      {/* Header row: primary field + status badge */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="font-semibold text-base min-w-0 flex-1">
          <InlineEdit
            value={primaryValue}
            column={primaryColumn}
            onSave={(val) => onUpdate({ [primaryColumn.key]: val })}
          />
        </div>
        <span className={cn("px-2 py-0.5 rounded-full text-[11px] font-medium shrink-0 mt-1", config.badge)}>
          {config.label}
        </span>
      </div>

      {/* Secondary fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5 mb-3">
        {columns.slice(1).map((col) => (
          <div key={col.key} className="min-w-0 group/field">
            <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">{col.label}</span>
            <InlineEdit
              value={item.data[col.key]}
              column={col}
              onSave={(val) => onUpdate({ [col.key]: val })}
              className="text-sm"
            />
          </div>
        ))}
      </div>

      {/* Footer: claimed by + actions */}
      <div className="flex items-center justify-between pt-2.5 border-t border-border/40">
        <div className="flex items-center gap-1.5 min-h-[36px]">
          {claimedParticipant ? (
            <>
              <ParticipantAvatar participant={claimedParticipant} size="xs" />
              <span className="text-xs text-muted-foreground">{claimedParticipant.name}</span>
            </>
          ) : (
            <span className="text-xs text-muted-foreground/60">No one yet</span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* Always show claim button for unclaimed items — triggers join if needed */}
          {item.status === "unclaimed" && (
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={onClaim}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors min-h-[40px] shadow-sm"
            >
              <Hand className="w-4 h-4" />
              I'll bring this!
            </motion.button>
          )}

          {item.status === "claimed" && isClaimedByMe && (
            <>
              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={onMarkDone}
                className="flex items-center gap-1.5 px-3 py-2 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700 transition-colors min-h-[40px] shadow-sm"
              >
                <Check className="w-4 h-4" />
                Mark done
              </motion.button>
              <button
                onClick={onUnclaim}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="Unclaim this item"
              >
                <Undo2 className="w-4 h-4" />
              </button>
            </>
          )}

          {item.status === "claimed" && !isClaimedByMe && (
            <span className="text-xs text-blue-600 font-medium px-2">Taken</span>
          )}

          <button
            onClick={onDelete}
            className="p-2 text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
            title="Delete item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
