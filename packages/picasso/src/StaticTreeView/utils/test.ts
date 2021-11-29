import { findExtremeNodes } from './findExtremeNodes'

describe('findExtremeNodes', () => {
  it('finds top-most and left-most nodes', () => {
    const extremes = findExtremeNodes([
      { id: 0, x: 0, y: 0 },
      { id: 1, x: -100, y: -100 },
      { id: 2, x: -50, y: -300 },
      { id: 3, x: -500, y: 20 },
      { id: 4, x: 400, y: 100 },
      { id: 5, x: 600, y: 800 }
    ])

    expect(extremes).toBeDefined()
    expect(extremes?.topMostNode).toEqual({ id: 2, x: -50, y: -300 })
    expect(extremes?.leftMostNode).toEqual({ id: 3, x: -500, y: 20 })
  })

  describe('when empty array provided', () => {
    it('finds nothing', () => {
      expect(findExtremeNodes([])).toBeUndefined()
    })
  })

  describe('when top-most and left-most node is the same', () => {
    it('finds that node', () => {
      const extremes = findExtremeNodes([
        { id: 0, x: 0, y: 0 },
        { id: 1, x: -100, y: -100 },
        { id: 2, x: -50, y: -300 },
        { id: 3, x: -500, y: -500 },
        { id: 4, x: 400, y: 100 },
        { id: 5, x: 600, y: 800 }
      ])

      expect(extremes).toBeDefined()
      expect(extremes?.topMostNode).toEqual({ id: 3, x: -500, y: -500 })
      expect(extremes?.topMostNode).toBe(extremes?.leftMostNode)
    })
  })
})
