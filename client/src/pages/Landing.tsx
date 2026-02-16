import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Zap, Users, Share2, MousePointerClick, ArrowRight } from "lucide-react";
import { TemplateSelector } from "@/components/groupboard/TemplateSelector";
import type { TemplateType } from "@shared/schema.ts";

export function Landing() {
  const [, navigate] = useLocation();
  const [joinCode, setJoinCode] = useState("");

  const handleSelect = (type: TemplateType) => {
    navigate(`/create?template=${type}`);
  };

  const handleJoinByCode = (e: React.FormEvent) => {
    e.preventDefault();
    const code = joinCode.trim().toUpperCase();
    if (code.length === 6) {
      navigate(`/b/${code}`);
    }
  };

  const steps = [
    { icon: Zap, title: "Pick a template", desc: "Choose from potluck, RSVP, trip planning, and more" },
    { icon: Share2, title: "Share the link", desc: "Send a 6-character code to your group" },
    { icon: MousePointerClick, title: "Tap to claim", desc: "One tap to claim items — no cell editing" },
    { icon: Users, title: "Collaborate live", desc: "See updates in real-time as your group fills in" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            Group<span className="text-primary">Board</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-6">
            Beautiful collaborative boards for potlucks, RSVPs, trip planning, and more.
            Replace clunky spreadsheets with one-tap claiming.
          </p>

          {/* Join existing board */}
          <form onSubmit={handleJoinByCode} className="flex items-center gap-2 max-w-xs mx-auto">
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase().slice(0, 6))}
              placeholder="Have a code? e.g. ABC123"
              maxLength={6}
              className="flex-1 px-3 py-2.5 border rounded-lg text-sm text-center font-mono tracking-widest outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary uppercase"
            />
            <button
              type="submit"
              disabled={joinCode.trim().length !== 6}
              className="p-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-30"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="text-center p-4"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2">
                <step.icon className="w-5 h-5" />
              </div>
              <p className="text-sm font-semibold mb-0.5">{step.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-px bg-border" />
          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Create a new board
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Templates */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <TemplateSelector onSelect={handleSelect} />
        </motion.div>
      </div>
    </div>
  );
}
