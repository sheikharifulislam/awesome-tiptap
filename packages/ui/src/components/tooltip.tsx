import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';
import { cn } from '../lib/utils';

function TooltipProvider({ delay = 0, ...props }: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider data-slot="tooltip-provider" delay={delay} {...props} />
  );
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  side = 'top',
  sideOffset = 4,
  align = 'center',
  alignOffset = 0,
  children,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset'
  >) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="awt:isolate awt:z-50"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            'awt:data-open:animate-in awt:data-open:fade-in-0 awt:data-open:zoom-in-95 awt:data-[state=delayed-open]:animate-in awt:data-[state=delayed-open]:fade-in-0 awt:data-[state=delayed-open]:zoom-in-95 awt:data-closed:animate-out awt:data-closed:fade-out-0 awt:data-closed:zoom-out-95 awt:data-[side=bottom]:slide-in-from-top-2 awt:data-[side=left]:slide-in-from-right-2 awt:data-[side=right]:slide-in-from-left-2 awt:data-[side=top]:slide-in-from-bottom-2 awt:rounded-md awt:px-3 awt:py-1.5 awt:text-xs awt:data-[side=inline-start]:slide-in-from-right-2 awt:data-[side=inline-end]:slide-in-from-left-2 awt:bg-foreground awt:text-background awt:z-50 awt:w-fit awt:max-w-xs awt:origin-(--transform-origin)',
            className
          )}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow className="awt:size-2.5 awt:translate-y-[calc(-50%-2px)] awt:rotate-45 awt:rounded-[2px] awt:data-[side=inline-end]:top-1/2! awt:data-[side=inline-end]:-left-1 awt:data-[side=inline-end]:-translate-y-1/2 awt:data-[side=inline-start]:top-1/2! awt:data-[side=inline-start]:-right-1 awt:data-[side=inline-start]:-translate-y-1/2 awt:bg-foreground awt:fill-foreground awt:z-50 awt:data-[side=bottom]:top-1 awt:data-[side=left]:top-1/2! awt:data-[side=left]:-right-1 awt:data-[side=left]:-translate-y-1/2 awt:data-[side=right]:top-1/2! awt:data-[side=right]:-left-1 awt:data-[side=right]:-translate-y-1/2 awt:data-[side=top]:-bottom-2.5" />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
