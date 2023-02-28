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

  describe('when `isPause` parameter changes its state', () => {
    it('pauses and resumes the interval', () => {
      const callback = jest.fn()
      const { rerender } = renderHook(props => useInterval(props), {
        initialProps: { callback, delay: 100, isPaused: false },
      })

      jest.advanceTimersByTime(500)
      expect(callback).toHaveBeenCalledTimes(5)

      rerender({ callback, delay: 100, isPaused: true })
      jest.advanceTimersByTime(500)

      expect(callback).toHaveBeenCalledTimes(5)

      rerender({ callback, delay: 100, isPaused: false })
      jest.advanceTimersByTime(500)

      expect(callback).toHaveBeenCalledTimes(10)
    })
  })
  describe('component unmounts', () => {
    it('cleans up the interval', () => {
      const callback = jest.fn()
      const { unmount } = renderHook(() =>
        useInterval({ callback, delay: 100 })
      )

      jest.advanceTimersByTime(500)
      unmount()
      jest.advanceTimersByTime(500)
      expect(callback).toHaveBeenCalledTimes(5)
    })
  })

  describe('when initialized with `isPaused` set to true', () => {
    it('does not call the callback when isPaused is true', () => {
      const callback = jest.fn()

      renderHook(() => useInterval({ callback, delay: 100, isPaused: true }))

      jest.advanceTimersByTime(1000)
      expect(callback).toHaveBeenCalledTimes(0)
    })
  })
})
