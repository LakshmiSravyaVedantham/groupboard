import type {
  Board, Item, Participant,
  CreateBoardInput, CreateItemInput, UpdateItemInput,
  JoinBoardInput, BoardWithDetails, BoardConfig,
} from "../shared/schema.js";
import { templates } from "../shared/templates.js";

export interface IStorage {
  createBoard(input: CreateBoardInput): Promise<Board>;
  getBoardByShareCode(shareCode: string): Promise<BoardWithDetails | null>;
  updateBoard(id: number, updates: Partial<Pick<Board, "title" | "description" | "config">>): Promise<Board | null>;
  addItem(boardId: number, input: CreateItemInput): Promise<Item>;
  updateItem(boardId: number, itemId: number, input: UpdateItemInput): Promise<Item | null>;
  deleteItem(boardId: number, itemId: number): Promise<boolean>;
  reorderItems(boardId: number, itemIds: number[]): Promise<Item[]>;
  addParticipant(boardId: number, input: JoinBoardInput): Promise<Participant>;
}

function generateShareCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export class MemStorage implements IStorage {
  private boards: Map<number, Board> = new Map();
  private items: Map<number, Item> = new Map();
  private participants: Map<number, Participant> = new Map();
  private nextBoardId = 1;
  private nextItemId = 1;
  private nextParticipantId = 1;

  async createBoard(input: CreateBoardInput): Promise<Board> {
    const template = templates[input.templateType];
    const config: BoardConfig = input.config ?? template.config;

    const board: Board = {
      id: this.nextBoardId++,
      title: input.title,
      description: input.description ?? "",
      templateType: input.templateType,
      shareCode: generateShareCode(),
      config,
      createdAt: new Date().toISOString(),
    };

    this.boards.set(board.id, board);

    // Add sample items from template
    for (let i = 0; i < template.sampleItems.length; i++) {
      const item: Item = {
        id: this.nextItemId++,
        boardId: board.id,
        data: template.sampleItems[i],
        status: "unclaimed",
        claimedBy: null,
        order: i,
        createdAt: new Date().toISOString(),
      };
      this.items.set(item.id, item);
    }

    return board;
  }

  async getBoardByShareCode(shareCode: string): Promise<BoardWithDetails | null> {
    const board = Array.from(this.boards.values()).find(b => b.shareCode === shareCode);
    if (!board) return null;

    const items = Array.from(this.items.values())
      .filter(i => i.boardId === board.id)
      .sort((a, b) => a.order - b.order);

    const participants = Array.from(this.participants.values())
      .filter(p => p.boardId === board.id);

    return { board, items, participants };
  }

  async updateBoard(id: number, updates: Partial<Pick<Board, "title" | "description" | "config">>): Promise<Board | null> {
    const board = this.boards.get(id);
    if (!board) return null;

    const updated = { ...board, ...updates };
    this.boards.set(id, updated);
    return updated;
  }

  async addItem(boardId: number, input: CreateItemInput): Promise<Item> {
    const boardItems = Array.from(this.items.values()).filter(i => i.boardId === boardId);
    const maxOrder = boardItems.length > 0 ? Math.max(...boardItems.map(i => i.order)) : -1;

    const item: Item = {
      id: this.nextItemId++,
      boardId,
      data: input.data,
      status: "unclaimed",
      claimedBy: null,
      order: maxOrder + 1,
      createdAt: new Date().toISOString(),
    };

    this.items.set(item.id, item);
    return item;
  }

  async updateItem(boardId: number, itemId: number, input: UpdateItemInput): Promise<Item | null> {
    const item = this.items.get(itemId);
    if (!item || item.boardId !== boardId) return null;

    const updated: Item = {
      ...item,
      ...(input.data !== undefined && { data: { ...item.data, ...input.data } }),
      ...(input.status !== undefined && { status: input.status }),
      ...(input.claimedBy !== undefined && { claimedBy: input.claimedBy }),
    };

    this.items.set(itemId, updated);
    return updated;
  }

  async deleteItem(boardId: number, itemId: number): Promise<boolean> {
    const item = this.items.get(itemId);
    if (!item || item.boardId !== boardId) return false;
    this.items.delete(itemId);
    return true;
  }

  async reorderItems(boardId: number, itemIds: number[]): Promise<Item[]> {
    itemIds.forEach((id, index) => {
      const item = this.items.get(id);
      if (item && item.boardId === boardId) {
        this.items.set(id, { ...item, order: index });
      }
    });

    return Array.from(this.items.values())
      .filter(i => i.boardId === boardId)
      .sort((a, b) => a.order - b.order);
  }

  async addParticipant(boardId: number, input: JoinBoardInput): Promise<Participant> {
    const participant: Participant = {
      id: this.nextParticipantId++,
      boardId,
      name: input.name,
      avatarColor: input.avatarColor,
      joinedAt: new Date().toISOString(),
    };

    this.participants.set(participant.id, participant);
    return participant;
  }
}

export const storage = new MemStorage();
