import { Hand, Check, Trash2, Undo2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { InlineEdit } from "./InlineEdit";
import { ParticipantAvatar } from "./ParticipantBar";
import type { Item, Participant, ColumnDef } from "@shared/schema.ts";

interface ItemRowProps {
  item: Item;
  columns: ColumnDef[];
  participants: Participant[];
  currentParticipantId?: number;
  onClaim: () => void;
  onUnclaim: () => void;
  onMarkDone: () => void;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
  isHost: boolean;
}

const statusLabels = { unclaimed: "Open", claimed: "Claimed", done: "Done" };
const statusBadge = {
  unclaimed: "bg-muted text-muted-foreground",
  claimed: "bg-blue-900/40 text-blue-300",
  done: "bg-emerald-900/40 text-emerald-300",
};

export function ItemRow({
  item, columns, participants, currentParticipantId,
  onClaim, onUnclaim, onMarkDone, onUpdate, onDelete, isHost,
}: ItemRowProps) {
  const claimedParticipant = participants.find(p => p.id === item.claimedBy);
  const isClaimedByMe = item.claimedBy === currentParticipantId;

  return (
    <tr className="border-b border-border/30 hover:bg-accent/30 transition-colors">
      {columns.map((col) => (
        <td key={col.key} className="px-3 py-1.5">
          {isHost ? (
            <InlineEdit
              value={item.data[col.key]}
              column={col}
              onSave={(val) => onUpdate({ [col.key]: val })}
              className="text-sm"
            />
          ) : (
            <span className="text-sm">{item.data[col.key] || ""}</span>
          )}
        </td>
      ))}
      <td className="px-3 py-1.5">
        <span className={cn("px-2 py-0.5 rounded-md text-[11px] font-medium", statusBadge[item.status])}>
          {statusLabels[item.status]}
        </span>
      </td>
      <td className="px-3 py-1.5">
        {claimedParticipant ? (
          <div className="flex items-center gap-1.5">
            <ParticipantAvatar participant={claimedParticipant} size="xs" />
            <span className="text-xs text-muted-foreground">{claimedParticipant.name}</span>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground/30">—</span>
        )}
      </td>
      <td className="px-3 py-1.5">
        <div className="flex items-center gap-0.5">
          {item.status === "unclaimed" && (
            <button onClick={onClaim} className="p-2 text-primary hover:bg-primary/10 rounded-lg min-w-[32px] min-h-[32px] flex items-center justify-center" title="Claim">
              <Hand className="w-3.5 h-3.5" />
            </button>
          )}
          {item.status === "claimed" && isClaimedByMe && (
            <>
              <button onClick={onMarkDone} className="p-2 text-emerald-400 hover:bg-emerald-950/30 rounded-lg min-w-[32px] min-h-[32px] flex items-center justify-center" title="Done">
                <Check className="w-3.5 h-3.5" />
              </button>
              <button onClick={onUnclaim} className="p-2 text-muted-foreground hover:bg-accent rounded-lg min-w-[32px] min-h-[32px] flex items-center justify-center" title="Unclaim">
                <Undo2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
          {isHost && (
            <button onClick={onDelete} className="p-2 text-muted-foreground/20 hover:text-destructive hover:bg-destructive/10 rounded-lg min-w-[32px] min-h-[32px] flex items-center justify-center" title="Delete">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
