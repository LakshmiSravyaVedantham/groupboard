import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
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

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <div className="relative overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute top-[-100px] right-[-150px] w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-5 pt-16 sm:pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6 border border-primary/20">
              <Sparkles className="w-3 h-3" />
              Stop fighting with spreadsheets
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
              Group plans,
              <br />
              <span className="text-primary">sorted.</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto mb-10">
              Potlucks, RSVPs, trip planning — one tap to claim, no spreadsheet skills needed.
              Share a 6-character code and go.
            </p>

            {/* Join existing board */}
            <form onSubmit={handleJoinByCode} className="flex items-center gap-2 max-w-xs mx-auto mb-4">
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase().slice(0, 6))}
                placeholder="Enter board code"
                maxLength={6}
                className="flex-1 px-4 py-3 bg-card border border-border rounded-xl text-sm text-center font-mono tracking-widest outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 uppercase placeholder:text-muted-foreground/40 placeholder:tracking-normal placeholder:font-sans"
              />
              <button
                type="submit"
                disabled={joinCode.trim().length !== 6}
                className="p-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <p className="text-xs text-muted-foreground/50">or create a new board below</p>
          </motion.div>
        </div>
      </div>

      {/* Templates section */}
      <div className="max-w-5xl mx-auto px-5 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Pick a template</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <TemplateSelector onSelect={handleSelect} />
        </motion.div>
      </div>
    </div>
  );
}
