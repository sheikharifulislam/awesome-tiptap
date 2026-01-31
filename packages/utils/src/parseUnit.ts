/**
 * Parses a CSS unit value string into its numeric value and unit components.
 *
 * @param value - A string containing a number followed by a CSS unit (e.g., "10px", "2.5em", "100%")
 * @returns A tuple containing the numeric value and the unit string (e.g., [10, "px"])
 * @throws {Error} If the value does not match the expected format of number + unit
 *
 * @example
 * parseUnit("16px")   // returns [16, "px"]
 * parseUnit("1.5rem") // returns [1.5, "rem"]
 * parseUnit("-10%")   // returns [-10, "%"]
 */
export function parseUnit(value: string) {
  const match = value.match(/^([-+]?\d+\.?\d*)([a-z%]+)$/i);

  if (!match) {
    throw new Error(`Invalid unit value: ${value}`);
  }

  return [parseFloat(match[1] as string), match[2]];
}
