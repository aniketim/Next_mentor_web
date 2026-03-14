import { cn } from "@/lib/utils"
import { Loader2Icon } from "lucide-react"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props} />
  )
}

function Loader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]",
        className
      )}
      {...props}
    >
      <Spinner className="size-8" />
    </div>
  )
}

export { Spinner, Loader }
