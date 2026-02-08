import { ReactNode, RefObject } from 'react';

function ResizeContainer({
  className,
  style,
  ref,
  showCaption,
  children,
}: {
  ref: RefObject<HTMLDivElement | null>;
  className: string;
  style: {
    width: string;
    height: string;
  };
  showCaption?: boolean;
  children: ReactNode;
}) {
  const Tag = showCaption ? 'figure' : 'div';

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

export default ResizeContainer;
