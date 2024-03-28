import React from 'react'
import { act, cleanup, render } from '@toptal/picasso-test-utils'

import Slide from './Slide'

const SomeChildComponent = React.forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} data-testid='child-div' {...props}>
    Hello, I'm child div!
  </div>
))

describe('Slide', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    cleanup()
    jest.useRealTimers()
  })

  it('renders without errors', () => {
    const { getByTestId } = render(
      <Slide direction='left' in={true}>
        <SomeChildComponent />
      </Slide>
    )

    expect(getByTestId('child-div')).toBeInTheDocument()
  })

  it('transitions based on the `in` prop', () => {
    const { getByTestId, rerender } = render(
      <Slide direction='left' in={false}>
        <SomeChildComponent />
      </Slide>
    )

    expect(getByTestId('child-div')).toHaveStyle('visibility: hidden')

    act(() => {
      rerender(
        <Slide direction='left' in={true}>
          <SomeChildComponent />
        </Slide>
      )
      jest.runAllTimers()
    })

    expect(getByTestId('child-div')).toHaveStyle('visibility: visible')
  })

  it('forwards the ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    const { getByTestId } = render(
      <Slide direction='left' in={true} ref={ref}>
        <SomeChildComponent />
      </Slide>
    )

    expect(ref.current).toBe(getByTestId('child-div'))
  })

  it('applies transition duration style', () => {
    const timeout = 500
    const { getByTestId } = render(
      <Slide direction='left' in={true} timeout={timeout}>
        <SomeChildComponent />
      </Slide>
    )

    expect(getByTestId('child-div')).toHaveStyle({
      transitionDuration: `${timeout}ms`,
    })
  })
})
