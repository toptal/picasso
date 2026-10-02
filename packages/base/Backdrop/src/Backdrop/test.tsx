import React from 'react'
import { render, cleanup } from '@toptal/picasso-test-utils'

import Backdrop from './Backdrop'

describe('Backdrop component', () => {
  afterEach(cleanup)

  it('renders a fixed full-viewport scrim', () => {
    const { getByTestId } = render(
      <Backdrop data-testid='backdrop' open={true} />
    )

    expect(getByTestId('backdrop')).toHaveClass('fixed')
    expect(getByTestId('backdrop')).toHaveClass('inset-0')
    expect(getByTestId('backdrop')).not.toHaveClass('invisible')
  })

  it('hides via the fade when closed', () => {
    const { getByTestId } = render(
      <Backdrop data-testid='backdrop' open={false} />
    )

    expect(getByTestId('backdrop')).toHaveClass('invisible')
    expect(getByTestId('backdrop')).toHaveClass('opacity-0')
  })

  describe('when invisible prop is true', () => {
    it('renders with correct class', () => {
      const { getByTestId } = render(
        <Backdrop data-testid='backdrop' open={true} invisible={true} />
      )

      expect(getByTestId('backdrop')).toHaveClass('bg-black/0')
    })
  })

  describe('when invisible prop is false', () => {
    it('renders with correct class', () => {
      const { getByTestId } = render(
        <Backdrop data-testid='backdrop' open={true} />
      )

      expect(getByTestId('backdrop')).toHaveClass('bg-black/50')
    })
  })

  it('lets a consumer className win on conflicts', () => {
    const { getByTestId } = render(
      <Backdrop data-testid='backdrop' open={true} className='bg-white/50' />
    )

    expect(getByTestId('backdrop')).toHaveClass('bg-white/50')
    expect(getByTestId('backdrop')).not.toHaveClass('bg-black/50')
  })

  it('handle ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()

    render(<Backdrop open={true} ref={ref} />)
    expect(ref.current).not.toBeNull()
  })
})
