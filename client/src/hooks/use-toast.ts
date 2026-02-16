import { useState, useCallback } from "react";

export interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

let nextId = 1;

// Global state so any component can trigger toasts
let globalAddToast: ((message: string, type?: Toast["type"]) => void) | null = null;

export function toast(message: string, type: Toast["type"] = "success") {
  globalAddToast?.(message, type);
}

export function useToastState() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  // Register global handler
  globalAddToast = addToast;

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}
