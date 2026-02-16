import type { TemplateType } from "@shared/schema.ts";

export interface BoardTheme {
  // Header
  headerGradient: string;
  headerText: string;
  // Page tint (subtle)
  pageBg: string;
  // Accent colors
  accent: string;
  accentLight: string;
  accentBorder: string;
  // Claim button
  claimBg: string;
  claimHover: string;
  // Progress ring
  progressColor: string;
  progressTrack: string;
  // Row backgrounds
  unclaimedBg: string;
  claimedBg: string;
  doneBg: string;
  // Needs bar chips
  needsChip: string;
  needsChipText: string;
  // Glow accent for hero touches
  glowColor: string;
}

export const templateThemes: Record<TemplateType, BoardTheme> = {
  potluck: {
    headerGradient: "bg-gradient-to-br from-amber-500/90 via-orange-600/80 to-red-600/70",
    headerText: "text-white",
    pageBg: "bg-gradient-to-b from-orange-950/20 via-background to-background",
    accent: "text-orange-400",
    accentLight: "bg-orange-950/30",
    accentBorder: "border-orange-800/40",
    claimBg: "bg-orange-600",
    claimHover: "hover:bg-orange-500",
    progressColor: "#f97316",
    progressTrack: "rgba(251,146,60,0.15)",
    unclaimedBg: "bg-card",
    claimedBg: "bg-orange-950/20",
    doneBg: "bg-emerald-950/20",
    needsChip: "bg-orange-900/40",
    needsChipText: "text-orange-300",
    glowColor: "rgba(249,115,22,0.08)",
  },
  rsvp: {
    headerGradient: "bg-gradient-to-br from-violet-500/90 via-purple-600/80 to-fuchsia-600/70",
    headerText: "text-white",
    pageBg: "bg-gradient-to-b from-violet-950/20 via-background to-background",
    accent: "text-violet-400",
    accentLight: "bg-violet-950/30",
    accentBorder: "border-violet-800/40",
    claimBg: "bg-violet-600",
    claimHover: "hover:bg-violet-500",
    progressColor: "#8b5cf6",
    progressTrack: "rgba(139,92,246,0.15)",
    unclaimedBg: "bg-card",
    claimedBg: "bg-violet-950/20",
    doneBg: "bg-emerald-950/20",
    needsChip: "bg-violet-900/40",
    needsChipText: "text-violet-300",
    glowColor: "rgba(139,92,246,0.08)",
  },
  trip: {
    headerGradient: "bg-gradient-to-br from-teal-500/90 via-emerald-600/80 to-cyan-600/70",
    headerText: "text-white",
    pageBg: "bg-gradient-to-b from-teal-950/20 via-background to-background",
    accent: "text-teal-400",
    accentLight: "bg-teal-950/30",
    accentBorder: "border-teal-800/40",
    claimBg: "bg-teal-600",
    claimHover: "hover:bg-teal-500",
    progressColor: "#14b8a6",
    progressTrack: "rgba(20,184,166,0.15)",
    unclaimedBg: "bg-card",
    claimedBg: "bg-teal-950/20",
    doneBg: "bg-emerald-950/20",
    needsChip: "bg-teal-900/40",
    needsChipText: "text-teal-300",
    glowColor: "rgba(20,184,166,0.08)",
  },
  shopping: {
    headerGradient: "bg-gradient-to-br from-green-500/90 via-emerald-600/80 to-lime-600/70",
    headerText: "text-white",
    pageBg: "bg-gradient-to-b from-green-950/20 via-background to-background",
    accent: "text-green-400",
    accentLight: "bg-green-950/30",
    accentBorder: "border-green-800/40",
    claimBg: "bg-green-600",
    claimHover: "hover:bg-green-500",
    progressColor: "#22c55e",
    progressTrack: "rgba(34,197,94,0.15)",
    unclaimedBg: "bg-card",
    claimedBg: "bg-green-950/20",
    doneBg: "bg-emerald-950/20",
    needsChip: "bg-green-900/40",
    needsChipText: "text-green-300",
    glowColor: "rgba(34,197,94,0.08)",
  },
  custom: {
    headerGradient: "bg-gradient-to-br from-blue-500/90 via-indigo-600/80 to-purple-600/70",
    headerText: "text-white",
    pageBg: "bg-gradient-to-b from-blue-950/20 via-background to-background",
    accent: "text-blue-400",
    accentLight: "bg-blue-950/30",
    accentBorder: "border-blue-800/40",
    claimBg: "bg-blue-600",
    claimHover: "hover:bg-blue-500",
    progressColor: "#3b82f6",
    progressTrack: "rgba(59,130,246,0.15)",
    unclaimedBg: "bg-card",
    claimedBg: "bg-blue-950/20",
    doneBg: "bg-emerald-950/20",
    needsChip: "bg-blue-900/40",
    needsChipText: "text-blue-300",
    glowColor: "rgba(59,130,246,0.08)",
  },
};

export function getTheme(templateType: TemplateType): BoardTheme {
  return templateThemes[templateType];
}
