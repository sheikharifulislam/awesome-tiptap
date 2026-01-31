type CSSStyleProperties = Partial<Record<keyof CSSStyleDeclaration, string | number>>;

/**
 * Converts a JavaScript style object to an inline CSS style string.
 *
 * Takes an object with camelCase CSS property names and converts them to
 * a semicolon-separated string of kebab-case CSS declarations suitable
 * for use in an HTML `style` attribute.
 *
 * @param style - An object containing CSS properties in camelCase format.
 *                Only string and number values are included in the output;
 *                other value types are filtered out.
 * @returns A string of CSS properties in kebab-case format with a trailing
 *          semicolon, or an empty string if the style object is empty or null.
 *
 * @example
 * // Basic usage with multiple properties
 * generateInlineStyle({ minHeight: '300px', backgroundColor: 'red' })
 * // Returns: 'min-height: 300px; background-color: red;'
 *
 * @example
 * // Numeric values are preserved as-is
 * generateInlineStyle({ zIndex: 100, opacity: 0.5 })
 * // Returns: 'z-index: 100; opacity: 0.5;'
 *
 * @example
 * // Empty object returns empty string
 * generateInlineStyle({})
 * // Returns: ''
 */
export function generateInlineStyle(style: CSSStyleProperties): string {
  if (!style || Object.keys(style).length === 0) {
    return '';
  }

  const styleString = Object.entries(style)
    .map(([key, value]) => {
      if (typeof value === 'string' || typeof value === 'number') {
        const kebabKey = key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        return `${kebabKey}: ${value}`;
      }
    })
    .filter(Boolean)
    .join('; ');

  return `${styleString};`;
}
