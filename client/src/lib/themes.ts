import type { TemplateType } from "@shared/schema.ts";

export interface BoardTheme {
  // Header gradient
  headerGradient: string;
  headerText: string;
  // Page background
  pageBg: string;
  // Accent colors
  accent: string;
  accentLight: string;
  accentBorder: string;
  // Claim button
  claimBg: string;
  claimHover: string;
  // Progress ring color
  progressColor: string;
  progressTrack: string;
  // Category row tints
  unclaimedBg: string;
  claimedBg: string;
  doneBg: string;
  // Needs bar
  needsChip: string;
  needsChipText: string;
}

export const templateThemes: Record<TemplateType, BoardTheme> = {
  potluck: {
    headerGradient: "bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400",
    headerText: "text-white",
    pageBg: "bg-gradient-to-b from-orange-50/80 to-white",
    accent: "text-orange-600",
    accentLight: "bg-orange-50",
    accentBorder: "border-orange-200",
    claimBg: "bg-orange-600",
    claimHover: "hover:bg-orange-700",
    progressColor: "#ea580c",
    progressTrack: "#fed7aa",
    unclaimedBg: "bg-white",
    claimedBg: "bg-orange-50/60",
    doneBg: "bg-green-50/60",
    needsChip: "bg-orange-100",
    needsChipText: "text-orange-800",
  },
  rsvp: {
    headerGradient: "bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-400",
    headerText: "text-white",
    pageBg: "bg-gradient-to-b from-violet-50/80 to-white",
    accent: "text-violet-600",
    accentLight: "bg-violet-50",
    accentBorder: "border-violet-200",
    claimBg: "bg-violet-600",
    claimHover: "hover:bg-violet-700",
    progressColor: "#7c3aed",
    progressTrack: "#ddd6fe",
    unclaimedBg: "bg-white",
    claimedBg: "bg-violet-50/60",
    doneBg: "bg-green-50/60",
    needsChip: "bg-violet-100",
    needsChipText: "text-violet-800",
  },
  trip: {
    headerGradient: "bg-gradient-to-r from-teal-600 via-emerald-500 to-cyan-400",
    headerText: "text-white",
    pageBg: "bg-gradient-to-b from-teal-50/80 to-white",
    accent: "text-teal-600",
    accentLight: "bg-teal-50",
    accentBorder: "border-teal-200",
    claimBg: "bg-teal-600",
    claimHover: "hover:bg-teal-700",
    progressColor: "#0d9488",
    progressTrack: "#99f6e4",
    unclaimedBg: "bg-white",
    claimedBg: "bg-teal-50/60",
    doneBg: "bg-green-50/60",
    needsChip: "bg-teal-100",
    needsChipText: "text-teal-800",
  },
  shopping: {
    headerGradient: "bg-gradient-to-r from-green-600 via-emerald-500 to-lime-400",
    headerText: "text-white",
    pageBg: "bg-gradient-to-b from-green-50/80 to-white",
    accent: "text-green-600",
    accentLight: "bg-green-50",
    accentBorder: "border-green-200",
    claimBg: "bg-green-600",
    claimHover: "hover:bg-green-700",
    progressColor: "#16a34a",
    progressTrack: "#bbf7d0",
    unclaimedBg: "bg-white",
    claimedBg: "bg-green-50/60",
    doneBg: "bg-emerald-50/60",
    needsChip: "bg-green-100",
    needsChipText: "text-green-800",
  },
  custom: {
    headerGradient: "bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-400",
    headerText: "text-white",
    pageBg: "bg-gradient-to-b from-blue-50/80 to-white",
    accent: "text-blue-600",
    accentLight: "bg-blue-50",
    accentBorder: "border-blue-200",
    claimBg: "bg-blue-600",
    claimHover: "hover:bg-blue-700",
    progressColor: "#2563eb",
    progressTrack: "#bfdbfe",
    unclaimedBg: "bg-white",
    claimedBg: "bg-blue-50/60",
    doneBg: "bg-green-50/60",
    needsChip: "bg-blue-100",
    needsChipText: "text-blue-800",
  },
};

export function getTheme(templateType: TemplateType): BoardTheme {
  return templateThemes[templateType];
}
