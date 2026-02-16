import { useState } from "react";
import { useLocation, useSearch } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useCreateBoard } from "@/hooks/use-board";
import { templates } from "@shared/templates.ts";
import type { TemplateType } from "@shared/schema.ts";

export function CreateBoard() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const templateType = (params.get("template") || "custom") as TemplateType;
  const template = templates[templateType];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const createBoard = useCreateBoard();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const board = await createBoard.mutateAsync({
      title: title.trim(),
      description: description.trim() || undefined,
      templateType,
    });
    navigate(`/b/${board.shareCode}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-lg mx-auto px-4 py-12">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to templates
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6 ${template.bgColor} ${template.color}`}>
            <Sparkles className="w-4 h-4" />
            {template.label} board
          </div>

          <h1 className="text-2xl font-bold mb-6">Create your board</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1.5">Board title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`e.g., ${templateType === "potluck" ? "Holiday Potluck 2026" : templateType === "rsvp" ? "Birthday Party" : templateType === "trip" ? "Summer Road Trip" : "My Board"}`}
                autoFocus
                className="w-full px-3 py-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1.5">Description (optional)</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a short description..."
                className="w-full px-3 py-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="pt-2">
              <p className="text-xs text-muted-foreground mb-3">
                Columns: {template.config.columns.map(c => c.label).join(", ")}
                {template.sampleItems.length > 0 && ` • ${template.sampleItems.length} sample items included`}
              </p>

              <button
                type="submit"
                disabled={!title.trim() || createBoard.isPending}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {createBoard.isPending ? "Creating..." : "Create Board"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
