import { renderHook } from '@testing-library/react-hooks'

import useInterval from './use-interval'

jest.useFakeTimers()

describe('useInterval', () => {
  it('calls the callback on each tick', () => {
    const callback = jest.fn()

    renderHook(() => useInterval({ callback, delay: 100 }))
    jest.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalledTimes(10)
  })

  it('pauses and resumes the interval', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useInterval({ callback, delay: 100 }))

    jest.advanceTimersByTime(500)
    result.current.pauseInterval()
    jest.advanceTimersByTime(500)
    expect(callback).toHaveBeenCalledTimes(5)
    result.current.resumeInterval()
    jest.advanceTimersByTime(500)
    expect(callback).toHaveBeenCalledTimes(10)
  })

  it('cleans up the interval on unmount', () => {
    const callback = jest.fn()
    const { result, unmount } = renderHook(() =>
      useInterval({ callback, delay: 100 })
    )

    jest.advanceTimersByTime(500)
    unmount()
    jest.advanceTimersByTime(500)
    expect(callback).toHaveBeenCalledTimes(5)
    expect(result.current.pauseInterval).not.toThrow()
    expect(result.current.resumeInterval).not.toThrow()
  })

  it('does not call the callback when isPaused is true', () => {
    const callback = jest.fn()
    const { result } = renderHook(() =>
      useInterval({ callback, delay: 100, isPaused: true })
    )

    jest.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalledTimes(0)
    expect(result.current.pauseInterval).not.toThrow()
    expect(result.current.resumeInterval).not.toThrow()
  })
})
