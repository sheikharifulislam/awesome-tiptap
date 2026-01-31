/**
 * Gets an attribute value from an element or its descendant.
 *
 * @param options - The options object
 * @param options.element - The root HTML element to query
 * @param options.selector - Optional CSS selector to find a descendant element
 * @param options.attribute - The attribute name to retrieve
 * @returns The attribute value, or null if the element/attribute doesn't exist
 */
export function getAttribute({
  element,
  selector,
  attribute,
}: {
  element: HTMLElement;
  selector?: string;
  attribute: string;
}) {
  if (!selector) {
    return element.getAttribute(attribute);
  }

  const selectedElement = element.querySelector(selector);
  return selectedElement ? selectedElement.getAttribute(attribute) : null;
}
