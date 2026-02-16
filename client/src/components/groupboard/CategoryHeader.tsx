import { cn } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  "Appetizer": "bg-amber-100 text-amber-800",
  "Main Dish": "bg-red-100 text-red-800",
  "Side": "bg-green-100 text-green-800",
  "Dessert": "bg-pink-100 text-pink-800",
  "Drink": "bg-blue-100 text-blue-800",
  "Other": "bg-gray-100 text-gray-800",
  "Grocery": "bg-green-100 text-green-800",
  "Hardware": "bg-orange-100 text-orange-800",
  "Online": "bg-purple-100 text-purple-800",
  "Any": "bg-gray-100 text-gray-800",
};

interface CategoryHeaderProps {
  category: string;
  count: number;
}

export function CategoryHeader({ category, count }: CategoryHeaderProps) {
  const colorClass = categoryColors[category] || "bg-gray-100 text-gray-800";

  return (
    <div className="flex items-center gap-2 mt-4 mb-2 first:mt-0">
      <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold", colorClass)}>
        {category}
      </span>
      <span className="text-xs text-muted-foreground">{count} item{count !== 1 ? "s" : ""}</span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}
