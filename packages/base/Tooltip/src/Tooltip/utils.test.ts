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
    describe('when the placement is a bare side', () => {
      it('defaults the align to center', () => {
        expect(splitPlacement('top')).toEqual({ side: 'top', align: 'center' })
      })
    })

    describe('when the placement has a start/end suffix', () => {
      it('reads the suffix as the align', () => {
        expect(splitPlacement('bottom-start')).toEqual({
          side: 'bottom',
          align: 'start',
        })
        expect(splitPlacement('left-end')).toEqual({
          side: 'left',
          align: 'end',
        })
      })
    })
  })

  describe('spacingToPxNumber', () => {
    describe('when given a spacing token', () => {
      it('resolves it to a plain px number', () => {
        expect(spacingToPxNumber(SPACING_0)).toBe(0)
      })
    })
  })

  describe('getPositionerOffsets', () => {
    describe('when following the cursor', () => {
      it('offsets by the cursor gap minus the popup margin', () => {
        expect(
          getPositionerOffsets({ ...baseArgs, followCursor: true })
        ).toEqual({ sideOffset: 10 - 14, alignOffset: 0 })
      })

      describe('and the tooltip is compact', () => {
        it('uses the compact popup margin', () => {
          expect(
            getPositionerOffsets({
              ...baseArgs,
              followCursor: true,
              compact: true,
            })
          ).toEqual({ sideOffset: 10 - 4, alignOffset: 0 })
        })
      })
    })

    describe('when there is no arrow', () => {
      it('sits flush, applying only the user offset', () => {
        expect(
          getPositionerOffsets({ ...baseArgs, showArrow: false })
        ).toEqual({ sideOffset: 0, alignOffset: 0 })
      })
    })

    describe('when the anchor is a standard arrow anchor', () => {
      it('sits flush against the anchor', () => {
        const { sideOffset } = getPositionerOffsets(baseArgs)

        expect(typeof sideOffset).toBe('function')
        expect((sideOffset as () => number)()).toBe(0)
      })
    })

    describe('when the anchor is a menu item', () => {
      it('pulls the popup back by the gap difference', () => {
        const { sideOffset } = getPositionerOffsets({
          ...baseArgs,
          anchorRef: menuItemAnchorRef,
        })

        expect((sideOffset as () => number)()).toBe(11 - 14)
      })
    })
  })
})
