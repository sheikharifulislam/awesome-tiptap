import type { Editor } from '@tiptap/react';
import { useCurrentEditor, useEditorState } from '@tiptap/react';
import { useMemo } from 'react';

/**
 * Resolves and subscribes to a Tiptap editor instance.
 *
 * Uses the provided editor if given, otherwise falls back to the nearest
 * `EditorProvider` context via `useCurrentEditor`. Subscribes to editor state
 * changes through `useEditorState`, so components using this hook will
 * re-render when the editor state updates.
 *
 * @param providedEditor - An optional editor instance to use instead of the context editor.
 * @returns An object containing:
 *  - `editor` – The resolved editor instance, or `null` if unavailable.
 *  - `editorState` – The current ProseMirror `EditorState`, or `undefined` if no editor.
 *  - `canCommand` – The editor's `can` chain for checking command availability, or `undefined` if no editor.
 *
 * @example
 * ```tsx
 * // Using context editor from EditorProvider
 * const { editor, editorState, canCommand } = useTiptapEditor();
 *
 * // Using a directly provided editor
 * const { editor, canCommand } = useTiptapEditor(myEditor);
 *
 * if (canCommand?.().toggleBold()) {
 *   // bold is available
 * }
 * ```
 */
export function useTiptapEditor(providedEditor?: Editor | null): {
  editor: Editor | null;
  editorState?: Editor['state'];
  canCommand?: Editor['can'];
} {
  const { editor: coreEditor } = useCurrentEditor();
  const mainEditor = useMemo(
    () => providedEditor || coreEditor,
    [providedEditor, coreEditor]
  );

  const editorState = useEditorState({
    editor: mainEditor,
    selector(context) {
      if (!context.editor) {
        return {
          editor: null,
          editorState: undefined,
          canCommand: undefined,
        };
      }

      return {
        editor: context.editor,
        editorState: context.editor.state,
        canCommand: context.editor.can,
      };
    },
  });

  return editorState || { editor: null };
}
