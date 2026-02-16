import { useState, useRef, useEffect } from "react";
import { Pencil } from "lucide-react";
import type { ColumnDef } from "@shared/schema.ts";
import { cn } from "@/lib/utils";

interface InlineEditProps {
  value: any;
  column: ColumnDef;
  onSave: (value: any) => void;
  className?: string;
}

export function InlineEdit({ value, column, onSave, className }: InlineEditProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(value ?? "");
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select();
      }
    }
  }, [editing]);

  const commit = () => {
    setEditing(false);
    const newVal = column.type === "number" ? (editValue === "" ? "" : Number(editValue)) : editValue;
    if (newVal !== value) {
      onSave(newVal);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") commit();
    if (e.key === "Escape") {
      setEditValue(value ?? "");
      setEditing(false);
    }
  };

  if (!editing) {
    const displayValue = value === undefined || value === null || value === ""
      ? column.placeholder || "Click to edit"
      : column.type === "number" && column.label.includes("$")
        ? `$${value}`
        : String(value);

    const isEmpty = value === undefined || value === null || value === "";

    return (
      <button
        onClick={() => { setEditValue(value ?? ""); setEditing(true); }}
        className={cn(
          "text-left px-2 py-1 rounded-md hover:bg-muted/80 transition-colors min-h-[32px] cursor-text w-full group/edit relative",
          isEmpty && "text-muted-foreground/50 italic",
          className
        )}
      >
        <span>{displayValue}</span>
        <Pencil className="w-3 h-3 text-muted-foreground/0 group-hover/edit:text-muted-foreground/50 absolute right-1 top-1/2 -translate-y-1/2 transition-colors" />
      </button>
    );
  }

  if (column.type === "select" && column.options) {
    return (
      <select
        ref={inputRef as React.Ref<HTMLSelectElement>}
        value={editValue}
        onChange={(e) => { setEditValue(e.target.value); }}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        className={cn(
          "px-2 py-1 rounded-md border-2 border-primary/50 bg-background text-sm w-full outline-none ring-2 ring-primary/10",
          className
        )}
      >
        <option value="">Select...</option>
        {column.options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    );
  }

  return (
    <input
      ref={inputRef as React.Ref<HTMLInputElement>}
      type={column.type === "number" ? "number" : column.type === "date" ? "date" : "text"}
      value={editValue}
      onChange={(e) => setEditValue(e.target.value)}
      onBlur={commit}
      onKeyDown={handleKeyDown}
      placeholder={column.placeholder}
      className={cn(
        "px-2 py-1 rounded-md border-2 border-primary/50 bg-background text-sm w-full outline-none ring-2 ring-primary/10",
        className
      )}
    />
  );
}
