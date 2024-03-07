import React from 'react'
import { act, cleanup, render } from '@toptal/picasso-test-utils'

import Fade from './Fade'

const SomeChildComponent = React.forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} data-testid='child-div' {...props}>
    Hello, I'm child div!
  </div>
))

describe('Fade', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    cleanup()
    jest.useRealTimers()
  })

  it('renders without errors', () => {
    const { getByTestId } = render(
      <Fade in={true}>
        <SomeChildComponent />
      </Fade>
    )

    expect(getByTestId('child-div')).toBeInTheDocument()
  })

  it('transitions based on the `in` prop', () => {
    const { getByTestId, rerender } = render(
      <Fade in={false}>
        <SomeChildComponent />
      </Fade>
    )

    expect(getByTestId('child-div')).toHaveStyle('visibility: hidden')

    act(() => {
      rerender(
        <Fade in={true}>
          <SomeChildComponent />
        </Fade>
      )
      jest.runAllTimers()
    })

    expect(getByTestId('child-div')).toHaveStyle('visibility: visible')
  })

  it('forwards the ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    const { getByTestId } = render(
      <Fade in={true} ref={ref}>
        <SomeChildComponent />
      </Fade>
    )

    expect(ref.current).toBe(getByTestId('child-div'))
  })

  it('applies transition duration style', () => {
    const timeout = 500
    const { getByTestId } = render(
      <Fade in={true} timeout={timeout}>
        <SomeChildComponent />
      </Fade>
    )

    expect(getByTestId('child-div')).toHaveStyle({
      transitionDuration: `${timeout}ms`,
    })
  })
})
