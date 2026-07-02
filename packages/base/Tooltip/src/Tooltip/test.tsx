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

// A real click/tap is always preceded by `pointerdown` — base-ui relies on it
// (its Trigger syncs `closeOnClick` into its store from `onPointerDown`), but
// jsdom's `fireEvent.click` dispatches only the bare `click`, so emit the full
// sequence ourselves.
const clickElement = (element: Element) => {
  fireEvent.pointerDown(element)
  fireEvent.click(element)
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

  it('renders closed by default', () => {
    const { container, queryByTestId } = renderTooltip()

    expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('renders initially opened', async () => {
    const { getByTestId } = renderTooltip({ open: true })

    await waitFor(() => {
      expect(getByTestId('tooltip-content')).toBeInTheDocument()
    })
  })

  it('renders with portals disabled', () => {
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

  it('opens and closes tooltip on focus and blur', async () => {
    const { getByTestId, queryByTestId } = renderTooltip()

    fireEvent.focus(getByTestId('tooltip-trigger'))
    await waitFor(() => {
      expect(queryByTestId('tooltip-content')).toBeInTheDocument()
    })

    fireEvent.blur(getByTestId('tooltip-trigger'))
    await waitFor(() => {
      expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
    })
  })

  it('does not open tooltip with disabled listeners', async () => {
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

  it('calls onOpen and onClose when toggled', async () => {
    const onOpenMock = jest.fn()
    const onCloseMock = jest.fn()

    const { getByTestId } = renderTooltip({
      onOpen: onOpenMock,
      onClose: onCloseMock,
    })

    fireEvent.focus(getByTestId('tooltip-trigger'))
    await waitFor(() => expect(onOpenMock).toHaveBeenCalled())

    fireEvent.blur(getByTestId('tooltip-trigger'))
    await waitFor(() => expect(onCloseMock).toHaveBeenCalled())
  })

  it('opens when followCursor is set', async () => {
    const { getByTestId, queryByTestId } = renderTooltip({
      followCursor: true,
    })

    fireEvent.focus(getByTestId('tooltip-trigger'))

    await waitFor(() =>
      expect(queryByTestId('tooltip-content')).toBeInTheDocument()
    )
  })

  it('hides while the cursor roams far from the trigger when followCursor is set', async () => {
    const { getByTestId, queryByTestId } = renderTooltip({
      followCursor: true,
    })

    const trigger = getByTestId('tooltip-trigger')

    fireEvent.mouseOver(trigger)

    await waitFor(() =>
      expect(queryByTestId('tooltip-content')).toBeInTheDocument()
    )

    // First move anchors the segment; a subsequent move past 50px dismisses the
    // popup (base-ui's cursor tracking would otherwise keep it open).
    fireEvent.mouseMove(trigger, { clientX: 10, clientY: 10 })
    fireEvent.mouseMove(trigger, { clientX: 200, clientY: 200 })

    await waitFor(() =>
      expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
    )
  })

  it('reopens on hover after a click-dismiss once the pointer left', async () => {
    // Click-to-dismiss suppresses re-opening only while the pointer stays on
    // the trigger; leaving lifts the suppression (legacy `ignoreOpening`).
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

  it('does not open on click on a pointer device', async () => {
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

  describe('on a touch device', () => {
    beforeEach(() => {
      mockPointerDevice(false)
    })

    it('opens and closes tooltip on click (tap)', async () => {
      const { getByTestId, queryByTestId, findByTestId } = renderTooltip()

      clickElement(getByTestId('tooltip-trigger'))
      await findByTestId('tooltip-content')

      clickElement(getByTestId('tooltip-trigger'))
      await waitFor(() => {
        expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
      })
    })

    it('does not open when followCursor is set', async () => {
      // followCursor is unsupported on touch devices (parity with
      // @material-ui@5) — neither tap nor hover-like events may open it.
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

  it('opens when hovering a descendant of the trigger', async () => {
    // A disabled control wrapped in a trigger element (the documented pattern
    // for tooltips on disabled elements): the hover originates on the inner
    // disabled control, so the open must come from `mouseover` bubbling up to
    // the trigger — base-ui's movement-based hover does not fire here.
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
