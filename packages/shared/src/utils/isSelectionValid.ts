import { Editor, isNodeSelection, isTextSelection } from '@tiptap/core';
import { Selection } from '@tiptap/pm/state';
import { CellSelection } from '@tiptap/pm/tables';

/**
 * Checks if the current selection is valid for a given editor
 */
export const isSelectionValid = (
  editor: Editor | null,
  selection?: Selection,
  excludedNodeTypes: string[] = ['imageUpload', 'horizontalRule']
): boolean => {
  if (!editor) return false;
  if (!selection) selection = editor.state.selection;

  const { state } = editor;
  const { doc } = state;
  const { empty, from, to } = selection;

  const isEmptyTextBlock =
    !doc.textBetween(from, to).length && isTextSelection(selection);
  const isCodeBlock =
    selection.$from.parent.type.spec.code ||
    (isNodeSelection(selection) && selection.node.type.spec.code);
  const isExcludedNode =
    isNodeSelection(selection) && excludedNodeTypes.includes(selection.node.type.name);
  const isTableCell = selection instanceof CellSelection;

  return !empty && !isEmptyTextBlock && !isCodeBlock && !isExcludedNode && !isTableCell;
};
