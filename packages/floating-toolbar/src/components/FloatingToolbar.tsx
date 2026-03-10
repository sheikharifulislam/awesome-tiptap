import { useFloatingToolbarVisibility } from '@awesome-tiptap/shared/hooks/useFloatingToolbarVisibility';
import { useIsBreakpoint } from '@awesome-tiptap/shared/hooks/useIsBreakpoint';
import { useTiptapEditor } from '@awesome-tiptap/shared/hooks/useTiptapEditor';
import { useUiEditorState } from '@awesome-tiptap/shared/hooks/useUiEditorState';
import { isSelectionValid } from '@awesome-tiptap/shared/utils/isSelectionValid';
import { FloatingElement } from './FloatingElement';

function FloatingToolbar({ children }: { children: React.ReactNode }) {
  const { editor } = useTiptapEditor();
  const isMobile = useIsBreakpoint('max', 480);
  const { lockDragHandle, aiGenerationActive, commentInputVisible } =
    useUiEditorState(editor);
  const { shouldShow } = useFloatingToolbarVisibility({
    editor,
    isSelectionValid,
    extraHideWhen: Boolean(aiGenerationActive || commentInputVisible),
  });

  if (lockDragHandle || isMobile) return null;

  return <FloatingElement shouldShow={shouldShow}>{children}</FloatingElement>;
}

export default FloatingToolbar;
