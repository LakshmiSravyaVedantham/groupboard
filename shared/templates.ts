import type { BoardConfig, TemplateType } from "./schema.js";

export interface TemplateDefinition {
  type: TemplateType;
  label: string;
  description: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind color class
  bgColor: string;
  config: BoardConfig;
  sampleItems: Record<string, any>[];
}

export const templates: Record<TemplateType, TemplateDefinition> = {
  potluck: {
    type: "potluck",
    label: "Potluck",
    description: "Coordinate who brings what to your gathering",
    icon: "UtensilsCrossed",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    config: {
      columns: [
        { key: "name", label: "Item Name", type: "text", placeholder: "e.g., Caesar Salad" },
        {
          key: "category",
          label: "Category",
          type: "select",
          options: ["Appetizer", "Main Dish", "Side", "Dessert", "Drink", "Other"],
        },
        { key: "serves", label: "Serves", type: "number", placeholder: "e.g., 8" },
        { key: "dietary", label: "Dietary Notes", type: "text", placeholder: "e.g., Gluten-free" },
      ],
      summaryConfig: {
        countField: "name",
        groupByField: "category",
      },
    },
    sampleItems: [
      { name: "Caesar Salad", category: "Side", serves: 8, dietary: "Vegetarian" },
      { name: "BBQ Pulled Pork", category: "Main Dish", serves: 12, dietary: "" },
      { name: "Chocolate Brownies", category: "Dessert", serves: 16, dietary: "Contains nuts" },
      { name: "Lemonade Pitcher", category: "Drink", serves: 10, dietary: "" },
    ],
  },
  rsvp: {
    type: "rsvp",
    label: "Event RSVP",
    description: "Track who's coming to your event",
    icon: "CalendarCheck",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    config: {
      columns: [
        { key: "name", label: "Name", type: "text", placeholder: "Your name" },
        {
          key: "attending",
          label: "Attending",
          type: "select",
          options: ["Yes", "No", "Maybe"],
        },
        { key: "plusOnes", label: "Plus Ones", type: "number", placeholder: "0" },
        { key: "dietary", label: "Dietary Needs", type: "text", placeholder: "Any restrictions?" },
        { key: "notes", label: "Notes", type: "text", placeholder: "Any notes?" },
      ],
      summaryConfig: {
        countField: "name",
        sumField: "plusOnes",
      },
    },
    sampleItems: [
      { name: "Alex Johnson", attending: "Yes", plusOnes: 1, dietary: "Vegetarian", notes: "" },
      { name: "Sam Rivera", attending: "Maybe", plusOnes: 0, dietary: "", notes: "Checking schedule" },
    ],
  },
  trip: {
    type: "trip",
    label: "Trip Planning",
    description: "Organize tasks and budgets for your trip",
    icon: "Plane",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    config: {
      columns: [
        { key: "task", label: "Task", type: "text", placeholder: "e.g., Book hotel" },
        { key: "assignee", label: "Assignee", type: "text", placeholder: "Who's handling this?" },
        { key: "budget", label: "Budget ($)", type: "number", placeholder: "0" },
        { key: "deadline", label: "Deadline", type: "date" },
      ],
      summaryConfig: {
        countField: "task",
        sumField: "budget",
      },
    },
    sampleItems: [
      { task: "Book hotel", assignee: "", budget: 800, deadline: "" },
      { task: "Reserve rental car", assignee: "", budget: 200, deadline: "" },
      { task: "Plan day activities", assignee: "", budget: 150, deadline: "" },
      { task: "Book flights", assignee: "", budget: 1200, deadline: "" },
    ],
  },
  shopping: {
    type: "shopping",
    label: "Shopping List",
    description: "Shared shopping list for your group",
    icon: "ShoppingCart",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    config: {
      columns: [
        { key: "item", label: "Item", type: "text", placeholder: "e.g., Paper plates" },
        { key: "quantity", label: "Quantity", type: "number", placeholder: "1" },
        {
          key: "store",
          label: "Store",
          type: "select",
          options: ["Any", "Grocery", "Hardware", "Online", "Other"],
        },
      ],
      summaryConfig: {
        countField: "item",
        groupByField: "store",
      },
    },
    sampleItems: [
      { item: "Paper plates (50ct)", quantity: 2, store: "Grocery" },
      { item: "Plastic cups", quantity: 1, store: "Grocery" },
      { item: "Ice bags", quantity: 3, store: "Grocery" },
    ],
  },
  custom: {
    type: "custom",
    label: "Custom Board",
    description: "Start from scratch with your own columns",
    icon: "LayoutGrid",
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    config: {
      columns: [
        { key: "title", label: "Title", type: "text", placeholder: "Item title" },
        { key: "notes", label: "Notes", type: "text", placeholder: "Additional details" },
      ],
      summaryConfig: {
        countField: "title",
      },
    },
    sampleItems: [],
  },
};

export const avatarColors = [
  "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
];
