import { NodeViewWrapper } from '@tiptap/react';

interface ResizableImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt?: string;
  width: string;
  height: string;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
}

export function ResizableImage(props: ResizableImageProps) {
  const {
    src,
    alt = '',
    height,
    width,
    minHeight,
    maxHeight,
    minWidth,
    maxWidth,
  } = props || {};

  return (
    <NodeViewWrapper>
      <div>
        <img
          style={{
            width,
            height,
            minWidth,
            maxWidth,
            minHeight,
            maxHeight,
          }}
          src={src}
          alt={alt}
        />
      </div>
    </NodeViewWrapper>
  );
}
