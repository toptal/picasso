import type { MouseEventHandler } from 'react'
import React, { forwardRef } from 'react'
import { fireEvent, waitFor } from '@testing-library/react'
import type { OmitInternalProps } from '@toptal/picasso-shared'
import { render } from '@toptal/picasso-test-utils'

import type { Props } from './Tooltip'
import { Tooltip } from './Tooltip'

const TestContent = () => {
  return <div data-testid='tooltip-content'>Content</div>
}

const TestTrigger = forwardRef<
  HTMLButtonElement,
  {
    onClick?: MouseEventHandler<HTMLButtonElement>
    onMouseOver?: MouseEventHandler<HTMLButtonElement>
    onMouseMove?: MouseEventHandler<HTMLButtonElement>
    onMouseLeave?: MouseEventHandler<HTMLButtonElement>
  }
>((props, ref) => {
  return (
    <button ref={ref} type='button' data-testid='tooltip-trigger' {...props}>
      Trigger
    </button>
  )
})

// A real click/tap is always preceded by `pointerdown` (the trigger relies on
// it), but jsdom's `fireEvent.click` dispatches only the bare `click`, so emit
// the full sequence ourselves.
const clickElement = (element: Element) => {
  fireEvent.pointerDown(element)
  fireEvent.click(element)
}

// A real tap on a NON-disabled element dispatches touch events first and a
// synthetic click after `touchend` — both reach the trigger, so this sequence
// exercises the touch-open path AND its dedupe against the trailing click.
const tapElement = (element: Element) => {
  fireEvent.pointerDown(element)
  fireEvent.touchStart(element)
  fireEvent.pointerUp(element)
  fireEvent.touchEnd(element)
  fireEvent.click(element)
}

// A genuine KEYBOARD focus is preceded by a keydown (Tab). Firing it flips the
// shared input-modality flag back to keyboard so base-ui's focus-open is
// honored — the hook suppresses only POINTER-initiated focus (a mousedown that
// focuses the trigger fires `pointerDown` before `focus` instead). Modality is
// tracked in module state that persists across tests, so every focus-open test
// pins it explicitly rather than relying on order. [PF-2253]
const focusViaKeyboard = (element: Element) => {
  fireEvent.keyDown(element, { key: 'Tab' })
  fireEvent.focus(element)
}

const renderTooltip = (props?: Partial<OmitInternalProps<Props>>) => {
  // onClick/onMouseOver/onMouseMove/onMouseLeave belong on the wrapped trigger,
  // not on Tooltip — keep them off the {...tooltipProps} spread so they aren't
  // also forwarded to the trigger via Tooltip's `...rest` (which would
  // double-bind them with the trigger's own handlers).
  const { onClick, onMouseOver, onMouseMove, onMouseLeave, ...tooltipProps } =
    props ?? {}

  return render(
    <Tooltip id='tooltip-id' content={<TestContent />} {...tooltipProps}>
      <TestTrigger
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      />
    </Tooltip>
  )
}

// The hook probes `matchMedia('(hover: hover) and (pointer: fine)')` to tell
// pointer devices from touch ones (isPointerDevice). The jest polyfill always
// reports `matches: false` (= touch), so pin the mode explicitly per suite.
const mockPointerDevice = (isPointer: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn(() => ({ matches: isPointer })),
  })
}

