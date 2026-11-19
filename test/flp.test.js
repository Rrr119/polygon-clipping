/* eslint-env jest */

import { cmp, setTolerance, resetTolerance, getTolerance } from "../src/flp"

afterEach(() => {
  resetTolerance()
})

describe("compare", () => {
  test("exactly equal", () => {
    const a = 1
    const b = 1
    expect(cmp(a, b)).toBe(0)
  })

  test("flp equal", () => {
    const a = 1
    const b = 1 + Number.EPSILON
    expect(cmp(a, b)).toBe(0)
  })

  test("barely less than", () => {
    const a = 1
    const b = 1 + Number.EPSILON * 2
    expect(cmp(a, b)).toBe(-1)
  })

  test("less than", () => {
    const a = 1
    const b = 2
    expect(cmp(a, b)).toBe(-1)
  })

  test("barely more than", () => {
    const a = 1 + Number.EPSILON * 2
    const b = 1
    expect(cmp(a, b)).toBe(1)
  })

  test("more than", () => {
    const a = 2
    const b = 1
    expect(cmp(a, b)).toBe(1)
  })

  test("both flp equal to zero", () => {
    const a = 0.0
    const b = Number.EPSILON - Number.EPSILON * Number.EPSILON
    expect(cmp(a, b)).toBe(0)
  })

  test("really close to zero", () => {
    const a = Number.EPSILON
    const b = Number.EPSILON + Number.EPSILON * Number.EPSILON * 2
    expect(cmp(a, b)).toBe(-1)
  })
})

describe("tolerance", () => {
  test("default tolerance is Number.EPSILON", () => {
    expect(getTolerance()).toBe(Number.EPSILON)
  })

  test("setTolerance changes comparison behavior", () => {
    setTolerance(0.1)
    expect(getTolerance()).toBe(0.1)
    expect(cmp(1, 1.05)).toBe(0)
    expect(cmp(1, 1.5)).toBe(-1)
    // absolute snap-to-zero threshold follows the tolerance
    expect(cmp(0, 0.05)).toBe(0)
  })

  test("setTolerance with smaller tolerance", () => {
    setTolerance(1e-20)
    expect(cmp(1e-17, 2e-17)).toBe(-1)
    expect(cmp(0, 1e-21)).toBe(0)
  })

  test("resetTolerance restores the default", () => {
    setTolerance(0.1)
    resetTolerance()
    expect(getTolerance()).toBe(Number.EPSILON)
    expect(cmp(1, 1.05)).toBe(-1)
  })

  test("invalid tolerances throw", () => {
    for (const t of [0, -1, NaN, Infinity, -Infinity, "1", null, undefined]) {
      expect(() => setTolerance(t)).toThrow(/Invalid tolerance/)
    }
    // a failed set does not modify the current tolerance
    expect(getTolerance()).toBe(Number.EPSILON)
  })
})
