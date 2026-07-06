import { SPACING_0 } from '@toptal/picasso-provider'

import { getPositionerOffsets, splitPlacement, spacingToPxNumber } from './utils'

const menuItemAnchorRef = {
  current: {
    getAttribute: (name: string) => (name === 'role' ? 'menuitem' : null),
  },
} as unknown as React.RefObject<HTMLElement | null>

const plainAnchorRef = {
  current: null,
} as React.RefObject<HTMLElement | null>

const baseArgs = {
  side: 'top' as const,
  showArrow: true,
  followCursor: false,
  compact: false,
  offset: {},
  anchorRef: plainAnchorRef,
}

describe('Tooltip utils', () => {
  describe('splitPlacement', () => {
    it('defaults a bare side to center align', () => {
      expect(splitPlacement('top')).toEqual({ side: 'top', align: 'center' })
    })

    it('reads the start/end suffix as the align', () => {
      expect(splitPlacement('bottom-start')).toEqual({
        side: 'bottom',
        align: 'start',
      })
      expect(splitPlacement('left-end')).toEqual({ side: 'left', align: 'end' })
    })
  })

  describe('spacingToPxNumber', () => {
    it('resolves a spacing token to a plain px number', () => {
      expect(spacingToPxNumber(SPACING_0)).toBe(0)
    })
  })

  describe('getPositionerOffsets', () => {
    it('offsets a followCursor popup by cursor gap minus popup margin', () => {
      expect(
        getPositionerOffsets({ ...baseArgs, followCursor: true })
      ).toEqual({ sideOffset: 10 - 14, alignOffset: 0 })
    })

    it('uses the compact popup margin for a compact followCursor popup', () => {
      expect(
        getPositionerOffsets({
          ...baseArgs,
          followCursor: true,
          compact: true,
        })
      ).toEqual({ sideOffset: 10 - 4, alignOffset: 0 })
    })

    it('sits flush (only the user offset) when there is no arrow', () => {
      expect(
        getPositionerOffsets({ ...baseArgs, showArrow: false })
      ).toEqual({ sideOffset: 0, alignOffset: 0 })
    })

    it('sits flush for a standard arrow anchor', () => {
      const { sideOffset } = getPositionerOffsets(baseArgs)

      expect(typeof sideOffset).toBe('function')
      expect((sideOffset as () => number)()).toBe(0)
    })

    it('pulls the popup back by the gap difference for a menu-item anchor', () => {
      const { sideOffset } = getPositionerOffsets({
        ...baseArgs,
        anchorRef: menuItemAnchorRef,
      })

      expect((sideOffset as () => number)()).toBe(8 - 14)
    })
  })
})