// eslint-disable-next-line max-lines-per-function
describe('Tooltip', () => {
  beforeEach(() => {
    mockPointerDevice(true)
  })

  describe('when closed', () => {
    it('does not render the content', () => {
      const { container, queryByTestId } = renderTooltip()

      expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
      expect(container).toMatchSnapshot()
    })
  })

  describe('when the open prop is set', () => {
    it('renders the content', async () => {
      const { getByTestId } = renderTooltip({ open: true })

      await waitFor(() => {
        expect(getByTestId('tooltip-content')).toBeInTheDocument()
      })
    })
  })

  describe('when portals are disabled', () => {
    it('renders the content within the parent', () => {
      const { container, queryByTestId } = renderTooltip({
        open: true,
        disablePortal: true,
      })

      expect(queryByTestId('tooltip-content')).toBeInTheDocument()
      expect(container).toMatchSnapshot()
    })

    it('renders the arrow for a non-compact tooltip', async () => {
      const { container } = renderTooltip({ open: true, disablePortal: true })

      await waitFor(() => {
        expect(container.querySelector('[data-side]')).toBeInTheDocument()
      })
    })
  })

  describe('when an id is provided', () => {
    it('routes it to the popup, not the trigger', async () => {
      // The `id` addresses the popup (role="tooltip"), while the trigger keeps
      // its own generated id.
      const { getByTestId, getByRole } = renderTooltip({
        id: 'tooltip-id',
        open: true,
        disablePortal: true,
      })

      await waitFor(() => {
        expect(getByRole('tooltip')).toHaveAttribute('id', 'tooltip-id')
      })
      expect(getByTestId('tooltip-trigger')).not.toHaveAttribute(
        'id',
        'tooltip-id'
      )
    })

    it('describes the trigger with the popup id while open', async () => {
      // Picasso points the trigger at the popup id itself via aria-describedby.
      const { getByTestId } = renderTooltip({
        id: 'tooltip-id',
        open: true,
        disablePortal: true,
      })

      await waitFor(() => {
        expect(getByTestId('tooltip-trigger')).toHaveAttribute(
          'aria-describedby',
          'tooltip-id'
        )
      })
    })

    it('does not describe the trigger while closed', () => {
      const { getByTestId } = renderTooltip({ id: 'tooltip-id' })

      expect(getByTestId('tooltip-trigger')).not.toHaveAttribute(
        'aria-describedby'
      )
    })
  })

  describe('when a controlled tooltip closes', () => {
    it('calls onTransitionExiting as the close begins, not at the end', () => {
      const onTransitionExiting = jest.fn()

      const { rerender } = render(
        <Tooltip
          id='tooltip-id'
          content={<TestContent />}
          open
          onTransitionExiting={onTransitionExiting}
        >
          <TestTrigger />
        </Tooltip>
      )

      expect(onTransitionExiting).not.toHaveBeenCalled()

      rerender(
        <Tooltip
          id='tooltip-id'
          content={<TestContent />}
          open={false}
          onTransitionExiting={onTransitionExiting}
        >
          <TestTrigger />
        </Tooltip>
      )

      expect(onTransitionExiting).toHaveBeenCalledTimes(1)
    })
  })

  describe('when no id is provided', () => {
    it('still associates the trigger with the popup while open', async () => {
      // Without a consumer id, Picasso generates a fallback id so the
      // trigger↔popup association still holds — this guards the common
      // (no-id) case.
      const { getByTestId, getByRole } = renderTooltip({
        id: undefined,
        open: true,
        disablePortal: true,
      })

      await waitFor(() => {
        const describedby =
          getByTestId('tooltip-trigger').getAttribute('aria-describedby')

        expect(describedby).toBeTruthy()
        expect(getByRole('tooltip')).toHaveAttribute('id', describedby)
      })
    })
  })

  describe('when the trigger is focused', () => {
    it('opens the tooltip and closes it on blur', async () => {
      const { getByTestId, queryByTestId } = renderTooltip()

      focusViaKeyboard(getByTestId('tooltip-trigger'))
      await waitFor(() => {
        expect(queryByTestId('tooltip-content')).toBeInTheDocument()
      })

      fireEvent.blur(getByTestId('tooltip-trigger'))
      await waitFor(() => {
        expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
      })
    })

    it('calls onOpen on focus and onClose on blur', async () => {
      const onOpenMock = jest.fn()
      const onCloseMock = jest.fn()

      const { getByTestId } = renderTooltip({
        onOpen: onOpenMock,
        onClose: onCloseMock,
      })

      focusViaKeyboard(getByTestId('tooltip-trigger'))
      await waitFor(() => expect(onOpenMock).toHaveBeenCalled())

      fireEvent.blur(getByTestId('tooltip-trigger'))
      await waitFor(() => expect(onCloseMock).toHaveBeenCalled())
    })
  })

  describe('when listeners are disabled', () => {
    it('does not open but keeps the wrapped element listeners', async () => {
      const onClickMock = jest.fn()
      const onMouseOverMock = jest.fn()
      const onMouseMoveMock = jest.fn()

      const { getByTestId, findByTestId } = renderTooltip({
        disableListeners: true,
        onClick: onClickMock,
        onMouseOver: onMouseOverMock,
        onMouseMove: onMouseMoveMock,
      })

      fireEvent.focus(getByTestId('tooltip-trigger'))
      fireEvent.click(getByTestId('tooltip-trigger'))
      fireEvent.mouseOver(getByTestId('tooltip-trigger'))
      fireEvent.mouseMove(getByTestId('tooltip-trigger'))

      await expect(() => findByTestId('tooltip-content')).rejects.toThrow()

      // The wrapped element keeps its own listeners even when the tooltip's are disabled
      expect(onClickMock).toHaveBeenCalledTimes(1)
      expect(onMouseOverMock).toHaveBeenCalledTimes(1)
      expect(onMouseMoveMock).toHaveBeenCalledTimes(1)
    })
  })

  describe('when hovering a descendant of the trigger', () => {
    it('opens the tooltip', async () => {
      // A disabled control wrapped in a trigger element (the documented pattern
      // for tooltips on disabled elements): the hover originates on the inner
      // disabled control, so the open must come from `mouseover` bubbling up to
      // the trigger.
      const { getByTestId, queryByTestId } = render(
        <Tooltip id='tooltip-id' content={<TestContent />}>
          <span data-testid='tooltip-trigger'>
            <button type='button' disabled data-testid='inner-disabled'>
              Disabled
            </button>
          </span>
        </Tooltip>
      )

      fireEvent.mouseOver(getByTestId('inner-disabled'))

      await waitFor(() =>
        expect(queryByTestId('tooltip-content')).toBeInTheDocument()
      )
    })
  })

  describe('when following the cursor', () => {
    it('opens on hover', async () => {
      const { getByTestId, queryByTestId } = renderTooltip({
        followCursor: true,
      })

      focusViaKeyboard(getByTestId('tooltip-trigger'))

      await waitFor(() =>
        expect(queryByTestId('tooltip-content')).toBeInTheDocument()
      )
    })

    it('hides while the cursor roams far from the trigger', async () => {
      const { getByTestId, queryByTestId } = renderTooltip({
        followCursor: true,
      })

      const trigger = getByTestId('tooltip-trigger')

      fireEvent.mouseOver(trigger)

      await waitFor(() =>
        expect(queryByTestId('tooltip-content')).toBeInTheDocument()
      )

      // First move anchors the segment; a subsequent move past 50px dismisses
      // the popup.
      fireEvent.mouseMove(trigger, { clientX: 10, clientY: 10 })
      fireEvent.mouseMove(trigger, { clientX: 200, clientY: 200 })

      await waitFor(() =>
        expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
      )
    })
  })

  describe('when an open tooltip is clicked', () => {
    it('reopens on hover once the pointer has left', async () => {
      // Click-to-dismiss suppresses re-opening only while the pointer stays on
      // the trigger; leaving lifts the suppression.
      const { getByTestId, queryByTestId } = renderTooltip()

      const trigger = getByTestId('tooltip-trigger')

      fireEvent.mouseOver(trigger)
      await waitFor(() =>
        expect(queryByTestId('tooltip-content')).toBeInTheDocument()
      )

      clickElement(trigger)
      await waitFor(() =>
        expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
      )

      // Still hovering: suppressed.
      fireEvent.mouseOver(trigger)
      await expect(() =>
        waitFor(() => {
          expect(queryByTestId('tooltip-content')).toBeInTheDocument()
        })
      ).rejects.toThrow()

      // Leave (with the pointer genuinely outside the trigger's bounding box —
      // jsdom rects are 0-sized), then re-hover: the tooltip must open again.
      fireEvent.mouseLeave(trigger, { clientX: 100, clientY: 100 })
      fireEvent.mouseOver(trigger)
      await waitFor(() =>
        expect(queryByTestId('tooltip-content')).toBeInTheDocument()
      )
    })
  })

  describe('when clicking on a pointer device', () => {
    it('does not open the tooltip', async () => {
      // Desktop opening is owned by hover + delay; click only ever dismisses an
      // open tooltip (click-to-open is a touch-only affordance).
      const onOpenMock = jest.fn()

      const { getByTestId, queryByTestId } = renderTooltip({
        onOpen: onOpenMock,
      })

      clickElement(getByTestId('tooltip-trigger'))

      await expect(() =>
        waitFor(() => {
          expect(queryByTestId('tooltip-content')).toBeInTheDocument()
        })
      ).rejects.toThrow()
      expect(onOpenMock).not.toHaveBeenCalled()
    })
  })

  describe('when clicked during the hover-open delay on a pointer device', () => {
    it('opens the tooltip instead of latching it shut', async () => {
      // The mouseover arms Picasso's 200ms hover-open; focus opens the tooltip
      // synchronously; the trailing click lands while that open is in flight. It
      // must NOT dismiss-and-latch the tooltip — otherwise it stays suppressed
      // until the pointer leaves and re-enters, which never happens (the cursor
      // sits on the trigger), so every consumer that `.click()`s a tooltip
      // trigger would fail. A pointer-initiated focus-open is suppressed, so pin
      // keyboard modality here (focusViaKeyboard) to keep the focus-open honored
      // and exercise the latch path.
      const onOpenMock = jest.fn()

      const { getByTestId, queryByTestId } = renderTooltip({
        onOpen: onOpenMock,
      })

      const trigger = getByTestId('tooltip-trigger')

      fireEvent.mouseOver(trigger)
      focusViaKeyboard(trigger)
      clickElement(trigger)

      await waitFor(() =>
        expect(queryByTestId('tooltip-content')).toBeInTheDocument()
      )
      expect(onOpenMock).toHaveBeenCalled()
    })

    it('keeps PF-2245 behaviour on the real pointer gesture (opens via hover, no latch)', async () => {
      // The production/Cypress gesture end-to-end: `mouseover` arms the 200ms
      // hover-open, then a real pointer click fires `pointerdown` → `focus` →
      // `click`. PF-2253 vetoes the pointer-initiated focus-open, so — unlike the
      // pre-fix path — there is no transient focus-open for the click to
      // dismiss-and-latch. The click is a desktop no-op and the armed hover timer
      // still opens the tooltip. This is the PF-2245 guarantee (a click during the
      // hover delay must not leave the tooltip permanently suppressed) holding
      // under the pointer-focus veto — the exact interaction consumer Cypress
      // specs exercise.
      const onOpenMock = jest.fn()

      const { getByTestId, queryByTestId } = renderTooltip({
        onOpen: onOpenMock,
      })

      const trigger = getByTestId('tooltip-trigger')

      fireEvent.mouseOver(trigger)
      fireEvent.pointerDown(trigger)
      fireEvent.focus(trigger)
      fireEvent.click(trigger)

      await waitFor(() =>
        expect(queryByTestId('tooltip-content')).toBeInTheDocument()
      )
      expect(onOpenMock).toHaveBeenCalled()
    })

    it('still dismisses a click once the hover-open has fired', async () => {
      // The click-during-delay exemption must not disarm ordinary click-to-
      // dismiss: once the 200ms hover-open has actually fired (pending flag
      // retired), a click — focus and all — closes the tooltip and keeps it
      // suppressed until the pointer leaves, then a re-hover re-opens it.
      const { getByTestId, queryByTestId } = renderTooltip()

      const trigger = getByTestId('tooltip-trigger')

      fireEvent.mouseOver(trigger)
      await waitFor(() =>
        expect(queryByTestId('tooltip-content')).toBeInTheDocument()
      )

      focusViaKeyboard(trigger)
      clickElement(trigger)
      await waitFor(() =>
        expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
      )

      // Still hovering: suppressed. Leaving lifts it; a re-hover opens again.
      fireEvent.mouseLeave(trigger, { clientX: 100, clientY: 100 })
      fireEvent.mouseOver(trigger)
      await waitFor(() =>
        expect(queryByTestId('tooltip-content')).toBeInTheDocument()
      )
    })
  })

  describe('when a pointer click focuses the trigger', () => {
    // PF-2253. A mousedown that focuses the trigger fires `pointerDown` then
    // `focus`; base-ui would open on that pointer-initiated focus (reason
    // `trigger-focus`). It must NOT — otherwise the popup flashes open
    // mid-click and, if the positioner lands it over the trigger, swallows the
    // trailing click, leaving the wrapped control unclickable.
    it('does not open the tooltip on pointer-initiated focus', async () => {
      const onOpenMock = jest.fn()

      const { getByTestId, queryByTestId } = renderTooltip({
        onOpen: onOpenMock,
      })

      const trigger = getByTestId('tooltip-trigger')

      fireEvent.pointerDown(trigger)
      fireEvent.focus(trigger)

      await expect(() =>
        waitFor(() => {
          expect(queryByTestId('tooltip-content')).toBeInTheDocument()
        })
      ).rejects.toThrow()
      expect(onOpenMock).not.toHaveBeenCalled()
    })

    it('still fires the wrapped control onClick', async () => {
      // Wiring smoke-test only: it confirms Tooltip forwards the trigger's own
      // onClick through the pointer-focus path. It does NOT prove the tooltip
      // stops swallowing clicks — jsdom has no hit-testing, so a popup
      // overlaying the trigger wouldn't intercept the click here anyway. The
      // real click-swallowing proof is the client-portal Cypress `force:true`
      // revert per the DoD.
      const onClickMock = jest.fn()

      const { getByTestId } = renderTooltip({ onClick: onClickMock })

      const trigger = getByTestId('tooltip-trigger')

      fireEvent.pointerDown(trigger)
      fireEvent.focus(trigger)
      fireEvent.click(trigger)

      expect(onClickMock).toHaveBeenCalledTimes(1)
    })

    it('does not call onOpen in controlled mode either', () => {
      // The one controlled-mode behavior change (row 5): a pointer-initiated
      // focus must not call onOpen on a controlled tooltip. The complementary
      // guarantee — that a controlled tooltip STILL forwards base-ui's
      // `trigger-hover` to onOpen (rows 2–4 stay uncontrolled-only) — is
      // covered by should-honor-open.test.ts's controlled cases; base-ui's
      // REST-based hover-open is impractical to drive in jsdom, so the pure
      // arbiter is the coverage for that path (see ADR-20).
      const onOpenMock = jest.fn()

      const { getByTestId } = renderTooltip({
        open: false,
        onOpen: onOpenMock,
      })

      const trigger = getByTestId('tooltip-trigger')

      fireEvent.pointerDown(trigger)
      fireEvent.focus(trigger)
      fireEvent.click(trigger)

      // Synchronous assertion is valid: base-ui's focus-open fires inline
      // (no `delay` set), so onOpen would already have run by now if honored.
      expect(onOpenMock).not.toHaveBeenCalled()
    })

    it('still calls onOpen on keyboard focus in controlled mode', async () => {
      // The honored controlled path end-to-end: a keyboard focus must still
      // reach a controlled consumer's onOpen (row 6). Guards against the call
      // site passing `isControlled` wrongly — the veto side is covered above,
      // this covers the honor side.
      const onOpenMock = jest.fn()

      const { getByTestId } = renderTooltip({
        open: false,
        onOpen: onOpenMock,
      })

      focusViaKeyboard(getByTestId('tooltip-trigger'))

      await waitFor(() => expect(onOpenMock).toHaveBeenCalled())
    })

    it('still opens on keyboard focus after a prior pointer click', async () => {
      // The pointer modality must not poison a later genuine keyboard focus:
      // a Tab keydown flips the modality back so focus opens the tooltip again.
      const { getByTestId, queryByTestId } = renderTooltip()

      const trigger = getByTestId('tooltip-trigger')

      fireEvent.pointerDown(trigger)
      fireEvent.focus(trigger)
      fireEvent.blur(trigger)

      focusViaKeyboard(trigger)

      await waitFor(() =>
        expect(queryByTestId('tooltip-content')).toBeInTheDocument()
      )
    })
  })

  describe('on a touch device', () => {
    beforeEach(() => {
      mockPointerDevice(false)
    })

    describe('when tapping the trigger', () => {
      it('opens and closes the tooltip', async () => {
        const { getByTestId, queryByTestId, findByTestId } = renderTooltip()

        clickElement(getByTestId('tooltip-trigger'))
        await findByTestId('tooltip-content')

        clickElement(getByTestId('tooltip-trigger'))
        await waitFor(() => {
          expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
        })
      })

      it('opens without flicker and closes on the next tap', async () => {
        // A full tap fires touch events (whose `touchend` opens) and a
        // trailing synthetic `click` — the click must be deduped, not read as
        // click-to-dismiss, or the tooltip open/close flickers shut.
        const onCloseMock = jest.fn()

        const { getByTestId, queryByTestId, findByTestId } = renderTooltip({
          onClose: onCloseMock,
        })

        tapElement(getByTestId('tooltip-trigger'))
        await findByTestId('tooltip-content')
        expect(onCloseMock).not.toHaveBeenCalled()

        // The next tap's click is NOT deduped — it dismisses, as before.
        tapElement(getByTestId('tooltip-trigger'))
        await waitFor(() => {
          expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
        })
      })

      it('re-opens on a fresh tap after a tap-dismiss', async () => {
        // Pure-touch sequence: NO mouse events ever fire on a real touch
        // device, so the click-dismiss latch set by the dismissing tap must
        // be lifted by the next tap gesture itself (the touch analog of the
        // mouseleave that lifts it on pointer devices) — otherwise the
        // tooltip is stuck closed forever after a single tap-dismiss.
        const { getByTestId, queryByTestId, findByTestId } = renderTooltip()

        const trigger = getByTestId('tooltip-trigger')

        tapElement(trigger)
        await findByTestId('tooltip-content')

        tapElement(trigger)
        await waitFor(() => {
          expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
        })

        tapElement(trigger)
        await findByTestId('tooltip-content')
      })
    })

    describe('when a touch scroll starts on the trigger', () => {
      it('does not open the tooltip, while a stationary tap still does', async () => {
        // A scroll/swipe gesture that merely begins on the trigger: touch
        // movement past the tap slop, and NO trailing synthetic click
        // (browsers suppress it after a scroll). Opening here would leave a
        // stuck tooltip — nothing on a touch device closes it.
        const onOpenMock = jest.fn()

        const { getByTestId, queryByTestId, findByTestId } = renderTooltip({
          onOpen: onOpenMock,
        })

        const trigger = getByTestId('tooltip-trigger')

        fireEvent.touchStart(trigger, {
          touches: [{ clientX: 10, clientY: 10 }],
        })
        fireEvent.touchMove(trigger, {
          touches: [{ clientX: 10, clientY: 60 }],
        })
        fireEvent.touchEnd(trigger)

        await expect(() =>
          waitFor(() => {
            expect(queryByTestId('tooltip-content')).toBeInTheDocument()
          })
        ).rejects.toThrow()
        expect(onOpenMock).not.toHaveBeenCalled()

        // A stationary tap — movement within the slop — still opens.
        fireEvent.touchStart(trigger, {
          touches: [{ clientX: 10, clientY: 10 }],
        })
        fireEvent.touchMove(trigger, {
          touches: [{ clientX: 13, clientY: 14 }],
        })
        fireEvent.touchEnd(trigger)
        fireEvent.click(trigger)

        await findByTestId('tooltip-content')
      })
    })

    describe('when tapping a disabled element wrapped in the trigger', () => {
      it('opens the tooltip', async () => {
        // The documented "tooltip on a disabled element" pattern: a disabled
        // control inside a `<span>` trigger. A tap on a disabled control
        // dispatches touch events (which bubble to the span) but NEVER a
        // synthetic click — the HTML spec bars disabled form controls from
        // click events — so the open must come from `touchstart` bubbling up
        // to the trigger.
        const { getByTestId, queryByTestId } = render(
          <Tooltip id='tooltip-id' content={<TestContent />}>
            <span data-testid='tooltip-trigger'>
              <button type='button' disabled data-testid='inner-disabled'>
                Disabled
              </button>
            </span>
          </Tooltip>
        )

        fireEvent.touchStart(getByTestId('inner-disabled'))
        fireEvent.touchEnd(getByTestId('inner-disabled'))

        await waitFor(() =>
          expect(queryByTestId('tooltip-content')).toBeInTheDocument()
        )
      })
    })

    describe('when following the cursor', () => {
      it('does not open the tooltip', async () => {
        // followCursor is unsupported on touch devices — neither tap nor
        // hover-like events may open it.
        const onOpenMock = jest.fn()

        const { getByTestId, queryByTestId } = renderTooltip({
          followCursor: true,
          onOpen: onOpenMock,
        })

        const trigger = getByTestId('tooltip-trigger')

        clickElement(trigger)
        fireEvent.mouseOver(trigger)
        fireEvent.mouseMove(trigger, { clientX: 10, clientY: 10 })

        await expect(() =>
          waitFor(() => {
            expect(queryByTestId('tooltip-content')).toBeInTheDocument()
          })
        ).rejects.toThrow()
        expect(onOpenMock).not.toHaveBeenCalled()
      })
    })
  })
})
