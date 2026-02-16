import type { Participant } from "@shared/schema.ts";
import { cn } from "@/lib/utils";

interface ParticipantBarProps {
  participants: Participant[];
  currentParticipantId?: number;
}

function getInitials(name: string): string {
  return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
}

export function ParticipantBar({ participants, currentParticipantId }: ParticipantBarProps) {
  if (participants.length === 0) return null;

  return (
    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
      <span className="text-xs text-muted-foreground shrink-0 font-medium">Members:</span>
      <div className="flex gap-1.5">
        {participants.map((p) => (
          <div
            key={p.id}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-white shrink-0",
              p.id === currentParticipantId && "ring-2 ring-offset-1 ring-primary"
            )}
            style={{ backgroundColor: p.avatarColor }}
            title={p.name}
          >
            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-white/20 text-[10px]">
              {getInitials(p.name)}
            </span>
            <span className="max-w-[80px] truncate">{p.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ParticipantAvatar({ participant, size = "sm" }: { participant: Participant; size?: "sm" | "xs" }) {
  const sizeClass = size === "sm" ? "w-6 h-6 text-[10px]" : "w-5 h-5 text-[9px]";
  return (
    <span
      className={cn("inline-flex items-center justify-center rounded-full text-white font-medium", sizeClass)}
      style={{ backgroundColor: participant.avatarColor }}
      title={participant.name}
    >
      {getInitials(participant.name)}
    </span>
  );
}
