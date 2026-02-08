import type { NodeViewProps } from '@tiptap/react';
import { useCallback } from 'react';
import { ResizableImage } from './ResizableImage';

export function ImageView(props: NodeViewProps) {
  const { node, extension, updateAttributes } = props;
  const { src, width, height, alt, showCaption } = node.attrs || {};
  const {
    width: initialWidth,
    height: initialHeight,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    resize,
  } = extension.options || {};

  const onResize = useCallback(
    (attrs: { width: string; height: string }) => {
      updateAttributes(attrs);
    },
    [updateAttributes]
  );

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
      resize={resize}
      showCaption={showCaption}
      onResize={onResize}
    />
  );
}
