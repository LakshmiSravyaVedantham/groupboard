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
}

const statusLabels = { unclaimed: "Available", claimed: "Claimed", done: "Done" };
const statusBadge = {
  unclaimed: "bg-gray-100 text-gray-600",
  claimed: "bg-blue-100 text-blue-700",
  done: "bg-green-100 text-green-700",
};

export function ItemRow({
  item, columns, participants, currentParticipantId,
  onClaim, onUnclaim, onMarkDone, onUpdate, onDelete,
}: ItemRowProps) {
  const claimedParticipant = participants.find(p => p.id === item.claimedBy);
  const isClaimedByMe = item.claimedBy === currentParticipantId;

  return (
    <tr className="border-b hover:bg-muted/30 transition-colors">
      {columns.map((col) => (
        <td key={col.key} className="px-3 py-1.5">
          <InlineEdit
            value={item.data[col.key]}
            column={col}
            onSave={(val) => onUpdate({ [col.key]: val })}
            className="text-sm"
          />
        </td>
      ))}
      <td className="px-3 py-1.5">
        <span className={cn("px-2 py-0.5 rounded-full text-[11px] font-medium", statusBadge[item.status])}>
          {statusLabels[item.status]}
        </span>
      </td>
      <td className="px-3 py-1.5">
        {claimedParticipant ? (
          <div className="flex items-center gap-1.5">
            <ParticipantAvatar participant={claimedParticipant} size="xs" />
            <span className="text-xs">{claimedParticipant.name}</span>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground/50">—</span>
        )}
      </td>
      <td className="px-3 py-1.5">
        <div className="flex items-center gap-0.5">
          {item.status === "unclaimed" && (
            <button onClick={onClaim} className="p-2 text-primary hover:bg-primary/10 rounded-lg min-w-[36px] min-h-[36px] flex items-center justify-center" title="Claim this item">
              <Hand className="w-4 h-4" />
            </button>
          )}
          {item.status === "claimed" && isClaimedByMe && (
            <>
              <button onClick={onMarkDone} className="p-2 text-green-600 hover:bg-green-50 rounded-lg min-w-[36px] min-h-[36px] flex items-center justify-center" title="Mark done">
                <Check className="w-4 h-4" />
              </button>
              <button onClick={onUnclaim} className="p-2 text-muted-foreground hover:bg-muted rounded-lg min-w-[36px] min-h-[36px] flex items-center justify-center" title="Unclaim">
                <Undo2 className="w-4 h-4" />
              </button>
            </>
          )}
          <button onClick={onDelete} className="p-2 text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 rounded-lg min-w-[36px] min-h-[36px] flex items-center justify-center" title="Delete item">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
