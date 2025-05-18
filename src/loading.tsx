import { Loader2 } from "lucide-react";
import { cn } from "./lib/utils";

export default function Loading({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-screen items-center justify-center", className)}>
      <div className="animate-spin">
        <Loader2 className="h-12 w-12 text-primary" />
      </div>
    </div>
  );
}
