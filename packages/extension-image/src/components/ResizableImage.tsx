import { NodeViewWrapper } from '@tiptap/react';

import { type Direction, useResize } from '../hooks/useResize';
import ResizeContainer from './ResizeContainer';

const DIRECTIONS: Direction[] = ['top', 'bottom', 'left', 'right'];

interface ResizableImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt?: string;
  width: string;
  height: string;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  showCaption?: boolean;
  resize:
    | boolean
    | {
        enabled: boolean;
        alwaysPreserveAspectRatio?: boolean;
      };
  onResize: (attrs: { width: string; height: string }) => void;
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
    resize,
    onResize,
    showCaption,
  } = props || {};

  const isResizable = resize === true || (typeof resize === 'object' && !!resize.enabled);

  const alwaysPreserveAspectRatio =
    resize === true ||
    (typeof resize === 'object' &&
      resize.enabled &&
      (resize.alwaysPreserveAspectRatio ?? true));

  const { containerRef, handleMouseDown } = useResize({
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    preserveAspectRatio: alwaysPreserveAspectRatio,
    onResize,
  });

  return (
    <NodeViewWrapper>
      <ResizeContainer
        ref={containerRef}
        className="awesome-tiptap-resizable-image"
        style={{ width, height }}
        showCaption={showCaption}
      >
        <img style={{ minWidth, maxWidth, minHeight, maxHeight }} src={src} alt={alt} />
        {isResizable &&
          DIRECTIONS.map((dir) => (
            <div
              key={dir}
              className={`awesome-tiptap-resize-handle awesome-tiptap-resize-handle--${dir}`}
              onMouseDown={handleMouseDown(dir)}
            >
              <div className="awesome-tiptap-resize-handle-bar" />
            </div>
          ))}
      </ResizeContainer>
    </NodeViewWrapper>
  );
}
