import React from 'react'
import { act, cleanup, render } from '@toptal/picasso-test-utils'

import Collapse from './Collapse'

const SomeChildComponent = React.forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} data-testid='child-div' {...props}>
    Hello, I'm child div!
  </div>
))

describe('Collapse', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    cleanup()
    jest.useRealTimers()
  })

  it('transitions based on the `in` prop', () => {
    const { getByTestId, rerender } = render(
      <Collapse in={false} data-testid='collapse'>
        <SomeChildComponent />
      </Collapse>
    )

    expect(getByTestId('collapse')).toHaveClass('hidden')

    act(() => {
      rerender(
        <Collapse in={true} data-testid='collapse'>
          <SomeChildComponent />
        </Collapse>
      )
      jest.runAllTimers()
    })

    expect(getByTestId('collapse')).toHaveStyle('display: block')
  })

  it('forwards the ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    const { getByTestId } = render(
      <Collapse in={true} ref={ref} data-testid='collapse'>
        <SomeChildComponent />
      </Collapse>
    )

    expect(ref.current).toBe(getByTestId('collapse'))
  })
})
