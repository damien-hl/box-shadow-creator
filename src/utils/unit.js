export const UNIT = {
  pixel: "px",
};

/**
 *
 * Tranforms raw value to value with unit
 *
 * @function rawToUnit
 *
 * @param {number} string Value
 * @param {string} unit Unit
 * @returns {string} Value with unit
 *
 * ```js
 * const x = rawToUnit(4, "px")
 * x // -> "4px"
 * ```
 *
 * ```js
 * const x = rawToUnit(0, "px")
 * x // -> "0"
 * ```
 *
 */
export function rawToUnit(value, unit = UNIT.pixel) {
  return value !== "0" ? value + unit : value;
}
