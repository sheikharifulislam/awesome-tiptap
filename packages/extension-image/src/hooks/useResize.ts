import { parseUnit } from '@awesome-tiptap/shared/utils/parseUnit';
import { useCallback, useEffect, useRef } from 'react';

export type Direction = 'top' | 'bottom' | 'left' | 'right';

export interface UseResizeOptions {
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  preserveAspectRatio: boolean;
  onResize: (attrs: { width: string; height: string }) => void;
}

interface DragState {
  direction: Direction;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
  aspectRatio: number;
}

function clamp(value: number, min?: string, max?: string): number {
  let result = value;
  if (min) {
    const [minVal] = parseUnit(min);
    result = Math.max(result, minVal as number);
  }
  if (max) {
    const [maxVal] = parseUnit(max);
    result = Math.min(result, maxVal as number);
  }
  return result;
}

function computeNewSize(
  direction: Direction,
  startWidth: number,
  startHeight: number,
  deltaX: number,
  deltaY: number
): { width: number; height: number } {
  switch (direction) {
    case 'right':
      return { width: startWidth + deltaX, height: startHeight };
    case 'left':
      return { width: startWidth - deltaX, height: startHeight };
    case 'bottom':
      return { width: startWidth, height: startHeight + deltaY };
    case 'top':
      return { width: startWidth, height: startHeight - deltaY };
  }
}

export function useResize(options: UseResizeOptions) {
  const { minWidth, maxWidth, minHeight, maxHeight, preserveAspectRatio, onResize } =
    options;
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const drag = dragRef.current;
      const container = containerRef.current;
      if (!drag || !container) return;

      const deltaX = e.clientX - drag.startX;
      const deltaY = e.clientY - drag.startY;
      let { width, height } = computeNewSize(
        drag.direction,
        drag.startWidth,
        drag.startHeight,
        deltaX,
        deltaY
      );

      if (preserveAspectRatio) {
        const isHorizontal = drag.direction === 'left' || drag.direction === 'right';
        if (isHorizontal) {
          width = clamp(width, minWidth, maxWidth);
          height = width / drag.aspectRatio;
        } else {
          height = clamp(height, minHeight, maxHeight);
          width = height * drag.aspectRatio;
        }
      }

      container.style.width = `${clamp(width, minWidth, maxWidth)}px`;
      container.style.height = `${clamp(height, minHeight, maxHeight)}px`;
    },
    [minWidth, maxWidth, minHeight, maxHeight, preserveAspectRatio]
  );

  const handleMouseUp = useCallback(() => {
    if (!dragRef.current) return;

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    dragRef.current = null;

    const container = containerRef.current;
    if (container) {
      onResize?.({
        width: `${container.offsetWidth}px`,
        height: `${container.offsetHeight}px`,
      });
    }
  }, [handleMouseMove, onResize]);

  const handleMouseDown = useCallback(
    (direction: Direction) => (e: React.MouseEvent) => {
      e.preventDefault();

      const container = containerRef.current;
      if (!container) return;

      dragRef.current = {
        direction,
        startX: e.clientX,
        startY: e.clientY,
        startWidth: container.offsetWidth,
        startHeight: container.offsetHeight,
        aspectRatio: container.offsetWidth / container.offsetHeight,
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [handleMouseMove, handleMouseUp]
  );

  // Cleanup listeners on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return { containerRef, handleMouseDown };
}
