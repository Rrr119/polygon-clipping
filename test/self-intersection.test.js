/* eslint-env jest */

import pc from "../src/index"

/* Self-intersecting (self-crossing & self-touching) input rings.
 * These are interpreted using the non-zero rule. */

const bowtie = [
  [
    [0, 0],
    [4, 4],
    [4, 0],
    [0, 4],
    [0, 0],
  ],
]
const rect = [
  [
    [1, 1],
    [3, 1],
    [3, 3],
    [1, 3],
    [1, 1],
  ],
]

describe("self-crossing rings", () => {
  test("union of bowtie splits into two triangles", () => {
    expect(pc.union(bowtie)).toEqual([
      [
        [
          [0, 0],
          [2, 2],
          [0, 4],
          [0, 0],
        ],
      ],
      [
        [
          [2, 2],
          [4, 0],
          [4, 4],
          [2, 2],
        ],
      ],
    ])
  })

  test("intersection of bowtie with rect", () => {
    expect(pc.intersection(bowtie, rect)).toEqual([
      [
        [
          [1, 1],
          [2, 2],
          [1, 3],
          [1, 1],
        ],
      ],
      [
        [
          [2, 2],
          [3, 1],
          [3, 3],
          [2, 2],
        ],
      ],
    ])
  })

  test("difference of bowtie minus rect", () => {
    expect(pc.difference(bowtie, rect)).toEqual([
      [
        [
          [0, 0],
          [1, 1],
          [1, 3],
          [0, 4],
          [0, 0],
        ],
      ],
      [
        [
          [3, 1],
          [4, 0],
          [4, 4],
          [3, 3],
          [3, 1],
        ],
      ],
    ])
  })

  test("xor of bowtie with rect", () => {
    expect(pc.xor(bowtie, rect)).toEqual([
      [
        [
          [0, 0],
          [1, 1],
          [1, 3],
          [0, 4],
          [0, 0],
        ],
      ],
      [
        [
          [1, 1],
          [3, 1],
          [2, 2],
          [1, 1],
        ],
      ],
      [
        [
          [1, 3],
          [2, 2],
          [3, 3],
          [1, 3],
        ],
      ],
      [
        [
          [3, 1],
          [4, 0],
          [4, 4],
          [3, 3],
          [3, 1],
        ],
      ],
    ])
  })

  test("union of hourglass", () => {
    const hourglass = [
      [
        [0, 0],
        [4, 0],
        [0, 4],
        [4, 4],
        [0, 0],
      ],
    ]
    expect(pc.union(hourglass)).toEqual([
      [
        [
          [0, 0],
          [4, 0],
          [2, 2],
          [0, 0],
        ],
      ],
      [
        [
          [0, 4],
          [2, 2],
          [4, 4],
          [0, 4],
        ],
      ],
    ])
  })

  test("union of figure-eight sharing a vertex", () => {
    const eight = [
      [
        [0, 0],
        [2, 2],
        [0, 4],
        [-2, 2],
        [0, 0],
        [2, -2],
        [0, -4],
        [-2, -2],
        [0, 0],
      ],
    ]
    expect(pc.union(eight)).toEqual([
      [
        [
          [-2, -2],
          [0, -4],
          [2, -2],
          [0, 0],
          [-2, -2],
        ],
      ],
      [
        [
          [-2, 2],
          [0, 0],
          [2, 2],
          [0, 4],
          [-2, 2],
        ],
      ],
    ])
  })

  test("union of pentagram (star polygon)", () => {
    const r = 5
    const pt = (deg) => [
      10 + r * Math.cos((deg * Math.PI) / 180),
      10 + r * Math.sin((deg * Math.PI) / 180),
    ]
    const pentagram = [[pt(90), pt(234), pt(18), pt(162), pt(306), pt(90)]]
    expect(pc.union(pentagram)).toEqual([
      [
        [
          [5.244717418524233, 11.545084971874736],
          [8.183643679986595, 9.409830056250525],
          [7.061073738537633, 5.954915028125264],
          [10, 8.090169943749473],
          [12.938926261462365, 5.954915028125262],
          [11.816356320013401, 9.409830056250525],
          [14.755282581475768, 11.545084971874736],
          [11.122569941448964, 11.545084971874736],
          [10, 15],
          [8.877430058551035, 11.545084971874736],
          [5.244717418524233, 11.545084971874736],
        ],
      ],
    ])
  })

  test("intersection of two self-crossing polygons", () => {
    const bowtie2 = [
      [
        [1, 1],
        [5, 5],
        [5, 1],
        [1, 5],
        [1, 1],
      ],
    ]
    expect(pc.intersection(bowtie, bowtie2)).toEqual([
      [
        [
          [1, 1],
          [2, 2],
          [1, 3],
          [1, 1],
        ],
      ],
      [
        [
          [3, 3],
          [4, 2],
          [4, 4],
          [3, 3],
        ],
      ],
    ])
  })

  test("union of multipolygon with two self-crossing polygons", () => {
    const mp = [
      [
        [
          [0, 0],
          [4, 4],
          [4, 0],
          [0, 4],
          [0, 0],
        ],
      ],
      [
        [
          [5, 5],
          [9, 9],
          [9, 5],
          [5, 9],
          [5, 5],
        ],
      ],
    ]
    expect(pc.union(mp)).toEqual([
      [
        [
          [0, 0],
          [2, 2],
          [0, 4],
          [0, 0],
        ],
      ],
      [
        [
          [2, 2],
          [4, 0],
          [4, 4],
          [2, 2],
        ],
      ],
      [
        [
          [5, 5],
          [7, 7],
          [5, 9],
          [5, 5],
        ],
      ],
      [
        [
          [7, 7],
          [9, 5],
          [9, 9],
          [7, 7],
        ],
      ],
    ])
  })

  test("union of polygon with self-crossing hole ring", () => {
    const geom = [
      [
        [0, 0],
        [10, 0],
        [10, 10],
        [0, 10],
        [0, 0],
      ],
      [
        [2, 2],
        [8, 8],
        [8, 2],
        [2, 8],
        [2, 2],
      ],
    ]
    expect(pc.union(geom)).toEqual([
      [
        [
          [0, 0],
          [10, 0],
          [10, 10],
          [0, 10],
          [0, 0],
        ],
        [
          [2, 2],
          [2, 8],
          [5, 5],
          [2, 2],
        ],
        [
          [5, 5],
          [8, 8],
          [8, 2],
          [5, 5],
        ],
      ],
    ])
  })
})

