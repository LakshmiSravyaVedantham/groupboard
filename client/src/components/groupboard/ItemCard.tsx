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
  unclaimed: { label: "Open", bg: "bg-card border-border hover:border-border/80", badge: "bg-muted text-muted-foreground" },
  claimed: { label: "Claimed", bg: "bg-blue-950/20 border-blue-800/30", badge: "bg-blue-900/40 text-blue-300" },
  done: { label: "Done", bg: "bg-emerald-950/20 border-emerald-800/30", badge: "bg-emerald-900/40 text-emerald-300" },
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
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className={cn("rounded-xl border p-4 transition-all", config.bg)}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="font-semibold text-base min-w-0 flex-1">
          <InlineEdit
            value={primaryValue}
            column={primaryColumn}
            onSave={(val) => onUpdate({ [primaryColumn.key]: val })}
          />
        </div>
        <span className={cn("px-2 py-0.5 rounded-md text-[11px] font-medium shrink-0 mt-1", config.badge)}>
          {config.label}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5 mb-3">
        {columns.slice(1).map((col) => (
          <div key={col.key} className="min-w-0">
            <span className="text-[11px] text-muted-foreground/60 font-medium uppercase tracking-wider">{col.label}</span>
            <InlineEdit
              value={item.data[col.key]}
              column={col}
              onSave={(val) => onUpdate({ [col.key]: val })}
              className="text-sm"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2.5 border-t border-border/30">
        <div className="flex items-center gap-1.5 min-h-[36px]">
          {claimedParticipant ? (
            <>
              <ParticipantAvatar participant={claimedParticipant} size="xs" />
              <span className="text-xs text-muted-foreground">{claimedParticipant.name}</span>
            </>
          ) : (
            <span className="text-xs text-muted-foreground/40">No one yet</span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {item.status === "unclaimed" && (
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={onClaim}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors min-h-[36px]"
            >
              <Hand className="w-3.5 h-3.5" />
              Claim
            </motion.button>
          )}
          {item.status === "claimed" && isClaimedByMe && (
            <>
              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={onMarkDone}
                className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-500 min-h-[36px]"
              >
                <Check className="w-3.5 h-3.5" />
                Done
              </motion.button>
              <button
                onClick={onUnclaim}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg min-h-[36px] min-w-[36px] flex items-center justify-center"
                title="Unclaim"
              >
                <Undo2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
          {item.status === "claimed" && !isClaimedByMe && (
            <span className="text-xs text-blue-400 font-medium px-2">Taken</span>
          )}
          <button
            onClick={onDelete}
            className="p-2 text-muted-foreground/20 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
