import { fireEvent } from '@toptal/picasso/test-utils'
import { act, renderHook } from '@testing-library/react-hooks'

import usePauseAutoplayOnHover from './usePauseAutoplayOnHover'

describe('usePauseAutoplayOnHover', () => {
  describe('when feature not active', () => {
    it('does nothing', () => {
      const wrapperElement = document.createElement('div')
      const wrapperRef = {
        current: wrapperElement,
      }

      jest.spyOn(wrapperElement, 'addEventListener')

      renderHook(() =>
        usePauseAutoplayOnHover({
          wrapperRef,
          startAutoplay: jest.fn(),
          stopAutoplay: jest.fn(),
          pauseAutoplayOnHover: false,
        })
      )

      expect(wrapperElement.addEventListener).not.toHaveBeenCalled()
    })
  })

  describe('when user interacts with mouse over the wrapper', () => {
    it('toggles the autoplay', async () => {
      const wrapperElement = document.createElement('div')
      const wrapperRef = {
        current: wrapperElement,
      }
      const startAutoplay = jest.fn()
      const stopAutoplay = jest.fn()

      renderHook(() =>
        usePauseAutoplayOnHover({
          wrapperRef,
          startAutoplay,
          stopAutoplay,
          pauseAutoplayOnHover: true,
        })
      )

      act(() => {
        fireEvent.mouseEnter(wrapperElement)
        fireEvent.mouseEnter(wrapperElement)
      })

      expect(stopAutoplay).toHaveBeenCalledTimes(1)
      expect(startAutoplay).not.toHaveBeenCalled()

      act(() => {
        fireEvent.mouseLeave(wrapperElement)
        fireEvent.mouseLeave(wrapperElement)
      })

      expect(stopAutoplay).toHaveBeenCalledTimes(1)
      expect(startAutoplay).toHaveBeenCalledTimes(1)
    })
  })
})