describe("self-touching & degenerate rings", () => {
  test("union of ring touching itself at a point", () => {
    const touchPoint = [
      [
        [0, 0],
        [2, 0],
        [2, 2],
        [0, 2],
        [0, 0],
        [2, 2],
        [4, 2],
        [4, 4],
        [2, 4],
        [2, 2],
      ],
    ]
    expect(pc.union(touchPoint)).toEqual([
      [
        [
          [0, 0],
          [2, 0],
          [2, 2],
          [0, 2],
          [0, 0],
        ],
      ],
      [
        [
          [2, 2],
          [4, 2],
          [4, 4],
          [2, 4],
          [2, 2],
        ],
      ],
    ])
  })

  test("union of ring with colinear self-overlap (backtracking)", () => {
    const backtrack = [
      [
        [0, 0],
        [4, 0],
        [2, 0],
        [2, 2],
        [0, 2],
        [0, 0],
      ],
    ]
    expect(pc.union(backtrack)).toEqual([
      [
        [
          [0, 0],
          [2, 0],
          [2, 2],
          [0, 2],
          [0, 0],
        ],
      ],
    ])
  })

  test("union of double-wound ring (winding number 2)", () => {
    const doubleWound = [
      [
        [0, 0],
        [4, 0],
        [4, 4],
        [0, 4],
        [0, 0],
        [4, 0],
        [4, 4],
        [0, 4],
        [0, 0],
      ],
    ]
    expect(pc.union(doubleWound)).toEqual([
      [
        [
          [0, 0],
          [4, 0],
          [4, 4],
          [0, 4],
          [0, 0],
        ],
      ],
    ])
  })

  test("ring wound once each way cancels to empty (non-zero rule)", () => {
    const canceled = [
      [
        [0, 0],
        [4, 0],
        [4, 4],
        [0, 4],
        [0, 0],
        [0, 4],
        [4, 4],
        [4, 0],
        [0, 0],
      ],
    ]
    expect(pc.union(canceled)).toEqual([])
  })
})

describe("tolerance option", () => {
  const scale = 1e-17
  const tinyBowtie = [
    [
      [0, 0],
      [4 * scale, 4 * scale],
      [4 * scale, 0],
      [0, 4 * scale],
      [0, 0],
    ],
  ]

  test("self-crossing input below default tolerance collapses to empty", () => {
    expect(pc.union(tinyBowtie)).toEqual([])
  })

  test("custom tolerance rescues small-scale self-crossing input", () => {
    expect(pc.union(tinyBowtie, { tolerance: 1e-20 })).toEqual([
      [
        [
          [0, 0],
          [2e-17, 2e-17],
          [0, 4e-17],
          [0, 0],
        ],
      ],
      [
        [
          [2e-17, 2e-17],
          [4e-17, 0],
          [4e-17, 4e-17],
          [2e-17, 2e-17],
        ],
      ],
    ])
  })

  test("tolerance is reset to default after each run", () => {
    pc.union(tinyBowtie, { tolerance: 1e-20 })
    expect(pc.union(tinyBowtie)).toEqual([])
  })

  test("tolerance option does not affect normal-scale operations", () => {
    expect(pc.union(bowtie, { tolerance: Number.EPSILON })).toEqual(
      pc.union(bowtie),
    )
  })

  test("options object as only trailing argument is not treated as geometry", () => {
    expect(pc.union(bowtie, { tolerance: 1e-12 })).toEqual([
      [
        [
          [0, 0],
          [2, 2],
          [0, 4],
          [0, 0],
        ],
      ],
      [
        [
          [2, 2],
          [4, 0],
          [4, 4],
          [2, 2],
        ],
      ],
    ])
  })

  test("invalid tolerances throw", () => {
    for (const tolerance of [0, -1, NaN, Infinity, -Infinity, "1", null]) {
      expect(() => pc.union(bowtie, { tolerance })).toThrow(/Invalid tolerance/)
    }
    // default tolerance still in effect after failed runs
    expect(pc.union(bowtie)).toEqual([
      [
        [
          [0, 0],
          [2, 2],
          [0, 4],
          [0, 0],
        ],
      ],
      [
        [
          [2, 2],
          [4, 0],
          [4, 4],
          [2, 2],
        ],
      ],
    ])
  })
})
