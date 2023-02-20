import { renderHook } from '@testing-library/react-hooks'

import useHandleOnScreen from './useHandleOnScreen'

const defaultProps = {
  autoplay: true,
  isOnScreen: true,
  startAutoplay: jest.fn(),
  stopAutoplay: jest.fn(),
  onScreen: undefined,
}

describe('useHandleOnScreen', () => {
  describe('when onScreen callback is provided', () => {
    it('is called with the isOnScreen', () => {
      const onInView = jest.fn()
      const { rerender } = renderHook(props => useHandleOnScreen(props), {
        initialProps: { ...defaultProps, onInView, isOnScreen: true },
      })

      expect(onInView).toHaveBeenCalledTimes(1)
      expect(onInView).toHaveBeenCalledWith(true)

      rerender({ ...defaultProps, onInView, isOnScreen: false })

      expect(onInView).toHaveBeenCalledTimes(2)
      expect(onInView).toHaveBeenCalledWith(false)
    })
  })

  describe('when carousel is visible on screen', () => {
    it('does nothing when autoplay is disabled', () => {
      const startAutoplay = jest.fn()
      const stopAutoplay = jest.fn()

      renderHook(() =>
        useHandleOnScreen({
          ...defaultProps,
          autoplay: false,
          startAutoplay,
          stopAutoplay,
        })
      )

      expect(startAutoplay).not.toHaveBeenCalled()
      expect(stopAutoplay).not.toHaveBeenCalled()
    })
    it('triggers the autoplay', () => {
      const startAutoplay = jest.fn()
      const stopAutoplay = jest.fn()

      renderHook(() =>
        useHandleOnScreen({
          ...defaultProps,
          autoplay: true,
          startAutoplay,
          stopAutoplay,
        })
      )

      expect(startAutoplay).toHaveBeenCalledTimes(1)
      expect(stopAutoplay).not.toHaveBeenCalled()
    })
  })

  describe('when carousel is not on the screen', () => {
    it('stops the autoplay', () => {
      const startAutoplay = jest.fn()
      const stopAutoplay = jest.fn()

      renderHook(() =>
        useHandleOnScreen({
          ...defaultProps,
          autoplay: true,
          startAutoplay,
          stopAutoplay,
          isOnScreen: false,
        })
      )

      expect(stopAutoplay).toHaveBeenCalledTimes(1)
      expect(startAutoplay).not.toHaveBeenCalled()
    })
  })
})
