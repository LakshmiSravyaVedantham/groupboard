import { useState, useCallback } from "react";
import { useParams, Link } from "wouter";
import { Loader2, Home, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { getTheme } from "@/lib/themes";
import { useBoard, useAddItem, useUpdateItem, useDeleteItem, useJoinBoard } from "@/hooks/use-board";
import { useParticipant } from "@/hooks/use-participant";
import { BoardHeader } from "@/components/groupboard/BoardHeader";
import { NeedsBar } from "@/components/groupboard/NeedsBar";
import { ParticipantBar } from "@/components/groupboard/ParticipantBar";
import { BoardContent } from "@/components/groupboard/BoardContent";
import { AddItemForm } from "@/components/groupboard/AddItemForm";
import { JoinDialog } from "@/components/groupboard/JoinDialog";
import { ConfirmDialog } from "@/components/groupboard/ConfirmDialog";
import { toast } from "@/hooks/use-toast";
import type { Item } from "@shared/schema.ts";

export function BoardView() {
  const params = useParams<{ shareCode: string }>();
  const shareCode = params.shareCode!;
  const { data, isLoading, error } = useBoard(shareCode);
  const addItem = useAddItem(shareCode);
  const updateItem = useUpdateItem(shareCode);
  const deleteItem = useDeleteItem(shareCode);
  const joinBoard = useJoinBoard(shareCode);

  const { participant, isJoined, saveParticipant } = useParticipant(data?.board.id);
  const [viewMode, setViewMode] = useState<"card" | "table" | "compact">("compact");
  const [showJoin, setShowJoin] = useState(false);
  const [joinDismissed, setJoinDismissed] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Item | null>(null);

  const requireJoin = useCallback(() => {
    if (!isJoined) {
      setShowJoin(true);
      return true;
    }
    return false;
  }, [isJoined]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading board...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
          <h1 className="text-2xl font-bold mb-2">Board not found</h1>
          <p className="text-muted-foreground mb-4">The code "{shareCode}" doesn't match any board.</p>
          <Link href="/" className="text-primary text-sm hover:underline">Go to homepage</Link>
        </div>
      </div>
    );
  }

  const { board, items, participants } = data;
  const theme = getTheme(board.templateType);
  const primaryCol = board.config.columns[0];

  const handleClaim = (item: Item) => {
    if (requireJoin()) return;
    updateItem.mutate(
      { boardId: board.id, itemId: item.id, input: { status: "claimed", claimedBy: participant!.id } },
      { onSuccess: () => toast(`You claimed "${item.data[primaryCol?.key] || "item"}"!`) },
    );
  };

  const handleUnclaim = (item: Item) => {
    updateItem.mutate(
      { boardId: board.id, itemId: item.id, input: { status: "unclaimed", claimedBy: null } },
      { onSuccess: () => toast("Item unclaimed", "info") },
    );
  };

  const handleMarkDone = (item: Item) => {
    updateItem.mutate(
      { boardId: board.id, itemId: item.id, input: { status: "done" } },
      { onSuccess: () => toast("Marked as done!") },
    );
  };

  const handleUpdate = (item: Item, newData: Record<string, any>) => {
    updateItem.mutate({ boardId: board.id, itemId: item.id, input: { data: newData } });
  };

  const handleDeleteConfirmed = () => {
    if (!deleteTarget) return;
    deleteItem.mutate(
      { boardId: board.id, itemId: deleteTarget.id },
      { onSuccess: () => toast("Item deleted", "info") },
    );
    setDeleteTarget(null);
  };

  const handleAddItem = (itemData: Record<string, any>) => {
    addItem.mutate(
      { boardId: board.id, input: { data: itemData } },
      { onSuccess: () => toast("Item added!") },
    );
  };

  const handleJoin = async (name: string, avatarColor: string) => {
    const p = await joinBoard.mutateAsync({ boardId: board.id, input: { name, avatarColor } });
    saveParticipant(p);
    setShowJoin(false);
    toast(`Welcome, ${name}!`);
  };

  return (
    <div className={cn("min-h-screen flex flex-col", theme.pageBg)}>
      {/* Top nav */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-5xl mx-auto w-full px-4 py-2 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">GroupBoard</span>
          </Link>
          {isJoined && participant ? (
            <div className="flex items-center gap-2 text-sm">
              <span
                className="w-6 h-6 rounded-full inline-flex items-center justify-center text-white text-[10px] font-bold"
                style={{ backgroundColor: participant.avatarColor }}
              >
                {participant.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)}
              </span>
              <span className="text-muted-foreground">{participant.name}</span>
            </div>
          ) : (
            <button
              onClick={() => setShowJoin(true)}
              className={cn("text-sm font-medium px-3 py-1 rounded-lg text-white", theme.claimBg, theme.claimHover)}
            >
              Join Board
            </button>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-4 py-5 flex-1 flex flex-col">
        <BoardHeader
          board={board}
          items={items}
          participants={participants}
          theme={theme}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Join banner */}
        {!isJoined && !joinDismissed && (
          <div className={cn("mb-4 p-3 rounded-xl border flex items-center justify-between gap-3", theme.accentLight, theme.accentBorder)}>
            <p className="text-sm">
              <span className={cn("font-semibold", theme.accent)}>Join to collaborate</span>
              <span className="text-muted-foreground"> — claim items and your name appears on the board</span>
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setShowJoin(true)}
                className={cn("px-3 py-1.5 rounded-lg text-sm font-medium text-white", theme.claimBg, theme.claimHover)}
              >
                Join
              </button>
              <button onClick={() => setJoinDismissed(true)} className="text-xs text-muted-foreground hover:text-foreground">
                Later
              </button>
            </div>
          </div>
        )}

        <NeedsBar board={board} items={items} theme={theme} />
        <ParticipantBar participants={participants} currentParticipantId={participant?.id} />

        <div className="flex-1">
          <BoardContent
            board={board}
            items={items}
            participants={participants}
            currentParticipantId={participant?.id}
            viewMode={viewMode}
            theme={theme}
            onClaim={handleClaim}
            onUnclaim={handleUnclaim}
            onMarkDone={handleMarkDone}
            onUpdate={handleUpdate}
            onDelete={(item) => setDeleteTarget(item)}
          />
        </div>

        <AddItemForm columns={board.config.columns} onAdd={handleAddItem} loading={addItem.isPending} />
      </div>

      {showJoin && <JoinDialog onJoin={handleJoin} onClose={() => setShowJoin(false)} loading={joinBoard.isPending} />}
      {deleteTarget && (
        <ConfirmDialog
          title="Delete item?"
          message={`Remove "${deleteTarget.data[primaryCol?.key] || "this item"}" from the board?`}
          confirmLabel="Delete"
          destructive
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
