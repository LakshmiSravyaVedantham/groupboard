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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {Object.values(templates).map((template, i) => {
        const Icon = iconMap[template.icon];
        const theme = templateThemes[template.type];
        return (
          <motion.button
            key={template.type}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(template.type)}
            className="flex flex-col items-start rounded-xl border border-border bg-card hover:bg-accent/50 hover:border-border/80 transition-all text-left cursor-pointer group overflow-hidden"
          >
            {/* Color strip at top */}
            <div className={cn("w-full h-1", theme.headerGradient)} />

            <div className="p-5 w-full">
              <div className="flex items-center justify-between mb-3">
                <div className={cn("p-2.5 rounded-lg", theme.accentLight)}>
                  {Icon && <Icon className={cn("w-5 h-5", theme.accent)} />}
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground/0 group-hover:text-muted-foreground transition-colors" />
              </div>

              <h3 className="font-semibold text-foreground mb-1">{template.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{template.description}</p>

              {/* Column tags */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {template.config.columns.slice(0, 3).map((col) => (
                  <span
                    key={col.key}
                    className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-muted text-muted-foreground"
                  >
                    {col.label}
                  </span>
                ))}
                {template.config.columns.length > 3 && (
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-muted text-muted-foreground">
                    +{template.config.columns.length - 3}
                  </span>
                )}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
