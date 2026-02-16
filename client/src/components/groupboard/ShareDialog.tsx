import { useState } from "react";
import { Copy, Check, X, Link2 } from "lucide-react";

interface ShareDialogProps {
  shareCode: string;
  onClose: () => void;
}

export function ShareDialog({ shareCode, onClose }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/b/${shareCode}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: "Join my GroupBoard", url: shareUrl });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-card border border-border rounded-2xl shadow-2xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold">Share board</h2>
          <button onClick={onClose} className="p-1 hover:bg-accent rounded-lg">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground block mb-2">Board code</label>
            <div className="text-3xl font-mono font-bold tracking-wider text-center py-3 bg-background rounded-xl border border-border">
              {shareCode}
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground block mb-2">Link</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 px-3 py-2.5 bg-background rounded-xl border border-border text-sm">
                <Link2 className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="truncate text-muted-foreground">{shareUrl}</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shrink-0"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          {typeof navigator.share === "function" && (
            <button
              onClick={handleNativeShare}
              className="w-full py-2.5 bg-accent text-accent-foreground rounded-xl text-sm font-medium hover:bg-accent/80 transition-colors"
            >
              Share via...
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
