import { Router } from "express";
import { storage } from "./storage.js";
import { createBoardSchema, createItemSchema, updateItemSchema, reorderItemsSchema, joinBoardSchema } from "../shared/schema.js";

export const router = Router();

// Create board
router.post("/api/boards", async (req, res) => {
  const parsed = createBoardSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.format() });
    return;
  }
  const result = await storage.createBoard(parsed.data);
  res.status(201).json(result);
});

// Get board by share code
router.get("/api/boards/:shareCode", async (req, res) => {
  const result = await storage.getBoardByShareCode(req.params.shareCode);
  if (!result) {
    res.status(404).json({ error: "Board not found" });
    return;
  }
  res.json(result);
});

// Update board
router.put("/api/boards/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const board = await storage.updateBoard(id, req.body);
  if (!board) {
    res.status(404).json({ error: "Board not found" });
    return;
  }
  res.json(board);
});

// Add item
router.post("/api/boards/:id/items", async (req, res) => {
  const boardId = parseInt(req.params.id);
  const parsed = createItemSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.format() });
    return;
  }
  const item = await storage.addItem(boardId, parsed.data);
  res.status(201).json(item);
});

// Update item
router.put("/api/boards/:id/items/:itemId", async (req, res) => {
  const boardId = parseInt(req.params.id);
  const itemId = parseInt(req.params.itemId);
  const parsed = updateItemSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.format() });
    return;
  }
  const item = await storage.updateItem(boardId, itemId, parsed.data);
  if (!item) {
    res.status(404).json({ error: "Item not found" });
    return;
  }
  res.json(item);
});

// Delete item
router.delete("/api/boards/:id/items/:itemId", async (req, res) => {
  const boardId = parseInt(req.params.id);
  const itemId = parseInt(req.params.itemId);
  const success = await storage.deleteItem(boardId, itemId);
  if (!success) {
    res.status(404).json({ error: "Item not found" });
    return;
  }
  res.status(204).send();
});

// Reorder items
router.put("/api/boards/:id/items/reorder", async (req, res) => {
  const boardId = parseInt(req.params.id);
  const parsed = reorderItemsSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.format() });
    return;
  }
  const items = await storage.reorderItems(boardId, parsed.data.itemIds);
  res.json(items);
});

// Join board (add participant)
router.post("/api/boards/:id/participants", async (req, res) => {
  const boardId = parseInt(req.params.id);
  const parsed = joinBoardSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.format() });
    return;
  }
  const participant = await storage.addParticipant(boardId, parsed.data);
  res.status(201).json(participant);
});
