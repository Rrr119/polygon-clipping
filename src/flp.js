/* Javascript doesn't do integer math. Everything is
 * floating point with percision Number.EPSILON.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON
 */

let epsilon = Number.EPSILON

// IE Polyfill
if (epsilon === undefined) epsilon = Math.pow(2, -52)

const DEFAULT_EPSILON = epsilon

let epsilonSq = epsilon * epsilon

/* The tolerance controls how close two coordinates can be before they
 * are snapped together (considered equal). It must be a positive,
 * finite number. */
export const setTolerance = (tolerance) => {
  if (typeof tolerance !== "number" || !isFinite(tolerance) || tolerance <= 0) {
    throw new Error(
      `Invalid tolerance: ${tolerance}. ` +
        "Tolerance must be a positive, finite number.",
    )
  }
  epsilon = tolerance
  epsilonSq = tolerance * tolerance
}

export const resetTolerance = () => {
  epsilon = DEFAULT_EPSILON
  epsilonSq = DEFAULT_EPSILON * DEFAULT_EPSILON
}

export const getTolerance = () => epsilon

/* FLP comparator */
export const cmp = (a, b) => {
  // check if they're both 0
  if (-epsilon < a && a < epsilon) {
    if (-epsilon < b && b < epsilon) {
      return 0
    }
  }

  // check if they're flp equal
  const ab = a - b
  if (ab * ab < epsilonSq * a * b) {
    return 0
  }

  // normal comparison
  return a < b ? -1 : 1
}
