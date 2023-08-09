import type { MouseEventHandler } from 'react'
import React, { forwardRef } from 'react'
import { fireEvent, waitFor } from '@testing-library/react'
import type { OmitInternalProps } from '@toptal/picasso-shared'
import { render } from '@toptal/picasso/test-utils'

import type { Props } from './Tooltip'
import Tooltip from './Tooltip'
import {
  mouseMoveDebounceTimeout,
  mouseMoveCloseTooltipDistance,
} from './use-tooltip-follow-cursor'

const TOOLTIP_SHORT_DELAY = 200
const TOOLTIP_LONG_DELAY = 500
const INTERVAL = 50

const TestContent = () => {
  return <div data-testid='tooltip-content'>Content</div>
}

const TestTrigger = forwardRef<
  HTMLDivElement,
  {
    onClick?: MouseEventHandler<HTMLDivElement>
    onMouseOver?: MouseEventHandler<HTMLDivElement>
    onMouseMove?: MouseEventHandler<HTMLDivElement>
    onMouseLeave?: MouseEventHandler<HTMLDivElement>
  }
>((props, ref) => {
  return (
    <div ref={ref} data-testid='tooltip-trigger' {...props}>
      Trigger
    </div>
  )
})

const renderTooltip = (props?: Partial<OmitInternalProps<Props>>) => {
  return render(
    <Tooltip id='tooltip-id' content={<TestContent />} {...props}>
      <TestTrigger
        onClick={props?.onClick}
        onMouseOver={props?.onMouseOver}
        onMouseMove={props?.onMouseMove}
        onMouseLeave={props?.onMouseLeave}
      />
    </Tooltip>
  )
}

