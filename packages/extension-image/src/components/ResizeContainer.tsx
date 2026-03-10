import type { ReactNode, RefObject } from 'react';

function ResizeContainer({
  className,
  style,
  ref,
  showCaption,
  wrapperAttributes,
  children,
  align,
}: {
  ref: RefObject<HTMLDivElement | null>;
  className: string;
  style: {
    width: string;
    minWidth?: string;
    maxWidth?: string;
    height: string;
    minHeight?: string;
    maxHeight?: string;
  };
  showCaption?: boolean;
  children: ReactNode;
  wrapperAttributes?: Record<string, string>;
  align: string;
}) {
  const Tag = showCaption ? 'figure' : 'div';

  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      {...(wrapperAttributes && wrapperAttributes)}
      data-provider="awesome-tiptap-img"
      data-align={align}
    >
      {children}
    </Tag>
  );
}

export default ResizeContainer;
