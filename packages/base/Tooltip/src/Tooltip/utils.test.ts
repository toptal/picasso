import { SPACING_0 } from '@toptal/picasso-provider'

import {
  getPositionerOffsets,
  getSettledAnchorRect,
  splitPlacement,
  spacingToPxNumber,
} from './utils'

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

  describe('getSettledAnchorRect', () => {
    describe('when the anchor is not committed yet', () => {
      it('returns an empty rect', () => {
        const rect = getSettledAnchorRect(null)

        expect(rect.width).toBe(0)
        expect(rect.height).toBe(0)
      })
    })

    describe('when no ancestor is scale-animating', () => {
      it('returns the live getBoundingClientRect unchanged', () => {
        const anchor = document.createElement('div')

        document.body.appendChild(anchor)

        const liveRect = {
          x: 10,
          y: 20,
          width: 30,
          height: 40,
          top: 20,
          left: 10,
          right: 40,
          bottom: 60,
        } as DOMRect

        jest.spyOn(anchor, 'getBoundingClientRect').mockReturnValue(liveRect)

        expect(getSettledAnchorRect(anchor)).toBe(liveRect)

        anchor.remove()
      })
    })

    // jsdom does no layout, so build the geometry by hand: root is the
    // transform-clean origin (its getBoundingClientRect is trustworthy), a
    // scaled `tainted` ancestor sits between it and the anchor, and the anchor's
    // layout metrics (offsetLeft/Top/Width/Height, which transforms never touch)
    // describe where it will land once the scale settles. The anchor's OWN
    // getBoundingClientRect is deliberately garbage to prove it is ignored.
    describe('when a scaled ancestor taints the anchor rect', () => {
      const buildScaledFixture = (taintStyle: {
        scale?: string
        transform?: string
      }) => {
        const root = document.createElement('div')
        const tainted = document.createElement('div')
        const anchor = document.createElement('div')

        root.appendChild(tainted)
        tainted.appendChild(anchor)
        document.body.appendChild(root)

        const define = (el: HTMLElement, props: Record<string, unknown>) => {
          Object.entries(props).forEach(([key, value]) => {
            Object.defineProperty(el, key, { get: () => value, configurable: true })
          })
        }

        // anchor sits 20/200 inside `tainted`; `tainted` sits 5/10 inside root.
        define(anchor, {
          offsetParent: tainted,
          offsetLeft: 20,
          offsetTop: 200,
          offsetWidth: 120,
          offsetHeight: 30,
        })
        define(tainted, { offsetParent: root, offsetLeft: 5, offsetTop: 10 })

        jest.spyOn(root, 'getBoundingClientRect').mockReturnValue({
          x: 100,
          y: 50,
          left: 100,
          top: 50,
          right: 400,
          bottom: 300,
          width: 300,
          height: 250,
        } as DOMRect)

        // Tainted, mid-animation live rect — must NOT influence the result.
        jest.spyOn(anchor, 'getBoundingClientRect').mockReturnValue({
          left: 999,
          top: 999,
        } as DOMRect)

        jest
          .spyOn(window, 'getComputedStyle')
          .mockImplementation(
            (el: Element) =>
              (el === tainted
                ? { scale: taintStyle.scale ?? 'none', transform: taintStyle.transform ?? 'none' }
                : { scale: 'none', transform: 'none' }) as CSSStyleDeclaration
          )

        return { root, tainted, anchor }
      }

      afterEach(() => {
        jest.restoreAllMocks()
        document.body.innerHTML = ''
        delete (document as unknown as { getAnimations?: unknown }).getAnimations
      })

      // Simulate a browser (jsdom has no Web Animations API): `getAnimations`
      // returns a non-empty list while animating, an empty one when static.
      const setAnimating = (
        target: { getAnimations?: () => unknown[] },
        animating: boolean
      ) => {
        target.getAnimations = () => (animating ? [{}] : [])
      }

      it('reconstructs the settled rect from transform-independent layout metrics', () => {
        const { anchor } = buildScaledFixture({ scale: '0.75' })

        // root origin (100,50) + layout offset (25,210) + size (120x30).
        expect(getSettledAnchorRect(anchor)).toMatchObject({
          left: 125,
          top: 260,
          width: 120,
          height: 30,
          right: 245,
          bottom: 290,
        })
      })

      it('detects a scale carried by a transform matrix, not just the scale property', () => {
        const { anchor } = buildScaledFixture({
          transform: 'matrix(0.5, 0, 0, 0.5, 0, 0)',
        })

        expect(getSettledAnchorRect(anchor)).toMatchObject({ left: 125, top: 260 })
      })

      it('treats a pure-translate transform as untainted and keeps the live rect', () => {
        const { anchor } = buildScaledFixture({
          transform: 'matrix(1, 0, 0, 1, 40, 40)',
        })

        // No scale component → not a taint → the live (translate-faithful) rect.
        expect(getSettledAnchorRect(anchor)).toMatchObject({ left: 999, top: 999 })
      })

      it('keeps the live rect when the scaled ancestor is NOT animating (a static, persistent transform, not a mid-reveal taint)', () => {
        const { tainted, anchor } = buildScaledFixture({ scale: '0.75' })

        setAnimating(document, true) // something is animating, so the walk runs
        setAnimating(tainted, false) // …but the scaled ancestor itself is static

        expect(getSettledAnchorRect(anchor)).toMatchObject({ left: 999, top: 999 })
      })

      it('skips the ancestor walk and keeps the live rect when nothing in the document is animating', () => {
        const { anchor } = buildScaledFixture({ scale: '0.75' })
        const computedStyleSpy = jest.spyOn(window, 'getComputedStyle')

        computedStyleSpy.mockClear()
        setAnimating(document, false)

        expect(getSettledAnchorRect(anchor)).toMatchObject({ left: 999, top: 999 })
        // The document-level gate returned before findScaleTaintedAncestor walked
        // (which would have read getComputedStyle on each ancestor).
        expect(computedStyleSpy).not.toHaveBeenCalled()
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
        expect(getPositionerOffsets({ ...baseArgs, showArrow: false })).toEqual(
          { sideOffset: 0, alignOffset: 0 }
        )
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

        expect((sideOffset as () => number)()).toBe(7 - 14)
      })
    })
  })
})
