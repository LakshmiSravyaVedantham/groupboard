import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { CreateBoardInput, CreateItemInput, UpdateItemInput, JoinBoardInput } from "@shared/schema.ts";

export function useBoard(shareCode: string | undefined) {
  return useQuery({
    queryKey: ["board", shareCode],
    queryFn: () => api.getBoard(shareCode!),
    enabled: !!shareCode,
    refetchInterval: 5000,
  });
}

export function useCreateBoard() {
  return useMutation({
    mutationFn: (input: CreateBoardInput) => api.createBoard(input),
  });
}

export function useUpdateBoard(shareCode: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Parameters<typeof api.updateBoard>[1] }) =>
      api.updateBoard(id, updates),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["board", shareCode] }),
  });
}

export function useAddItem(shareCode: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ boardId, input }: { boardId: number; input: CreateItemInput }) =>
      api.addItem(boardId, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["board", shareCode] }),
  });
}

export function useUpdateItem(shareCode: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ boardId, itemId, input }: { boardId: number; itemId: number; input: UpdateItemInput }) =>
      api.updateItem(boardId, itemId, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["board", shareCode] }),
  });
}

export function useDeleteItem(shareCode: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ boardId, itemId }: { boardId: number; itemId: number }) =>
      api.deleteItem(boardId, itemId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["board", shareCode] }),
  });
}

export function useReorderItems(shareCode: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ boardId, itemIds }: { boardId: number; itemIds: number[] }) =>
      api.reorderItems(boardId, itemIds),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["board", shareCode] }),
  });
}

export function useJoinBoard(shareCode: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ boardId, input }: { boardId: number; input: JoinBoardInput }) =>
      api.joinBoard(boardId, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["board", shareCode] }),
  });
}
