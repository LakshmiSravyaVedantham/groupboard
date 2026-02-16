import { z } from "zod";

// Column definition for dynamic board configuration
export const columnDefSchema = z.object({
  key: z.string(),
  label: z.string(),
  type: z.enum(["text", "number", "select", "date"]),
  options: z.array(z.string()).optional(),
  placeholder: z.string().optional(),
});

export type ColumnDef = z.infer<typeof columnDefSchema>;

// Board config
export const boardConfigSchema = z.object({
  columns: z.array(columnDefSchema),
  summaryConfig: z.object({
    countField: z.string().optional(),
    sumField: z.string().optional(),
    groupByField: z.string().optional(),
  }).optional(),
});

export type BoardConfig = z.infer<typeof boardConfigSchema>;

// Template types
export const templateTypes = ["potluck", "rsvp", "trip", "shopping", "custom"] as const;
export type TemplateType = typeof templateTypes[number];

// Board
export const boardSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  description: z.string().optional(),
  templateType: z.enum(templateTypes),
  shareCode: z.string().length(6),
  config: boardConfigSchema,
  createdAt: z.string(),
});

export type Board = z.infer<typeof boardSchema>;

export const createBoardSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  templateType: z.enum(templateTypes),
  config: boardConfigSchema.optional(),
});

export type CreateBoardInput = z.infer<typeof createBoardSchema>;

// Item statuses
export const itemStatuses = ["unclaimed", "claimed", "done"] as const;
export type ItemStatus = typeof itemStatuses[number];

// Item
export const itemSchema = z.object({
  id: z.number(),
  boardId: z.number(),
  data: z.record(z.string(), z.any()),
  status: z.enum(itemStatuses),
  claimedBy: z.number().nullable(),
  order: z.number(),
  createdAt: z.string(),
});

export type Item = z.infer<typeof itemSchema>;

export const createItemSchema = z.object({
  data: z.record(z.string(), z.any()),
});

export type CreateItemInput = z.infer<typeof createItemSchema>;

export const updateItemSchema = z.object({
  data: z.record(z.string(), z.any()).optional(),
  status: z.enum(itemStatuses).optional(),
  claimedBy: z.number().nullable().optional(),
});

export type UpdateItemInput = z.infer<typeof updateItemSchema>;

export const reorderItemsSchema = z.object({
  itemIds: z.array(z.number()),
});

// Participant
export const participantSchema = z.object({
  id: z.number(),
  boardId: z.number(),
  name: z.string().min(1),
  avatarColor: z.string(),
  joinedAt: z.string(),
});

export type Participant = z.infer<typeof participantSchema>;

export const joinBoardSchema = z.object({
  name: z.string().min(1),
  avatarColor: z.string(),
});

export type JoinBoardInput = z.infer<typeof joinBoardSchema>;

// Full board response
export interface BoardWithDetails {
  board: Board;
  items: Item[];
  participants: Participant[];
}
