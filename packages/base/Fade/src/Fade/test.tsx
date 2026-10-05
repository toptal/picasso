import React from 'react'
import { act, cleanup, render } from '@toptal/picasso-test-utils'

import Fade from './Fade'

const SomeChildComponent = React.forwardRef<
  HTMLDivElement,
  { className?: string }
>((props, ref) => (
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

  it('shows the child when `in` is true', () => {
    const { getByTestId } = render(
      <Fade in={true}>
        <SomeChildComponent />
      </Fade>
    )

    const child = getByTestId('child-div')

    expect(child).toHaveClass('transition-opacity')
    expect(child).not.toHaveClass('opacity-0')
    expect(child).not.toHaveClass('invisible')
  })

  it('transitions based on the `in` prop', () => {
    const { getByTestId, rerender } = render(
      <Fade in={false}>
        <SomeChildComponent />
      </Fade>
    )

    expect(getByTestId('child-div')).toHaveClass('opacity-0')
    expect(getByTestId('child-div')).toHaveClass('invisible')

    act(() => {
      rerender(
        <Fade in={true}>
          <SomeChildComponent />
        </Fade>
      )
      jest.runAllTimers()
    })

    expect(getByTestId('child-div')).not.toHaveClass('opacity-0')
    expect(getByTestId('child-div')).not.toHaveClass('invisible')

    act(() => {
      rerender(
        <Fade in={false}>
          <SomeChildComponent />
        </Fade>
      )
    })

    // Fade-out starts at once; `invisible` lands only after it settles
    expect(getByTestId('child-div')).toHaveClass('opacity-0')
    expect(getByTestId('child-div')).not.toHaveClass('invisible')

    act(() => {
      jest.runAllTimers()
    })

    expect(getByTestId('child-div')).toHaveClass('invisible')
  })

  it('calls `onEnter` marked as appearing when mounted shown', () => {
    const onEnter = jest.fn()
    const { getByTestId } = render(
      <Fade in={true} onEnter={onEnter}>
        <SomeChildComponent />
      </Fade>
    )

    expect(onEnter).toHaveBeenCalledTimes(1)
    expect(onEnter).toHaveBeenCalledWith(getByTestId('child-div'), true)
  })

  it('calls `onExited` after the exit transition settles', () => {
    const onExited = jest.fn()
    const { getByTestId, rerender } = render(
      <Fade in={true} onExited={onExited}>
        <SomeChildComponent />
      </Fade>
    )

    act(() => {
      rerender(
        <Fade in={false} onExited={onExited}>
          <SomeChildComponent />
        </Fade>
      )
    })

    expect(onExited).not.toHaveBeenCalled()

    act(() => {
      jest.runAllTimers()
    })

    expect(onExited).toHaveBeenCalledTimes(1)
    expect(onExited).toHaveBeenCalledWith(getByTestId('child-div'))
  })

  it('calls `onEnter` and `onExited` with `null` for a child that takes no ref', () => {
    const onEnter = jest.fn()
    const onExited = jest.fn()
    // Takes the ref without attaching it, so Fade has no node to pass
    const RefLessChild = React.forwardRef<
      HTMLDivElement,
      { className?: string }
    >(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ className }, ref) => <div className={className}>No ref here</div>
    )
    const renderFade = (inProp: boolean) => (
      <Fade in={inProp} onEnter={onEnter} onExited={onExited}>
        <RefLessChild />
      </Fade>
    )
    const { rerender } = render(renderFade(false))

    act(() => {
      rerender(renderFade(true))
    })

    expect(onEnter).toHaveBeenCalledWith(null, false)

    act(() => {
      rerender(renderFade(false))
    })
    act(() => {
      jest.runAllTimers()
    })

    expect(onExited).toHaveBeenCalledWith(null)
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

  it('applies per-phase durations from an object `timeout`', () => {
    const timeout = { enter: 100, exit: 200 }
    const { getByTestId, rerender } = render(
      <Fade in={true} timeout={timeout}>
        <SomeChildComponent />
      </Fade>
    )

    expect(getByTestId('child-div')).toHaveStyle({
      transitionDuration: '100ms',
    })

    act(() => {
      rerender(
        <Fade in={false} timeout={timeout}>
          <SomeChildComponent />
        </Fade>
      )
    })

    expect(getByTestId('child-div')).toHaveStyle({
      transitionDuration: '200ms',
    })
  })

  it('preserves the child className', () => {
    const { getByTestId } = render(
      <Fade in={true}>
        <SomeChildComponent className='p-4' />
      </Fade>
    )

    expect(getByTestId('child-div')).toHaveClass('p-4')
    expect(getByTestId('child-div')).toHaveClass('transition-opacity')
  })

  it("fades over a `transition-*` utility of the child's", () => {
    const { getByTestId } = render(
      <Fade in={true}>
        <SomeChildComponent className='transition-colors' />
      </Fade>
    )

    expect(getByTestId('child-div')).toHaveClass('transition-opacity')
    expect(getByTestId('child-div')).not.toHaveClass('transition-colors')
  })

  it.each(['transition', 'transition-all'])(
    "keeps the child's `%s`, which animates opacity too",
    transition => {
      const { getByTestId } = render(
        <Fade in={true}>
          <SomeChildComponent className={transition} />
        </Fade>
      )

      expect(getByTestId('child-div')).toHaveClass(transition)
      expect(getByTestId('child-div')).not.toHaveClass('transition-opacity')
    }
  )
})
