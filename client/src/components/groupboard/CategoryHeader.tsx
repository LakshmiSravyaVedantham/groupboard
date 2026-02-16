import { cn } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  "Appetizer": "bg-amber-900/30 text-amber-400",
  "Main Dish": "bg-red-900/30 text-red-400",
  "Side": "bg-green-900/30 text-green-400",
  "Dessert": "bg-pink-900/30 text-pink-400",
  "Drink": "bg-blue-900/30 text-blue-400",
  "Other": "bg-muted text-muted-foreground",
  "Grocery": "bg-green-900/30 text-green-400",
  "Hardware": "bg-orange-900/30 text-orange-400",
  "Online": "bg-purple-900/30 text-purple-400",
  "Any": "bg-muted text-muted-foreground",
};

interface CategoryHeaderProps {
  category: string;
  count: number;
}

export function CategoryHeader({ category, count }: CategoryHeaderProps) {
  const colorClass = categoryColors[category] || "bg-muted text-muted-foreground";

  return (
    <div className="flex items-center gap-2 mt-5 mb-2 first:mt-0">
      <span className={cn("px-2.5 py-0.5 rounded-md text-xs font-semibold", colorClass)}>
        {category}
      </span>
      <span className="text-xs text-muted-foreground/50">{count}</span>
      <div className="flex-1 h-px bg-border/50" />
    </div>
  );
}
