import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Info } from "lucide-react";
import { useToastState } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const iconMap = {
  success: Check,
  error: X,
  info: Info,
};

const styleMap = {
  success: "bg-green-600 text-white",
  error: "bg-red-600 text-white",
  info: "bg-blue-600 text-white",
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastState();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 items-center pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = iconMap[t.type];
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg text-sm font-medium pointer-events-auto cursor-pointer",
                styleMap[t.type]
              )}
              onClick={() => removeToast(t.id)}
            >
              <Icon className="w-4 h-4" />
              {t.message}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
