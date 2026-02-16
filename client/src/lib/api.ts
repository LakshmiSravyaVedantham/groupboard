import type {
  BoardWithDetails, Board, Item, Participant,
  CreateBoardInput, CreateItemInput, UpdateItemInput, JoinBoardInput,
  CreateBoardResponse,
} from "@shared/schema.ts";

const BASE = "/api";

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(BASE + url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || res.statusText);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  createBoard: (input: CreateBoardInput) =>
    fetchJSON<CreateBoardResponse>("/boards", { method: "POST", body: JSON.stringify(input) }),

  getBoard: (shareCode: string) =>
    fetchJSON<BoardWithDetails>(`/boards/${shareCode}`),

  updateBoard: (id: number, updates: Partial<Pick<Board, "title" | "description" | "config">>) =>
    fetchJSON<Board>(`/boards/${id}`, { method: "PUT", body: JSON.stringify(updates) }),

  addItem: (boardId: number, input: CreateItemInput) =>
    fetchJSON<Item>(`/boards/${boardId}/items`, { method: "POST", body: JSON.stringify(input) }),

  updateItem: (boardId: number, itemId: number, input: UpdateItemInput) =>
    fetchJSON<Item>(`/boards/${boardId}/items/${itemId}`, { method: "PUT", body: JSON.stringify(input) }),

  deleteItem: (boardId: number, itemId: number) =>
    fetchJSON<void>(`/boards/${boardId}/items/${itemId}`, { method: "DELETE" }),

  reorderItems: (boardId: number, itemIds: number[]) =>
    fetchJSON<Item[]>(`/boards/${boardId}/items/reorder`, { method: "PUT", body: JSON.stringify({ itemIds }) }),

  joinBoard: (boardId: number, input: JoinBoardInput) =>
    fetchJSON<Participant>(`/boards/${boardId}/participants`, { method: "POST", body: JSON.stringify(input) }),
};
