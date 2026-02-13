import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const buttonVariants = cva(
  'awt:focus-visible:border-ring awt:focus-visible:ring-ring/50 awt:aria-invalid:ring-destructive/20 awt:dark:aria-invalid:ring-destructive/40 awt:aria-invalid:border-destructive awt:dark:aria-invalid:border-destructive/50 awt:rounded-lg awt:border awt:border-transparent awt:bg-clip-padding awt:text-sm awt:font-medium awt:focus-visible:ring-3 awt:aria-invalid:ring-3 awt:[&_svg:not([class*=size-])]:size-4 awt:inline-flex awt:items-center awt:justify-center awt:whitespace-nowrap awt:transition-all awt:disabled:pointer-events-none awt:disabled:opacity-50 awt:[&_svg]:pointer-events-none awt:shrink-0 awt:[&_svg]:shrink-0 awt:outline-none awt:group/button awt:select-none',
  {
    variants: {
      variant: {
        default: 'awt:bg-primary awt:text-primary-foreground awt:[a]:hover:bg-primary/80',
        outline:
          'awt:border-border awt:bg-background awt:hover:bg-muted awt:hover:text-foreground awt:dark:bg-input/30 awt:dark:border-input awt:dark:hover:bg-input/50 awt:aria-expanded:bg-muted awt:aria-expanded:text-foreground',
        secondary:
          'awt:bg-secondary awt:text-secondary-foreground awt:hover:bg-secondary/80 awt:aria-expanded:bg-secondary awt:aria-expanded:text-secondary-foreground',
        ghost:
          'awt:hover:bg-muted awt:hover:text-foreground awt:dark:hover:bg-muted/50 awt:aria-expanded:bg-muted awt:aria-expanded:text-foreground',
        destructive:
          'awt:bg-destructive/10 awt:hover:bg-destructive/20 awt:focus-visible:ring-destructive/20 awt:dark:focus-visible:ring-destructive/40 awt:dark:bg-destructive/20 awt:text-destructive awt:focus-visible:border-destructive/40 awt:dark:hover:bg-destructive/30',
        link: 'awt:text-primary awt:underline-offset-4 awt:hover:underline',
      },
      size: {
        default:
          'awt:h-8 awt:gap-1.5 awt:px-2.5 awt:has-data-[icon=inline-end]:pr-2 awt:has-data-[icon=inline-start]:pl-2',
        xs: 'awt:h-6 awt:gap-1 awt:rounded-[min(var(--aw-t-radius-md),10px)] awt:px-2 awt:text-xs awt:in-data-[slot=button-group]:rounded-lg awt:has-data-[icon=inline-end]:pr-1.5 awt:has-data-[icon=inline-start]:pl-1.5 awt:[&_svg:not([class*=size-])]:size-3',
        sm: 'awt:h-7 awt:gap-1 awt:rounded-[min(var(--aw-t-radius-md),12px)] awt:px-2.5 awt:text-[0.8rem] awt:in-data-[slot=button-group]:rounded-lg awt:has-data-[icon=inline-end]:pr-1.5 awt:has-data-[icon=inline-start]:pl-1.5 awt:[&_svg:not([class*=size-])]:size-3.5',
        lg: 'awt:h-9 awt:gap-1.5 awt:px-2.5 awt:has-data-[icon=inline-end]:pr-3 awt:has-data-[icon=inline-start]:pl-3',
        icon: 'awt:size-8',
        'icon-xs':
          'awt:size-6 awt:rounded-[min(var(--aw-t-radius-md),10px)] awt:in-data-[slot=button-group]:rounded-lg awt:[&_svg:not([class*=size-])]:size-3',
        'icon-sm':
          'awt:size-7 awt:rounded-[min(var(--aw-t-radius-md),12px)] awt:in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'awt:size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
