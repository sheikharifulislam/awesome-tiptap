import { Separator as SeparatorPrimitive } from '@base-ui/react/separator';
import { cn } from '../lib/utils';

function Separator({
  className,
  orientation = 'horizontal',
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        'awt:bg-border awt:shrink-0 awt:data-horizontal:h-px awt:data-horizontal:w-full awt:data-vertical:w-px awt:data-vertical:self-stretch',
        className
      )}
      {...props}
    />
  );
}

export { Separator };
