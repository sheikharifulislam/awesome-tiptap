import { NodeSelection } from '@tiptap/pm/state';
import { Editor } from '@tiptap/react';

/**
 * Checks whether a specific node type is currently selected in the editor.
 *
 * Performs two levels of checking:
 * 1. **Direct selection** – If the selection is a `NodeSelection` (e.g. a clicked image or
 *    horizontal rule), checks whether the selected node's type matches any of the given names.
 * 2. **Ancestor lookup** – When `checkAncestorNodes` is enabled, walks up the document tree
 *    from the selection's anchor position, checking each ancestor node against the given names.
 *    This is useful for detecting whether the cursor is inside a specific wrapper node
 *    (e.g. a `blockquote`, `table`, or `listItem`).
 *
 * Returns `false` early if the editor is unavailable or the selection is empty (collapsed cursor).
 *
 * @param editor - The Tiptap editor instance, or `null`.
 * @param nodeTypeNames - An array of ProseMirror node type names to match against (e.g. `['image', 'table']`).
 * @param checkAncestorNodes - When `true`, also checks ancestor nodes above the selection anchor.
 *   Defaults to `false` (only checks direct `NodeSelection`).
 * @returns `true` if any of the specified node types are selected or, when enabled, found as an ancestor.
 *
 * @example
 * ```ts
 * // Check if an image is directly selected
 * isNodeTypeSelected(editor, ['image']);
 *
 * // Check if the cursor is inside a blockquote or table
 * isNodeTypeSelected(editor, ['blockquote', 'table'], true);
 * ```
 */
export function isNodeTypeSelected(
  editor: Editor | null,
  nodeTypeNames: string[] = [],
  checkAncestorNodes: boolean = false
): boolean {
  if (!editor || !editor.state.selection) return false;

  const { selection } = editor.state;
  if (selection.empty) return false;

  // Direct node selection check
  if (selection instanceof NodeSelection) {
    const selectedNode = selection.node;
    return selectedNode ? nodeTypeNames.includes(selectedNode.type.name) : false;
  }

  // Depth-based ancestor node check
  if (checkAncestorNodes) {
    const { $from } = selection;
    for (let depth = $from.depth; depth > 0; depth--) {
      const ancestorNode = $from.node(depth);
      if (nodeTypeNames.includes(ancestorNode.type.name)) {
        return true;
      }
    }
  }

  return false;
}
