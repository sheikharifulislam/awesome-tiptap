import { type Editor } from '@tiptap/react';

/**
 * Checks whether the specified Tiptap extensions are registered in the editor.
 *
 * By default, **all** listed extensions must be present (`requireAll = true`).
 * Set `requireAll` to `false` to check if **at least one** is available.
 *
 * Logs a warning to the console listing any missing extensions when the check fails.
 *
 * @param editor - The Tiptap editor instance, or `null` if not yet initialized.
 * @param extensionNames - A single extension name or an array of names to check against the editor.
 * @param requireAll - When `true`, every extension in the list must be registered.
 * When `false`, at least one must be registered. Defaults to `true`.
 * @returns `true` if the check passes, `false` otherwise (including when `editor` is `null`).
 *
 * @example
 * // Check a single extension
 * isExtensionAvailable(editor, 'bold');
 *
 * @example
 * // Require all extensions to be present (default)
 * isExtensionAvailable(editor, ['bold', 'italic', 'underline']);
 *
 * @example
 * // Require at least one extension to be present
 * isExtensionAvailable(editor, ['image', 'figure'], false);
 */
export function isExtensionAvailable(
  editor: Editor | null,
  extensionNames: string | string[],
  requireAll: boolean = true
): boolean {
  if (!editor) return false;

  const names = Array.isArray(extensionNames) ? extensionNames : [extensionNames];

  let found;
  if (requireAll) {
    found = names.every((name) =>
      editor.extensionManager.extensions.some((ext) => ext.name === name)
    );
  } else {
    found = names.some((name) =>
      editor.extensionManager.extensions.some((ext) => ext.name === name)
    );
  }

  if (!found) {
    const missing = names.filter(
      (name) => !editor.extensionManager.extensions.some((ext) => ext.name === name)
    );
    const mode = requireAll ? 'all' : 'at least one';
    console.warn(
      `[awesome-tiptap] Expected ${mode} of the extensions [${names.map((n) => `"${n}"`).join(', ')}] to be registered, but
[${missing.map((n) => `"${n}"`).join(', ')}] ${missing.length === 1 ? 'is' : 'are'} missing. Make sure they are added to
your editor configuration.`
    );
  }

  return found;
}
