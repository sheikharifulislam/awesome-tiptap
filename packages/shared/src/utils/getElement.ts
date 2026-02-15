/**
 * Finds a descendant element matching the given CSS selector within the specified parent element.
 *
 * @param element - The parent HTML element to search within
 * @param selector - A valid CSS selector string to match against
 * @returns The first matching HTMLElement, or null if no match is found
 *
 * @example
 * ```ts
 * const container = document.getElementById('container');
 * const button = getElement(container, '.submit-btn');
 * ```
 */
export function getElement(element: HTMLElement, selector: string): HTMLElement | null {
  return element.querySelector(selector);
}
