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
