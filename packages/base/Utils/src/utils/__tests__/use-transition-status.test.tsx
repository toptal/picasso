import React, { StrictMode } from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { render, act as actDom } from '@testing-library/react'

import type { UseTransitionStatusOptions } from '../use-transition-status'
import useTransitionStatus, {
  getTransitionTimeouts,
} from '../use-transition-status'

const createNodeRef = () => ({ current: document.createElement('div') })

const renderTransitionStatus = (
  options: Partial<UseTransitionStatusOptions<HTMLDivElement>> = {}
) => {
  const nodeRef = createNodeRef()
  const initialProps: UseTransitionStatusOptions<HTMLDivElement> = {
    in: false,
    timeout: 300,
    nodeRef,
    ...options,
  }

  const result = renderHook(props => useTransitionStatus(props), {
    initialProps,
  })

  return { ...result, nodeRef, initialProps }
}

describe('getTransitionTimeouts', () => {
  it('spreads a numeric timeout across all phases', () => {
    expect(getTransitionTimeouts(250)).toEqual({
      enter: 250,
      exit: 250,
      appear: 250,
    })
  })

  it('resolves the object form with `appear` falling back to `enter`', () => {
    expect(getTransitionTimeouts({ enter: 100, exit: 200 })).toEqual({
      enter: 100,
      exit: 200,
      appear: 100,
    })
    expect(
      getTransitionTimeouts({ enter: 100, exit: 200, appear: 50 })
    ).toEqual({
      enter: 100,
      exit: 200,
      appear: 50,
    })
  })

  it('defaults missing values to zero', () => {
    expect(getTransitionTimeouts(undefined)).toEqual({
      enter: 0,
      exit: 0,
      appear: 0,
    })
    expect(getTransitionTimeouts({})).toEqual({ enter: 0, exit: 0, appear: 0 })
  })
})

