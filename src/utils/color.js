import colorString from "color-string";

/**
 *
 * Transforms hex color to rgb
 *
 * @function hexToRgb
 *
 * @param {string} color Hex color Une couleur au format hex
 * @param {string} opacity Opacity value between 0 and 1
 * @returns {string} Rgba color
 *
 * ```js
 * const color = rgbToHex("#000000", "0.25")
 * color // -> rgba(0, 0, 0, 0.25)
 * ```
 *
 */
export function hexToRgb(color, opacity) {
  return (
    "rgba(" +
    [...colorString.get.rgb(color).slice(0, -1), opacity].join(", ") +
    ")"
  );
}
