import React, { StrictMode } from 'react'
import { act, cleanup, render } from '@toptal/picasso-test-utils'

import Collapse from './Collapse'

const CONTENT_HEIGHT = 120
const FRAME = 20

const SomeChildComponent = React.forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} data-testid='child-div' {...props}>
    Hello, I'm child div!
  </div>
))

describe('Collapse', () => {
  let clientHeightSpy: jest.SpyInstance

  beforeEach(() => {
    jest.useFakeTimers()
    // jsdom has no layout; the inner wrapper reports the mocked height
    clientHeightSpy = jest
      .spyOn(Element.prototype, 'clientHeight', 'get')
      .mockReturnValue(CONTENT_HEIGHT)
  })

  afterEach(() => {
    clientHeightSpy.mockRestore()
    cleanup()
    jest.useRealTimers()
  })

  it('shows content instantly when mounted expanded without `appear`', () => {
    const onEnter = jest.fn()
    const { getByTestId } = render(
      <Collapse in onEnter={onEnter} data-testid='collapse'>
        <SomeChildComponent />
      </Collapse>
    )

    expect(getByTestId('collapse')).toHaveStyle({ height: 'auto' })
    expect(getByTestId('collapse')).toHaveClass('overflow-visible')
    expect(getByTestId('collapse')).not.toHaveClass('invisible')
    expect(onEnter).not.toHaveBeenCalled()
  })

  it('animates from zero on an `appear` mount', () => {
    const onEnter = jest.fn()
    const { getByTestId } = render(
      <Collapse appear in onEnter={onEnter} data-testid='collapse'>
        <SomeChildComponent />
      </Collapse>
    )

    const collapse = getByTestId('collapse')

    expect(collapse).toHaveStyle({ height: '0px' })
    expect(collapse).toHaveClass('overflow-hidden')
    expect(onEnter).toHaveBeenCalledTimes(1)
    expect(onEnter).toHaveBeenCalledWith(collapse, true)

    act(() => {
      jest.advanceTimersByTime(FRAME)
    })

    expect(collapse).toHaveStyle({ height: `${CONTENT_HEIGHT}px` })

    act(() => {
      jest.advanceTimersByTime(350)
    })

    expect(collapse).toHaveStyle({ height: 'auto' })
    expect(collapse).toHaveClass('overflow-visible')
  })

  it('transitions based on the `in` prop', () => {
    const { getByTestId, rerender } = render(
      <Collapse in={false} data-testid='collapse'>
        <SomeChildComponent />
      </Collapse>
    )

    const collapse = getByTestId('collapse')

    expect(collapse).toHaveClass('invisible')
    expect(collapse).toHaveStyle({ height: '0px' })

    rerender(
      <Collapse in data-testid='collapse'>
        <SomeChildComponent />
      </Collapse>
    )

    expect(collapse).not.toHaveClass('invisible')

    act(() => {
      jest.advanceTimersByTime(FRAME)
    })

    expect(collapse).toHaveStyle({ height: `${CONTENT_HEIGHT}px` })

    act(() => {
      jest.advanceTimersByTime(350)
    })

    expect(collapse).toHaveStyle({ height: 'auto' })
    expect(collapse).toHaveClass('overflow-visible')
  })

  it('collapses and fires `onExited` while staying mounted', () => {
    const onExited = jest.fn()
    const { getByTestId, rerender } = render(
      <Collapse in onExited={onExited} data-testid='collapse'>
        <SomeChildComponent />
      </Collapse>
    )

    const collapse = getByTestId('collapse')

    rerender(
      <Collapse in={false} onExited={onExited} data-testid='collapse'>
        <SomeChildComponent />
      </Collapse>
    )

    expect(collapse).toHaveStyle({ height: `${CONTENT_HEIGHT}px` })
    expect(collapse).toHaveClass('overflow-hidden')

    act(() => {
      jest.advanceTimersByTime(FRAME)
    })

    expect(collapse).toHaveStyle({ height: '0px' })

    act(() => {
      jest.advanceTimersByTime(350)
    })

    expect(onExited).toHaveBeenCalledTimes(1)
    expect(onExited).toHaveBeenCalledWith(collapse)
    expect(collapse).toHaveClass('invisible')
    expect(collapse).toBeInTheDocument()
  })

  it('unmounts after the exit settles with `unmountOnExit`', () => {
    const onExited = jest.fn()
    const { queryByTestId, rerender } = render(
      <Collapse in unmountOnExit onExited={onExited} data-testid='collapse'>
        <SomeChildComponent />
      </Collapse>
    )

    expect(queryByTestId('collapse')).toBeInTheDocument()

    rerender(
      <Collapse
        in={false}
        unmountOnExit
        onExited={onExited}
        data-testid='collapse'
      >
        <SomeChildComponent />
      </Collapse>
    )

    act(() => {
      jest.runAllTimers()
    })

    expect(onExited).toHaveBeenCalledTimes(1)
    expect(queryByTestId('collapse')).not.toBeInTheDocument()
  })

  it('never mounts when starting collapsed with `unmountOnExit`', () => {
    const { queryByTestId } = render(
      <Collapse in={false} unmountOnExit data-testid='collapse'>
        <SomeChildComponent />
      </Collapse>
    )

    expect(queryByTestId('collapse')).not.toBeInTheDocument()
  })

  it('applies per-phase durations from an object `timeout`', () => {
    const { getByTestId, rerender } = render(
      <Collapse
        appear
        in
        timeout={{ enter: 100, exit: 200 }}
        data-testid='collapse'
      >
        <SomeChildComponent />
      </Collapse>
    )

    expect(getByTestId('collapse')).toHaveStyle({
      transitionDuration: '100ms',
    })

    rerender(
      <Collapse
        in={false}
        timeout={{ enter: 100, exit: 200 }}
        data-testid='collapse'
      >
        <SomeChildComponent />
      </Collapse>
    )

    expect(getByTestId('collapse')).toHaveStyle({
      transitionDuration: '200ms',
    })
  })

  it('lets a consumer className override its own overflow', () => {
    const { getByTestId } = render(
      <Collapse in={true} className='overflow-auto' data-testid='collapse'>
        <SomeChildComponent />
      </Collapse>
    )

    expect(getByTestId('collapse')).toHaveClass('overflow-auto')
    expect(getByTestId('collapse')).not.toHaveClass('overflow-hidden')
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

  it('forwards unrecognized props to the DOM node', () => {
    const { getByTestId } = render(
      <Collapse in data-private data-testid='collapse'>
        <SomeChildComponent />
      </Collapse>
    )

    expect(getByTestId('collapse')).toHaveAttribute('data-private')
  })

  it('settles an `appear` mount under StrictMode', () => {
    const onEnter = jest.fn()
    const { getByTestId } = render(
      <StrictMode>
        <Collapse appear in onEnter={onEnter} data-testid='collapse'>
          <SomeChildComponent />
        </Collapse>
      </StrictMode>
    )

    act(() => {
      jest.runAllTimers()
    })

    expect(onEnter).toHaveBeenCalledTimes(1)
    expect(getByTestId('collapse')).toHaveStyle({ height: 'auto' })
    expect(getByTestId('collapse')).toHaveClass('overflow-visible')
  })
})
