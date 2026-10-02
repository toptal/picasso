import React from 'react'
import { act, cleanup, render } from '@toptal/picasso-test-utils'

import Slide from './Slide'

const SomeChildComponent = React.forwardRef<
  HTMLDivElement,
  { className?: string }
>((props, ref) => (
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

  it('shows the child when `in` is true', () => {
    const { getByTestId } = render(
      <Slide direction='left' in={true}>
        <SomeChildComponent />
      </Slide>
    )

    const child = getByTestId('child-div')

    expect(child).toHaveClass('transition-transform')
    expect(child).toHaveClass('translate-x-0')
    expect(child).not.toHaveClass('invisible')
  })

  it('transitions based on the `in` prop', () => {
    const { getByTestId, rerender } = render(
      <Slide direction='left' in={false}>
        <SomeChildComponent />
      </Slide>
    )

    expect(getByTestId('child-div')).toHaveClass('translate-x-full')
    expect(getByTestId('child-div')).toHaveClass('invisible')

    act(() => {
      rerender(
        <Slide direction='left' in={true}>
          <SomeChildComponent />
        </Slide>
      )
      jest.runAllTimers()
    })

    expect(getByTestId('child-div')).toHaveClass('translate-x-0')
    expect(getByTestId('child-div')).not.toHaveClass('invisible')

    act(() => {
      rerender(
        <Slide direction='left' in={false}>
          <SomeChildComponent />
        </Slide>
      )
    })

    // Slide-out starts at once; `invisible` lands only after it settles
    expect(getByTestId('child-div')).toHaveClass('translate-x-full')
    expect(getByTestId('child-div')).not.toHaveClass('invisible')

    act(() => {
      jest.runAllTimers()
    })

    expect(getByTestId('child-div')).toHaveClass('invisible')
  })

  it.each([
    ['right', '-translate-x-full', 'translate-x-0'],
    ['left', 'translate-x-full', 'translate-x-0'],
    ['up', 'translate-y-full', 'translate-y-0'],
    ['down', '-translate-y-full', 'translate-y-0'],
  ] as const)(
    'rests hidden on the opposite side for direction %s',
    (direction, hiddenClass, shownClass) => {
      const { getByTestId, rerender } = render(
        <Slide direction={direction} in={false}>
          <SomeChildComponent />
        </Slide>
      )

      expect(getByTestId('child-div')).toHaveClass(hiddenClass)

      act(() => {
        rerender(
          <Slide direction={direction} in={true}>
            <SomeChildComponent />
          </Slide>
        )
        jest.runAllTimers()
      })

      expect(getByTestId('child-div')).toHaveClass(shownClass)
      expect(getByTestId('child-div')).not.toHaveClass(hiddenClass)
    }
  )

  it('calls `onEnter` marked as appearing when mounted shown', () => {
    const onEnter = jest.fn()
    const { getByTestId } = render(
      <Slide direction='left' in={true} onEnter={onEnter}>
        <SomeChildComponent />
      </Slide>
    )

    expect(onEnter).toHaveBeenCalledTimes(1)
    expect(onEnter).toHaveBeenCalledWith(getByTestId('child-div'), true)
  })

  it('calls `onExited` after the exit transition settles', () => {
    const onExited = jest.fn()
    const { getByTestId, rerender } = render(
      <Slide direction='left' in={true} onExited={onExited}>
        <SomeChildComponent />
      </Slide>
    )

    act(() => {
      rerender(
        <Slide direction='left' in={false} onExited={onExited}>
          <SomeChildComponent />
        </Slide>
      )
    })

    expect(onExited).not.toHaveBeenCalled()

    act(() => {
      jest.runAllTimers()
    })

    expect(onExited).toHaveBeenCalledTimes(1)
    expect(onExited).toHaveBeenCalledWith(getByTestId('child-div'))
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

  it('applies per-phase durations from an object `timeout`', () => {
    const timeout = { enter: 100, exit: 200 }
    const { getByTestId, rerender } = render(
      <Slide direction='left' in={true} timeout={timeout}>
        <SomeChildComponent />
      </Slide>
    )

    expect(getByTestId('child-div')).toHaveStyle({
      transitionDuration: '100ms',
    })

    act(() => {
      rerender(
        <Slide direction='left' in={false} timeout={timeout}>
          <SomeChildComponent />
        </Slide>
      )
    })

    expect(getByTestId('child-div')).toHaveStyle({
      transitionDuration: '200ms',
    })
  })

  it('preserves the child className', () => {
    const { getByTestId } = render(
      <Slide direction='left' in={true}>
        <SomeChildComponent className='p-4' />
      </Slide>
    )

    expect(getByTestId('child-div')).toHaveClass('p-4')
    expect(getByTestId('child-div')).toHaveClass('transition-transform')
  })
})
