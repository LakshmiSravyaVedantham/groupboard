import { useState } from "react";
import { useLocation, useSearch } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useCreateBoard } from "@/hooks/use-board";
import { templates } from "@shared/templates.ts";
import { avatarColors } from "@shared/templates.ts";
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
  const [hostName, setHostName] = useState("");
  const [hostColor, setHostColor] = useState(
    avatarColors[Math.floor(Math.random() * avatarColors.length)]
  );
  const createBoard = useCreateBoard();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !hostName.trim()) return;

    const { board, hostParticipant } = await createBoard.mutateAsync({
      title: title.trim(),
      description: description.trim() || undefined,
      templateType,
      hostName: hostName.trim(),
      hostColor,
    });

    // Save host participant to localStorage so they're auto-joined
    const key = `groupboard_participant_${board.id}`;
    localStorage.setItem(key, JSON.stringify({
      id: hostParticipant.id,
      name: hostParticipant.name,
      avatarColor: hostParticipant.avatarColor,
    }));

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

          <h1 className="text-2xl font-bold mb-8">Set up your board</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Board info */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">Board title</label>
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
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground/50">Your identity</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Host identity */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {/* Avatar preview */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 transition-colors"
                  style={{ backgroundColor: hostColor }}
                >
                  {hostName.trim()
                    ? hostName.trim().split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
                    : "?"
                  }
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-muted-foreground block mb-2">Your name</label>
                  <input
                    type="text"
                    value={hostName}
                    onChange={(e) => setHostName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-2">Color</label>
                <div className="flex gap-2 flex-wrap">
                  {avatarColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setHostColor(color)}
                      className={cn(
                        "w-8 h-8 rounded-full transition-all",
                        hostColor === color
                          ? "ring-2 ring-offset-2 ring-offset-background ring-white/50 scale-110"
                          : "opacity-40 hover:opacity-70 hover:scale-105"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs text-muted-foreground/50 mb-4">
                You'll be the host. Add options for your group after creating the board.
              </p>

              <button
                type="submit"
                disabled={!title.trim() || !hostName.trim() || createBoard.isPending}
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
