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

// eslint-disable-next-line max-lines-per-function
describe('Tooltip', () => {
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
