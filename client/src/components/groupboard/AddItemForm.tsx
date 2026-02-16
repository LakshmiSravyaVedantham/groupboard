import { useState } from "react";
import { Plus, ChevronUp, ChevronDown } from "lucide-react";
import type { ColumnDef } from "@shared/schema.ts";
import { cn } from "@/lib/utils";

interface AddItemFormProps {
  columns: ColumnDef[];
  onAdd: (data: Record<string, any>) => void;
  loading?: boolean;
}

export function AddItemForm({ columns, onAdd, loading }: AddItemFormProps) {
  const [expanded, setExpanded] = useState(false);
  const [values, setValues] = useState<Record<string, any>>({});
  const primaryColumn = columns[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values[primaryColumn.key]?.trim()) return;
    onAdd(values);
    setValues({});
    setExpanded(false);
  };

  const updateValue = (key: string, value: any) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const hasDetails = columns.length > 1;

  return (
    <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t pt-3 pb-4 px-1 -mx-1">
      <form onSubmit={handleSubmit}>
        {/* Quick add row */}
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={values[primaryColumn.key] || ""}
              onChange={(e) => updateValue(primaryColumn.key, e.target.value)}
              placeholder={primaryColumn.placeholder || `Add ${primaryColumn.label.toLowerCase()}...`}
              className="w-full px-3 py-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary pr-10"
            />
            {hasDetails && (
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className={cn(
                  "absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md transition-colors",
                  expanded ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-muted"
                )}
                title={expanded ? "Hide details" : "Add details (category, servings, etc.)"}
              >
                {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={!values[primaryColumn.key]?.trim() || loading}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium",
              "hover:bg-primary/90 transition-colors disabled:opacity-40 min-h-[44px] shrink-0"
            )}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add item</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        {/* Expanded detail fields */}
        {expanded && hasDetails && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3 p-3 bg-muted/50 rounded-lg border border-border/50">
            <p className="col-span-full text-[11px] text-muted-foreground font-medium uppercase tracking-wider -mb-1">
              Optional details
            </p>
            {columns.slice(1).map((col) => (
              <div key={col.key}>
                <label className="text-xs font-medium text-foreground block mb-1">{col.label}</label>
                {col.type === "select" && col.options ? (
                  <select
                    value={values[col.key] || ""}
                    onChange={(e) => updateValue(col.key, e.target.value)}
                    className="w-full px-2.5 py-2 border rounded-md text-sm bg-background outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="">Select...</option>
                    {col.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={col.type === "number" ? "number" : col.type === "date" ? "date" : "text"}
                    value={values[col.key] || ""}
                    onChange={(e) => updateValue(col.key, col.type === "number" ? Number(e.target.value) : e.target.value)}
                    placeholder={col.placeholder}
                    className="w-full px-2.5 py-2 border rounded-md text-sm bg-background outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
