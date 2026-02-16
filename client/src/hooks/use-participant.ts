import { useState, useCallback, useEffect } from "react";
import type { Participant } from "@shared/schema.ts";

interface StoredParticipant {
  id: number;
  name: string;
  avatarColor: string;
}

function getStorageKey(boardId: number) {
  return `groupboard_participant_${boardId}`;
}

export function useParticipant(boardId: number | undefined) {
  const [participant, setParticipant] = useState<StoredParticipant | null>(null);

  useEffect(() => {
    if (!boardId) return;
    const stored = localStorage.getItem(getStorageKey(boardId));
    if (stored) {
      try {
        setParticipant(JSON.parse(stored));
      } catch {
        setParticipant(null);
      }
    }
  }, [boardId]);

  const saveParticipant = useCallback((p: Participant) => {
    const stored: StoredParticipant = { id: p.id, name: p.name, avatarColor: p.avatarColor };
    localStorage.setItem(getStorageKey(p.boardId), JSON.stringify(stored));
    setParticipant(stored);
  }, []);

  const isJoined = participant !== null;

  return { participant, isJoined, saveParticipant };
}
