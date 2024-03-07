import React from 'react'
import { render, cleanup } from '@toptal/picasso-test-utils'

import Backdrop from './Backdrop'

describe('Backdrop component', () => {
  afterEach(cleanup)

  it('should render without crash', () => {
    render(<Backdrop open={true} />)
  })

  it('should render with correct class when invisible prop is true', () => {
    const { getByTestId } = render(
      <Backdrop data-testid='backdrop' open={true} invisible={true} />
    )

    expect(getByTestId('backdrop')).toHaveClass('bg-opacity-0')
  })

  it('should render with correct class when invisible prop is false', () => {
    const { getByTestId } = render(
      <Backdrop data-testid='backdrop' open={true} />
    )

    expect(getByTestId('backdrop')).toHaveClass('bg-opacity-50')
  })

  it('handle ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()

    render(<Backdrop open={true} ref={ref} />)
    expect(ref.current).not.toBeNull()
  })
})
