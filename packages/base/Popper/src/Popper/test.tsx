import React from 'react'
import { usePicassoRoot } from '@toptal/picasso-provider'
import { act, render, screen } from '@testing-library/react'

import type { PopperHandle, Props } from './Popper'
import Popper from './Popper'

jest.mock('@toptal/picasso-provider', () => ({
  useBreakpoint: () => true,
  usePicassoRoot: jest.fn(),
}))
jest.mock('@toptal/picasso-utils', () => ({
  __esModule: true,
  useWidthOf: () => '300px',
}))

const mockedUsePicassoRoot = usePicassoRoot as jest.Mock<
  ReturnType<typeof usePicassoRoot>
>

const rootDiv = document.createElement('div')

rootDiv.setAttribute('id', 'root')

const children = 'some children'

// floating-ui computes the position in a microtask after render
const flushPosition = async () => {
  await act(async () => {})
}

const renderPopper = (props: Partial<Props> = {}) => {
  return render(
    <Popper open anchorEl={document.body} placement='top' {...props}>
      {children}
    </Popper>
  )
}

describe('Popper', () => {
  beforeEach(() => {
    document.body.appendChild(rootDiv)
    mockedUsePicassoRoot.mockReturnValue(rootDiv)
  })

  afterEach(() => {
    rootDiv.remove()
  })

  it('renders children inside the default picasso root container', async () => {
    renderPopper()
    await flushPosition()

    const popper = screen.getByRole('tooltip')

    expect(popper).toHaveTextContent(children)
    expect(rootDiv).toContainElement(popper)
  })

  it('renders children inside a passed container', async () => {
    const container = document.createElement('div')

    document.body.appendChild(container)

    renderPopper({ container })
    await flushPosition()

    expect(container).toContainElement(screen.getByRole('tooltip'))

    container.remove()
  })

  it('does not render children when closed', async () => {
    renderPopper({ open: false })
    await flushPosition()

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('keeps children mounted but hidden when closed with keepMounted', async () => {
    renderPopper({ open: false, keepMounted: true })
    await flushPosition()

    expect(screen.getByRole('tooltip', { hidden: true })).toHaveStyle({
      display: 'none',
    })
  })

  it('applies the anchor element width when autoWidth is set', async () => {
    renderPopper()
    await flushPosition()

    expect(screen.getByRole('tooltip')).toHaveStyle({ width: '300px' })
  })

  it('applies a custom width over the anchor element width', async () => {
    renderPopper({ width: '400px' })
    await flushPosition()

    expect(screen.getByRole('tooltip')).toHaveStyle({ width: '400px' })
  })

  it('does not assign a width when autoWidth is disabled', async () => {
    renderPopper({ width: undefined, autoWidth: false })
    await flushPosition()

    expect(screen.getByRole('tooltip').style.width).toBe('')
  })

  it('exposes a popper.js-compatible handle via ref', async () => {
    const ref = React.createRef<PopperHandle>()

    renderPopper({ ref } as Partial<Props>)
    await flushPosition()

    expect(ref.current?.popper).toBe(screen.getByRole('tooltip'))
    expect(typeof ref.current?.update).toBe('function')
    expect(typeof ref.current?.scheduleUpdate).toBe('function')
  })

  it('calls onCreate once positioned', async () => {
    const onCreate = jest.fn()

    renderPopper({ popperOptions: { onCreate } })
    await flushPosition()

    expect(onCreate).toHaveBeenCalledTimes(1)
  })

  it('renders in place when portal is disabled', async () => {
    const { container } = renderPopper({ disablePortal: true })

    await flushPosition()

    expect(container).toContainElement(screen.getByRole('tooltip'))
  })

  it('positions with absolute strategy by default', async () => {
    renderPopper()
    await flushPosition()

    expect(screen.getByRole('tooltip')).toHaveStyle({ position: 'absolute' })
  })

  it('positions with fixed strategy when requested', async () => {
    renderPopper({ strategy: 'fixed' })
    await flushPosition()

    expect(screen.getByRole('tooltip')).toHaveStyle({ position: 'fixed' })
  })

  it('positions with fixed strategy via legacy popperOptions.positionFixed', async () => {
    renderPopper({ popperOptions: { positionFixed: true } })
    await flushPosition()

    expect(screen.getByRole('tooltip')).toHaveStyle({ position: 'fixed' })
  })

  it('lets an explicit strategy prop override legacy popperOptions.positionFixed', async () => {
    renderPopper({
      strategy: 'absolute',
      popperOptions: { positionFixed: true },
    })
    await flushPosition()

    expect(screen.getByRole('tooltip')).toHaveStyle({ position: 'absolute' })
  })
})
