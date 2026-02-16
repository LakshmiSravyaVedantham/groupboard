import { motion } from "framer-motion";
import { templates } from "@shared/templates.ts";
import type { TemplateType } from "@shared/schema.ts";
import { templateThemes } from "@/lib/themes";
import {
  UtensilsCrossed, CalendarCheck, Plane, ShoppingCart, LayoutGrid, ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  UtensilsCrossed, CalendarCheck, Plane, ShoppingCart, LayoutGrid,
};

interface TemplateSelectorProps {
  onSelect: (type: TemplateType) => void;
}

export function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.values(templates).map((template, i) => {
        const Icon = iconMap[template.icon];
        const theme = templateThemes[template.type];
        return (
          <motion.button
            key={template.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(template.type)}
            className="flex flex-col items-start gap-3 rounded-xl border-2 border-transparent hover:border-white/50 hover:shadow-xl transition-all text-left cursor-pointer group overflow-hidden relative"
          >
            {/* Gradient banner at top */}
            <div className={cn("w-full px-5 pt-5 pb-3", theme.headerGradient)}>
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-white/25 backdrop-blur-sm">
                  {Icon && <Icon className="w-5 h-5 text-white" />}
                </div>
                <ArrowRight className="w-4 h-4 text-white/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-bold text-lg text-white mt-2 drop-shadow-sm">{template.label}</h3>
            </div>

            {/* Details area */}
            <div className="px-5 pb-5 w-full">
              <p className="text-sm text-muted-foreground">{template.description}</p>

              {/* Column chips */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {template.config.columns.map((col) => (
                  <span
                    key={col.key}
                    className={cn("px-2 py-0.5 rounded-full text-[11px] font-medium", theme.needsChip, theme.needsChipText)}
                  >
                    {col.label}
                  </span>
                ))}
              </div>

              {template.sampleItems.length > 0 && (
                <p className="text-[11px] text-muted-foreground/60 mt-2">
                  Includes {template.sampleItems.length} sample items
                </p>
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
