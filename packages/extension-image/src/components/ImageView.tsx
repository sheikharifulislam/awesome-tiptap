import type { NodeViewProps } from '@tiptap/react';
import { ResizableImage } from './ResizableImage';
export function ImageView(props: NodeViewProps) {
  const { node, extension } = props;
  const { src, width, height, alt } = node.attrs || {};
  const {
    width: initialWidth,
    height: initialHeight,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
  } = extension.options || {};
  return (
    <ResizableImage
      src={src}
      alt={alt}
      width={width ?? initialWidth}
      height={height ?? initialHeight}
      minWidth={minWidth}
      minHeight={minHeight}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
    />
  );
}
