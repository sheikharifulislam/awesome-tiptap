import { Editor, NodeViewContent, NodeViewWrapper } from '@tiptap/react';

import { isValidPosition } from '@awesome-tiptap/shared/utils/isValidPosition';
import { useCallback, useEffect } from 'react';
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
  nodeSize?: number;
  showCaption?: boolean;
  hasContent?: boolean;
  resize:
    | boolean
    | {
        enabled: boolean;
        alwaysPreserveAspectRatio?: boolean;
      };
  editor: Editor;
  getPos: () => number | undefined;
  onUpdateAttributes?: (attrs: Record<string, any>) => void;
  wrapperAttributes?: Record<string, string>;
  imgAttributes?: Record<string, string>;
  align: 'left' | 'center' | 'right';
  objectFit: React.CSSProperties['objectFit'];
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
    showCaption,
    editor,
    getPos,
    onUpdateAttributes,
    nodeSize,
    hasContent,
    wrapperAttributes,
    imgAttributes,
    align,
    objectFit,
  } = props || {};

  const isResizable = resize === true || (typeof resize === 'object' && !!resize.enabled);
  const shouldShowCaption = showCaption || hasContent;

  const alwaysPreserveAspectRatio =
    resize === true ||
    (typeof resize === 'object' &&
      resize.enabled &&
      (resize.alwaysPreserveAspectRatio ?? true));

  const { containerRef, handleMouseDown } = useResize(
    {
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      preserveAspectRatio: alwaysPreserveAspectRatio,
      onUpdateAttributes,
    },
    editor,
    getPos
  );

  // Listen to editor selection changes to detect when focus leaves the caption
  useEffect(() => {
    if (!editor || !showCaption) return;

    const handleSelectionUpdate = () => {
      const pos = getPos();
      if (!isValidPosition(pos) || !nodeSize) return;

      const { from, to } = editor.state.selection;
      const nodeStart = pos;
      const nodeEnd = pos + nodeSize;

      // Check if selection is outside this image node
      const isOutsideNode = to < nodeStart || from > nodeEnd;

      if (isOutsideNode && !hasContent && onUpdateAttributes) {
        onUpdateAttributes({ showCaption: false });
      }
    };

    editor.on('selectionUpdate', handleSelectionUpdate);
    return () => {
      editor.off('selectionUpdate', handleSelectionUpdate);
    };
  }, [editor, showCaption, hasContent, getPos, nodeSize, onUpdateAttributes]);

  // Had to manually set the node selection on image click because
  // We treat the image-node-extension.ts as content: "inline*"
  const handleImageClick = useCallback(
    (event: React.MouseEvent) => {
      if (!editor || !getPos) return;

      event.preventDefault();
      event.stopPropagation();

      const pos = getPos();
      if (isValidPosition(pos)) {
        editor.chain().focus().setNodeSelection(pos).run();
      }
    },
    [editor, getPos]
  );

  return (
    <NodeViewWrapper>
      <ResizeContainer
        ref={containerRef}
        className="awesome-tiptap-resizable-image"
        style={{
          width,
          height,
          minWidth,
          maxWidth,
          minHeight,
          maxHeight,
        }}
        showCaption={showCaption}
        wrapperAttributes={wrapperAttributes}
        align={align}
      >
        <img
          style={{
            cursor: editor?.isEditable ? 'pointer' : 'default',
          }}
          src={src}
          alt={alt}
          onClick={handleImageClick}
          contentEditable={false}
          draggable={false}
          data-object-fit={objectFit}
          {...(imgAttributes && imgAttributes)}
        />
        {isResizable &&
          editor?.isEditable &&
          DIRECTIONS.map((dir) => (
            <div
              key={dir}
              className={`awesome-tiptap-resize-handle awesome-tiptap-resize-handle--${dir}`}
              onMouseDown={handleMouseDown(dir)}
            >
              <div className="awesome-tiptap-resize-handle-bar" />
            </div>
          ))}
        {editor?.isEditable && shouldShowCaption && (
          <NodeViewContent
            as="div"
            className="awesome-tiptap-image-caption"
            data-placeholder="Add a caption..."
          />
        )}
      </ResizeContainer>
    </NodeViewWrapper>
  );
}
