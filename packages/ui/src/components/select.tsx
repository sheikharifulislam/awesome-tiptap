import { Select as SelectPrimitive } from '@base-ui/react/select';
import * as React from 'react';

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { cn } from '../lib/utils';

const Select = SelectPrimitive.Root;

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn('awt:scroll-my-1 awt:p-1', className)}
      {...props}
    />
  );
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn('awt:flex awt:flex-1 awt:text-left', className)}
      {...props}
    />
  );
}

function SelectTrigger({
  className,
  size = 'default',
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: 'sm' | 'default';
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        'awt:border-input awt:data-placeholder:text-muted-foreground awt:dark:bg-input/30 awt:dark:hover:bg-input/50 awt:focus-visible:border-ring awt:focus-visible:ring-ring/50 awt:aria-invalid:ring-destructive/20 awt:dark:aria-invalid:ring-destructive/40 awt:aria-invalid:border-destructive awt:dark:aria-invalid:border-destructive/50 awt:gap-1.5 awt:rounded-lg awt:border awt:bg-transparent awt:py-2 awt:pr-2 awt:pl-2.5 awt:text-sm awt:transition-colors awt:select-none awt:focus-visible:ring-3 awt:aria-invalid:ring-3 awt:data-[size=default]:h-8 awt:data-[size=sm]:h-7 awt:data-[size=sm]:rounded-[min(var(--radius-md),10px)] awt:*:data-[slot=select-value]:gap-1.5 awt:[&_svg:not([class*=size-])]:size-4 awt:flex awt:w-fit awt:items-center awt:justify-between awt:whitespace-nowrap awt:outline-none awt:disabled:cursor-not-allowed awt:disabled:opacity-50 awt:*:data-[slot=select-value]:line-clamp-1 awt:*:data-[slot=select-value]:flex awt:*:data-[slot=select-value]:items-center awt:[&_svg]:pointer-events-none awt:[&_svg]:shrink-0',
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="awt:text-muted-foreground awt:size-4 awt:pointer-events-none" />
        }
      />
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  side = 'bottom',
  sideOffset = 4,
  align = 'center',
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset' | 'alignItemWithTrigger'
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="awt:isolate awt:z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            'awt:bg-popover awt:text-popover-foreground awt:data-open:animate-in awt:data-closed:animate-out awt:data-closed:fade-out-0 awt:data-open:fade-in-0 awt:data-closed:zoom-out-95 awt:data-open:zoom-in-95 awt:data-[side=bottom]:slide-in-from-top-2 awt:data-[side=left]:slide-in-from-right-2 awt:data-[side=right]:slide-in-from-left-2 awt:data-[side=top]:slide-in-from-bottom-2 awt:ring-foreground/10 awt:min-w-36 awt:rounded-lg awt:shadow-md awt:ring-1 awt:duration-100 awt:data-[side=inline-start]:slide-in-from-right-2 awt:data-[side=inline-end]:slide-in-from-left-2 awt: awt:relative awt:isolate awt:z-50 awt:max-h-(--available-height) awt:w-(--anchor-width) awt:origin-(--transform-origin) awt:overflow-x-hidden awt:overflow-y-auto awt:data-[align-trigger=true]:animate-none',
            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(
        'awt:text-muted-foreground awt:px-1.5 awt:py-1 awt:text-xs',
        className
      )}
      {...props}
    />
  );
}

function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        'awt:focus:bg-accent awt:focus:text-accent-foreground awt:not-data-[variant=destructive]:focus:**:text-accent-foreground awt:gap-1.5 awt:rounded-md awt:py-1 awt:pr-8 awt:pl-1.5 awt:text-sm awt:[&_svg:not([class*=size-])]:size-4 awt:*:[span]:last:flex awt:*:[span]:last:items-center awt:*:[span]:last:gap-2 awt:relative awt:flex awt:w-full awt:cursor-default awt:items-center awt:outline-hidden awt:select-none awt:data-disabled:pointer-events-none awt:data-disabled:opacity-50 awt:[&_svg]:pointer-events-none awt:[&_svg]:shrink-0',
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="awt:flex awt:flex-1 awt:gap-2 awt:shrink-0 awt:whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className="awt:pointer-events-none awt:absolute awt:right-2 awt:flex awt:size-4 awt:items-center awt:justify-center" />
        }
      >
        <CheckIcon className="awt:pointer-events-none" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        'awt:bg-border awt:-mx-1 awt:my-1 awt:h-px awt:pointer-events-none',
        className
      )}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        'awt:bg-popover awt:z-10 awt:flex awt:cursor-default awt:items-center awt:justify-center awt:py-1 awt:[&_svg:not([class*=size-])]:size-4 awt:top-0 awt:w-full',
        className
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        'awt:bg-popover awt:z-10 awt:flex awt:cursor-default awt:items-center awt:justify-center awt:py-1 awt:[&_svg:not([class*=size-])]:size-4 awt:bottom-0 awt:w-full',
        className
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
