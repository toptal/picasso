import React, { forwardRef } from 'react'
import { fireEvent } from '@testing-library/react'
import { OmitInternalProps } from '@toptal/picasso-shared'
import { isPointerDevice } from '@toptal/picasso/utils'
import { render, wait } from '@toptal/picasso/test-utils'

import Tooltip, { Props } from './Tooltip'

const TOOLTIP_SHORT_DELAY = 200
const TOOLTIP_DELAY_DELAY = 500

const TestContent = () => {
  return <div data-testid='tooltip-content'>Content</div>
}

const TestTrigger = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} data-testid='tooltip-trigger' {...props}>
      Trigger
    </div>
  )
})

const renderTooltip = (props?: Partial<OmitInternalProps<Props>>) => {
  return render(
    <Tooltip id='tooltip-id' content={<TestContent />} {...props}>
      <TestTrigger />
    </Tooltip>
  )
}

describe('Tooltip', () => {
  const mockedIsPointerDevice = isPointerDevice as jest.Mock

  beforeEach(() => {
    mockedIsPointerDevice.mockReturnValue(true)
  })

  afterEach(() => {
    mockedIsPointerDevice.mockClear()
  })

  it('renders closed by default', () => {
    const { container, queryByTestId } = renderTooltip()

    expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('renders initially opened', () => {
    const { container, queryByTestId } = renderTooltip({ open: true })

    expect(queryByTestId('tooltip-content')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('renders with portals disabled', () => {
    const { container, queryByTestId, unmount } = renderTooltip({
      open: true,
      disablePortal: true
    })

    expect(queryByTestId('tooltip-content')).toBeInTheDocument()
    expect(container).toMatchSnapshot()

    unmount()
  })

  it('opens and closes tooltip on focus', async () => {
    const { getByTestId, queryByTestId, findByTestId } = renderTooltip()

    fireEvent.focus(getByTestId('tooltip-trigger'))
    await findByTestId('tooltip-content')

    fireEvent.blur(getByTestId('tooltip-trigger'))
    await wait(() => {
      expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
    })
  })

  it('opens and closes tooltip on touch screens', async () => {
    mockedIsPointerDevice.mockReturnValue(false)
    const { getByTestId, queryByTestId, findByTestId } = renderTooltip()

    fireEvent.click(getByTestId('tooltip-trigger'))
    await findByTestId('tooltip-content')

    fireEvent.click(getByTestId('tooltip-trigger'))
    await wait(() => {
      expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
    })
  })

  it('opens and closes tooltip on hover with a short delay', async () => {
    const { getByTestId, queryByTestId } = renderTooltip({ delay: 'short' })

    fireEvent.mouseEnter(getByTestId('tooltip-trigger'))
    await wait(
      () => {
        expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
      },
      { timeout: TOOLTIP_SHORT_DELAY / 2 }
    )
    await wait(
      () => {
        expect(queryByTestId('tooltip-content')).toBeInTheDocument()
      },
      { timeout: TOOLTIP_SHORT_DELAY }
    )

    fireEvent.mouseLeave(getByTestId('tooltip-trigger'))
    await wait(() => {
      expect(queryByTestId('tooltip-content')).toBeInTheDocument()
    })
  })

  it('opens and closes tooltip on hover with a long delay', async () => {
    const { getByTestId, queryByTestId } = renderTooltip({ delay: 'long' })

    fireEvent.mouseEnter(getByTestId('tooltip-trigger'))
    await wait(
      () => {
        expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
      },
      { timeout: TOOLTIP_DELAY_DELAY / 2 }
    )
    await wait(
      () => {
        expect(queryByTestId('tooltip-content')).toBeInTheDocument()
      },
      { timeout: TOOLTIP_DELAY_DELAY }
    )

    fireEvent.mouseLeave(getByTestId('tooltip-trigger'))
    await wait(() => {
      expect(queryByTestId('tooltip-content')).toBeInTheDocument()
    })
  })

  it('does not open tooltip on hover with disabled listeners', () => {
    const { getByTestId, queryByTestId } = renderTooltip({
      disableListeners: true
    })

    fireEvent.mouseEnter(getByTestId('tooltip-trigger'))

    expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
  })

  it('does not close tooltip when interactive content is used by the user', async () => {
    const { getByTestId, queryByTestId, findByTestId } = renderTooltip({
      interactive: true
    })

    fireEvent.focus(getByTestId('tooltip-trigger'))
    await findByTestId('tooltip-content')

    fireEvent.mouseEnter(getByTestId('tooltip-content'))
    await findByTestId('tooltip-content')

    fireEvent.mouseLeave(getByTestId('tooltip-content'))
    await wait(() => {
      expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
    })
  })
})
