import type { NodeViewProps } from '@tiptap/react';
import { ResizableImage } from './ResizableImage';

export function ImageView(props: NodeViewProps) {
  const { editor, node, extension, updateAttributes, getPos } = props;
  const { src, width, height, alt, showCaption, align, objectFit } = node.attrs || {};
  const {
    width: initialWidth,
    height: initialHeight,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    resize,
    wrapperAttributes = {},
    imgAttributes = {},
  } = extension.options || {};

  const hasContent = node.content.size > 0;

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
      onUpdateAttributes={updateAttributes}
      editor={editor}
      getPos={getPos}
      nodeSize={node.nodeSize}
      hasContent={hasContent}
      wrapperAttributes={wrapperAttributes}
      imgAttributes={imgAttributes}
      align={align}
      objectFit={objectFit}
    />
  );
}
