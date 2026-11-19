declare module "polygon-clipping" {
  export type Pair = [number, number]
  export type Ring = Pair[]
  export type Polygon = Ring[]
  export type MultiPolygon = Polygon[]
  type Geom = Polygon | MultiPolygon
  export interface Options {
    /* Snap tolerance for coordinate comparison. Coordinates closer than
     * this (relatively) are considered equal. Defaults to Number.EPSILON.
     * Useful for self-intersecting or very small/large scale inputs. */
    tolerance?: number
  }
  export function intersection(
    geom: Geom,
    ...args: (Geom | Options)[]
  ): MultiPolygon
  export function xor(geom: Geom, ...args: (Geom | Options)[]): MultiPolygon
  export function union(geom: Geom, ...args: (Geom | Options)[]): MultiPolygon
  export function difference(
    subjectGeom: Geom,
    ...args: (Geom | Options)[]
  ): MultiPolygon
}