describe('useTransitionStatus', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('initial status', () => {
    it('is `exited` when mounted hidden', () => {
      const { result } = renderTransitionStatus({ in: false })

      expect(result.current).toBe('exited')
    })

    it('is `unmounted` when mounted hidden with `unmountOnExit`', () => {
      const { result } = renderTransitionStatus({
        in: false,
        unmountOnExit: true,
      })

      expect(result.current).toBe('unmounted')
    })

    it('is `entered` when mounted shown without `appear`', () => {
      const onEnter = jest.fn()
      const onEntered = jest.fn()
      const { result } = renderTransitionStatus({
        in: true,
        onEnter,
        onEntered,
      })

      expect(result.current).toBe('entered')

      act(() => {
        jest.runAllTimers()
      })

      expect(onEnter).not.toHaveBeenCalled()
      expect(onEntered).not.toHaveBeenCalled()
    })

    it('is `entering` when mounted shown with `appear`', () => {
      const { result } = renderTransitionStatus({ in: true, appear: true })

      expect(result.current).toBe('entering')
    })
  })

  it('runs the enter transition on mount with `appear`, marked as appearing', () => {
    const onEnter = jest.fn()
    const onEntering = jest.fn()
    const onEntered = jest.fn()
    const { result, nodeRef } = renderTransitionStatus({
      in: true,
      appear: true,
      onEnter,
      onEntering,
      onEntered,
    })

    expect(onEnter).toHaveBeenCalledWith(nodeRef.current, true)
    expect(onEntering).toHaveBeenCalledWith(nodeRef.current, true)
    expect(onEntered).not.toHaveBeenCalled()

    act(() => {
      jest.runAllTimers()
    })

    expect(result.current).toBe('entered')
    expect(onEntered).toHaveBeenCalledWith(nodeRef.current, true)
  })

  it('fires no callbacks when mounted hidden', () => {
    const onExit = jest.fn()
    const onExiting = jest.fn()
    const onExited = jest.fn()

    renderTransitionStatus({ in: false, onExit, onExiting, onExited })

    act(() => {
      jest.runAllTimers()
    })

    expect(onExit).not.toHaveBeenCalled()
    expect(onExiting).not.toHaveBeenCalled()
    expect(onExited).not.toHaveBeenCalled()
  })

  it('runs the enter transition when `in` flips to true', () => {
    const onEnter = jest.fn()
    const onEntered = jest.fn()
    const { result, rerender, nodeRef, initialProps } = renderTransitionStatus({
      in: false,
      onEnter,
      onEntered,
    })

    rerender({ ...initialProps, in: true })

    expect(result.current).toBe('entering')
    expect(onEnter).toHaveBeenCalledWith(nodeRef.current, false)

    act(() => {
      jest.runAllTimers()
    })

    expect(result.current).toBe('entered')
    expect(onEntered).toHaveBeenCalledWith(nodeRef.current, false)
  })

  it('settles the exit transition after `timeout` milliseconds', () => {
    const onExit = jest.fn()
    const onExiting = jest.fn()
    const onExited = jest.fn()
    const { result, rerender, nodeRef, initialProps } = renderTransitionStatus({
      in: true,
      timeout: 300,
      onExit,
      onExiting,
      onExited,
    })

    rerender({ ...initialProps, in: false })

    expect(result.current).toBe('exiting')
    expect(onExit).toHaveBeenCalledWith(nodeRef.current)
    expect(onExiting).toHaveBeenCalledWith(nodeRef.current)
    expect(onExited).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(299)
    })

    expect(result.current).toBe('exiting')

    act(() => {
      jest.advanceTimersByTime(1)
    })

    expect(result.current).toBe('exited')
    expect(onExited).toHaveBeenCalledTimes(1)
    expect(onExited).toHaveBeenCalledWith(nodeRef.current)
  })

  it('cancels the pending settle when `in` flips mid-transition', () => {
    const onExited = jest.fn()
    const { result, rerender, initialProps } = renderTransitionStatus({
      in: true,
      timeout: 300,
      onExited,
    })

    rerender({ ...initialProps, in: false })

    act(() => {
      jest.advanceTimersByTime(100)
    })

    rerender({ ...initialProps, in: true })

    act(() => {
      jest.runAllTimers()
    })

    expect(result.current).toBe('entered')
    expect(onExited).not.toHaveBeenCalled()
  })

  it('uses per-phase durations from an object `timeout`', () => {
    const { result, rerender, initialProps } = renderTransitionStatus({
      in: false,
      timeout: { enter: 100, exit: 200 },
    })

    rerender({ ...initialProps, in: true })

    act(() => {
      jest.advanceTimersByTime(99)
    })

    expect(result.current).toBe('entering')

    act(() => {
      jest.advanceTimersByTime(1)
    })

    expect(result.current).toBe('entered')

    rerender({ ...initialProps, in: false })

    act(() => {
      jest.advanceTimersByTime(199)
    })

    expect(result.current).toBe('exiting')

    act(() => {
      jest.advanceTimersByTime(1)
    })

    expect(result.current).toBe('exited')
  })

  it('cycles through mount and unmount with `unmountOnExit`', () => {
    const onEnter = jest.fn()
    const onExited = jest.fn()
    const { result, rerender, nodeRef, initialProps } = renderTransitionStatus({
      in: false,
      unmountOnExit: true,
      onEnter,
      onExited,
    })

    expect(result.current).toBe('unmounted')

    rerender({ ...initialProps, in: true })

    expect(result.current).toBe('entering')
    expect(onEnter).toHaveBeenCalledWith(nodeRef.current, false)

    act(() => {
      jest.runAllTimers()
    })

    expect(result.current).toBe('entered')

    rerender({ ...initialProps, in: false })

    expect(result.current).toBe('exiting')

    act(() => {
      jest.runAllTimers()
    })

    expect(onExited).toHaveBeenCalledTimes(1)
    expect(onExited).toHaveBeenCalledWith(nodeRef.current)
    expect(result.current).toBe('unmounted')
  })
})

describe('useTransitionStatus under StrictMode', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  // StrictMode replays the mount effect (setup -> cleanup -> setup); the
  // cleanup cancels the pending settle timer, so the replay must reschedule
  // it or an appear transition never leaves `entering`
  it('settles an appear transition despite the double-invoked effect', () => {
    const onEnter = jest.fn()
    const onEntered = jest.fn()
    const nodeRef = createNodeRef()

    const Probe = () => {
      const status = useTransitionStatus({
        in: true,
        appear: true,
        timeout: 300,
        nodeRef,
        onEnter,
        onEntered,
      })

      return <div data-testid='status'>{status}</div>
    }

    const { getByTestId } = render(
      <StrictMode>
        <Probe />
      </StrictMode>
    )

    expect(getByTestId('status').textContent).toBe('entering')
    expect(onEnter).toHaveBeenCalledTimes(1)

    actDom(() => {
      jest.advanceTimersByTime(300)
    })

    expect(getByTestId('status').textContent).toBe('entered')
    expect(onEntered).toHaveBeenCalledTimes(1)
    expect(onEntered).toHaveBeenCalledWith(nodeRef.current, true)
  })
})
