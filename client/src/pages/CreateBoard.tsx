import { useState } from "react";
import { useLocation, useSearch } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useCreateBoard } from "@/hooks/use-board";
import { templates } from "@shared/templates.ts";
import type { TemplateType } from "@shared/schema.ts";
import { templateThemes } from "@/lib/themes";
import { cn } from "@/lib/utils";

export function CreateBoard() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const templateType = (params.get("template") || "custom") as TemplateType;
  const template = templates[templateType];
  const theme = templateThemes[templateType];

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
    <div className="min-h-screen">
      <div className="max-w-lg mx-auto px-5 py-16">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          {/* Template indicator */}
          <div className="flex items-center gap-3 mb-8">
            <div className={cn("w-1 h-8 rounded-full", theme.headerGradient)} />
            <div>
              <p className={cn("text-sm font-medium", theme.accent)}>{template.label}</p>
              <p className="text-xs text-muted-foreground">{template.description}</p>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-8">Name your board</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`e.g., ${templateType === "potluck" ? "Holiday Potluck 2026" : templateType === "rsvp" ? "Birthday Party" : templateType === "trip" ? "Summer Road Trip" : "My Board"}`}
                autoFocus
                className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/30"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-2">Description <span className="text-muted-foreground/40">(optional)</span></label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What's this board for?"
                className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/30"
              />
            </div>

            <div className="pt-3">
              <p className="text-xs text-muted-foreground/50 mb-4">
                Columns: {template.config.columns.map(c => c.label).join(" / ")}
                {template.sampleItems.length > 0 && ` — includes ${template.sampleItems.length} sample items`}
              </p>

              <button
                type="submit"
                disabled={!title.trim() || createBoard.isPending}
                className={cn(
                  "w-full py-3.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-30 text-white",
                  theme.claimBg, theme.claimHover
                )}
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
