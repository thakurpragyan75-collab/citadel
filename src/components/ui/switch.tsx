import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/cn";
export function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root className={cn("inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-border-strong bg-raised data-[state=checked]:bg-primary", className)} {...props}>
      <SwitchPrimitive.Thumb className="block size-5 translate-x-0.5 rounded-full bg-fg transition-transform data-[state=checked]:translate-x-5 data-[state=checked]:bg-primary-fg" />
    </SwitchPrimitive.Root>
  );
}
