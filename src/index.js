import operation from "./operation"

/* The last argument may optionally be an options object (eg { tolerance }).
 * Geometries are always arrays, so a trailing non-array object is
 * unambiguously an options object. */
const parseArgs = (args) => {
  const lastArg = args[args.length - 1]
  if (
    args.length > 0 &&
    typeof lastArg === "object" &&
    lastArg !== null &&
    !Array.isArray(lastArg)
  ) {
    return { geoms: args.slice(0, -1), options: lastArg }
  }
  return { geoms: args, options: {} }
}

const union = (geom, ...args) => {
  const { geoms, options } = parseArgs(args)
  return operation.run("union", geom, geoms, options)
}

const intersection = (geom, ...args) => {
  const { geoms, options } = parseArgs(args)
  return operation.run("intersection", geom, geoms, options)
}

const xor = (geom, ...args) => {
  const { geoms, options } = parseArgs(args)
  return operation.run("xor", geom, geoms, options)
}

const difference = (subjectGeom, ...args) => {
  const { geoms, options } = parseArgs(args)
  return operation.run("difference", subjectGeom, geoms, options)
}

export default {
  union: union,
  intersection: intersection,
  xor: xor,
  difference: difference,
}
