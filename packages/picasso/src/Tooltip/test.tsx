import React, { forwardRef } from 'react'
import { fireEvent } from '@testing-library/react'
import { OmitInternalProps } from '@toptal/picasso-shared'
import { isPointerDevice } from '@toptal/picasso/utils'
import { render, wait } from '@toptal/picasso/test-utils'

import Tooltip, { Props } from './Tooltip'

const mockedIsPointerDevice = isPointerDevice as jest.Mock

const TestContent = () => <div data-testid='tooltip-content'>Content</div>

const TestTrigger = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} data-testid='tooltip-trigger' {...props}>
    Trigger
  </div>
))

const renderTooltip = (props?: Partial<OmitInternalProps<Props>>) =>
  render(
    <Tooltip id='tooltip-id' content={<TestContent />} {...props}>
      <TestTrigger />
    </Tooltip>
  )

describe('Tooltip', () => {
  beforeEach(() => {
    mockedIsPointerDevice.mockReturnValue(true)
  })

  afterEach(() => {
    mockedIsPointerDevice.mockClear()
  })

  it('renders closed by default', () => {
    const { container } = renderTooltip()

    expect(container).toMatchSnapshot()
  })

  it('renders initially opened', () => {
    const { container } = renderTooltip({ open: true })

    expect(container).toMatchSnapshot()
  })

  it('renders with portals disabled', () => {
    const { container } = renderTooltip({ open: true, disablePortal: true })

    expect(container).toMatchSnapshot()
  })

  it('opens tooltip with a short delay', async () => {
    const { getByTestId, findByTestId } = renderTooltip()

    fireEvent.mouseEnter(getByTestId('tooltip-trigger'))
    const content = await findByTestId('tooltip-content')

    expect(content).toBeInTheDocument()
  })

  it('opens tooltip on the first touch on touch screens', async () => {
    mockedIsPointerDevice.mockReturnValue(false)
    const { getByTestId, findByTestId } = renderTooltip()

    fireEvent.click(getByTestId('tooltip-trigger'))
    const content = await findByTestId('tooltip-content')

    expect(content).toBeInTheDocument()
  })

  it('closes tooltip on the second touch on touch screens', async () => {
    mockedIsPointerDevice.mockReturnValue(false)
    const { getByTestId, queryByTestId, findByTestId } = renderTooltip()

    fireEvent.click(getByTestId('tooltip-trigger'))
    await findByTestId('tooltip-content')

    fireEvent.click(getByTestId('tooltip-trigger'))
    await wait(() => {
      expect(queryByTestId('tooltip-content')).not.toBeInTheDocument()
    })
  })
})