// eslint-disable-next-line max-lines-per-function
describe('Tooltip', () => {
  beforeAll(() => {
    // By default in Jest window.getComputedStyle returns only partial styles
    // To correctly calculate offsets in Popper.js we have to manually define styles for HTML element
    const htmlElement = document.getElementsByTagName('html')[0]

    htmlElement.style.marginLeft = '0'
    htmlElement.style.marginTop = '0'
    htmlElement.style.borderTopWidth = '0'
    htmlElement.style.borderLeftWidth = '0'
  })

  describe('with isPointerDevice being true', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn(() => ({
          matches: true,
        })),
      })
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
      const { container, queryByTestId, unmount } = renderTooltip({
        open: true,
        disablePortal: true,
      })

      expect(queryByTestId('tooltip-content')).toBeInTheDocument()
      expect(container).toMatchSnapshot()

      unmount() // required to avoid updates from popper when portals are not used
    })

    it('opens and closes tooltip on focus', async () => {
      const { getByTestId, queryByTestId, findByTestId } = renderTooltip()

      fireEvent.focus(getByTestId('tooltip-trigger'))
      await findByTestId('tooltip-content')

      fireEvent.blur(getByTestId('tooltip-trigger'))
      await waitFor(() => {
        expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
      })
    })

    it('opens and closes tooltip on hover with a short delay', async () => {
      const { getByTestId, queryByTestId } = renderTooltip({ delay: 'short' })

      fireEvent.mouseEnter(getByTestId('tooltip-trigger'))
      await waitFor(
        () => {
          expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
        },
        { timeout: TOOLTIP_SHORT_DELAY - 1 }
      )
      await waitFor(
        () => {
          expect(queryByTestId('tooltip-content')).toBeInTheDocument()
        },
        { timeout: TOOLTIP_SHORT_DELAY + INTERVAL }
      )

      fireEvent.mouseLeave(getByTestId('tooltip-trigger'))
      await waitFor(() => {
        expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
      })
    })

    it('opens and closes tooltip on hover with a long delay', async () => {
      const { getByTestId, queryByTestId } = renderTooltip({ delay: 'long' })

      fireEvent.mouseEnter(getByTestId('tooltip-trigger'))
      await waitFor(
        () => {
          expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
        },
        { timeout: TOOLTIP_LONG_DELAY - 1 }
      )
      await waitFor(
        () => expect(queryByTestId('tooltip-content')).toBeInTheDocument(),
        { timeout: TOOLTIP_LONG_DELAY + INTERVAL }
      )

      fireEvent.mouseLeave(getByTestId('tooltip-trigger'))
      await waitFor(() => {
        expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
      })
    })

    it('does not open tooltip with disabled listeners', async () => {
      const onClickMock = jest.fn()
      const onMouseOverMock = jest.fn()
      const onMouseMoveMock = jest.fn()
      const onMouseLeaveMock = jest.fn()

      const { getByTestId, findByTestId } = renderTooltip({
        disableListeners: true,
        onClick: onClickMock,
        onMouseOver: onMouseOverMock,
        onMouseMove: onMouseMoveMock,
        onMouseLeave: onMouseLeaveMock,
      })

      fireEvent.focus(getByTestId('tooltip-trigger'))
      fireEvent.click(getByTestId('tooltip-trigger'))
      fireEvent.mouseOver(getByTestId('tooltip-trigger'))
      fireEvent.mouseMove(getByTestId('tooltip-trigger'))
      fireEvent.mouseLeave(getByTestId('tooltip-trigger'))

      await expect(() => findByTestId('tooltip-content')).rejects.toThrow()

      expect(onClickMock).toHaveBeenCalledTimes(1)
      expect(onMouseOverMock).toHaveBeenCalledTimes(1)
      expect(onMouseMoveMock).toHaveBeenCalledTimes(1)
      expect(onMouseLeaveMock).toHaveBeenCalledTimes(1)
    })

    it('does not close tooltip when interactive content is used by the user', async () => {
      const { getByTestId, queryByTestId, findByTestId } = renderTooltip({
        interactive: true,
      })

      fireEvent.focus(getByTestId('tooltip-trigger'))
      await findByTestId('tooltip-content')

      fireEvent.mouseEnter(getByTestId('tooltip-content'))
      await findByTestId('tooltip-content')

      fireEvent.mouseLeave(getByTestId('tooltip-content'))
      await waitFor(() => {
        expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
      })
    })

    it('opens and moves tooltip on mouse move when followCursor prop is set and move distance is short', async () => {
      const { getByTestId, queryByTestId } = renderTooltip({
        followCursor: true,
      })

      fireEvent.mouseEnter(getByTestId('tooltip-trigger'))
      await waitFor(
        () => {
          expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
        },
        { timeout: TOOLTIP_SHORT_DELAY - 1 }
      )
      await waitFor(
        () => expect(queryByTestId('tooltip-content')).toBeInTheDocument(),
        { timeout: TOOLTIP_SHORT_DELAY + INTERVAL }
      )
      await waitFor(() => {
        expect(document.querySelector('[role="tooltip"]')).toHaveStyle({
          transform: 'translate3d(0px, -5px, 0)',
        })
      })

      fireEvent.mouseMove(getByTestId('tooltip-trigger'), {
        clientX: 0,
        clientY: 0,
      })
      fireEvent.mouseMove(getByTestId('tooltip-trigger'), {
        clientX: mouseMoveCloseTooltipDistance - 1,
        clientY: 0,
      })

      await waitFor(
        () => expect(queryByTestId('tooltip-content')).toBeInTheDocument(),
        { timeout: mouseMoveDebounceTimeout + INTERVAL }
      )

      await waitFor(() => {
        expect(document.querySelector('[role="tooltip"]')).toHaveStyle({
          transform: 'translate3d(49px, -5px, 0)',
        })
      })
    })

    it('opens and moves tooltip on mouse move when followCursor prop is set and move distance is long', async () => {
      const { getByTestId, queryByTestId } = renderTooltip({
        followCursor: true,
      })

      fireEvent.mouseEnter(getByTestId('tooltip-trigger'))
      await waitFor(
        () => {
          expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
        },
        { timeout: TOOLTIP_SHORT_DELAY - 1 }
      )
      await waitFor(
        () => expect(queryByTestId('tooltip-content')).toBeInTheDocument(),
        { timeout: TOOLTIP_SHORT_DELAY + INTERVAL }
      )
      await waitFor(() => {
        expect(document.querySelector('[role="tooltip"]')).toHaveStyle({
          transform: 'translate3d(0px, -5px, 0)',
        })
      })

      fireEvent.mouseMove(getByTestId('tooltip-trigger'), {
        clientX: 0,
        clientY: 0,
      })
      fireEvent.mouseMove(getByTestId('tooltip-trigger'), {
        clientX: mouseMoveCloseTooltipDistance + 1,
        clientY: 0,
      })

      await waitFor(
        () => {
          expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
        },
        { timeout: mouseMoveDebounceTimeout - 1 }
      )
      await waitFor(
        () => expect(queryByTestId('tooltip-content')).toBeInTheDocument(),
        { timeout: mouseMoveDebounceTimeout + INTERVAL }
      )

      await waitFor(() => {
        expect(document.querySelector('[role="tooltip"]')).toHaveStyle({
          transform: 'translate3d(51px, -5px, 0)',
        })
      })
    })
  })

  describe('with isPointerDevice being false', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn(() => ({
          matches: false,
        })),
      })
    })

    it('opens and closes tooltip on touch screens', async () => {
      const { getByTestId, queryByTestId, findByTestId } = renderTooltip()

      fireEvent.click(getByTestId('tooltip-trigger'))
      await findByTestId('tooltip-content')

      fireEvent.click(getByTestId('tooltip-trigger'))
      await waitFor(() => {
        expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
      })
    })

    it('does not open tooltip on touch event when followCursor prop is set', async () => {
      const { getByTestId, queryByTestId } = renderTooltip({
        followCursor: true,
      })

      fireEvent.mouseEnter(getByTestId('tooltip-trigger'))
      await waitFor(
        () => {
          expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
        },
        { timeout: TOOLTIP_SHORT_DELAY + INTERVAL }
      )

      fireEvent.mouseMove(getByTestId('tooltip-trigger'), {
        clientX: 0,
        clientY: 0,
      })
      fireEvent.mouseMove(getByTestId('tooltip-trigger'), {
        clientX: mouseMoveCloseTooltipDistance - 1,
        clientY: 0,
      })

      await waitFor(
        () => expect(queryByTestId('tooltip-content')).not.toBeInTheDocument(),
        { timeout: mouseMoveDebounceTimeout + INTERVAL }
      )
    })
  })
})
