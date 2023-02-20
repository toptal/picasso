import { act, renderHook } from '@testing-library/react-hooks'
import { GliderMethods } from 'react-glider/dist/types'

import useAutoplay, { Props } from './useAutoplay'

const renderUseAutoplay = (props: Partial<Props>) =>
  renderHook(() =>
    useAutoplay({
      gliderRef: { current: null },
      currentSlide: 0,
      intervalRef: { current: undefined },
      slidesToScroll: 1,
      autoplay: true,
      autoplayDelay: 3000,
      rewind: true,
      isOnLastSlide: false,
      ...props,
    })
  )

describe('useAutoplay', () => {
  beforeAll(() => {})
  describe('stopAutoplay', () => {
    let clearInterval: jest.SpyInstance

    beforeEach(() => {
      clearInterval = jest.spyOn(global, 'clearInterval')
    })
    describe('when there is no interval active', () => {
      it('should do nothing', () => {
        const { result } = renderUseAutoplay({
          intervalRef: { current: undefined },
        })

        const [, stopAutoplay] = result.current

        act(() => {
          stopAutoplay()
        })

        expect(clearInterval).not.toHaveBeenCalled()
      })
    })

    describe('when there is active interval', () => {
      it('should clear the interval', () => {
        const interval = setInterval(() => {}, 0)
        const { result } = renderUseAutoplay({
          intervalRef: { current: interval },
        })

        const [, stopAutoplay] = result.current

        act(() => {
          stopAutoplay()
        })

        expect(clearInterval).toHaveBeenCalledTimes(1)
        expect(clearInterval).toHaveBeenCalledWith(interval)
      })
    })
  })

  describe('startAutoplay', () => {
    let gliderMock: GliderMethods & { track: HTMLDivElement }

    beforeEach(() => {
      gliderMock = {
        setOption: jest.fn(),
        destroy: jest.fn(),
        scrollItem: jest.fn(),
        updateControls: jest.fn(),
        refresh: jest.fn(),
        scrollTo: jest.fn(),
        track: { childElementCount: 2 } as HTMLDivElement,
      }
    })
    describe('when autoplay is false', () => {
      it('should not set the interval', () => {
        const setInterval = jest.spyOn(global, 'setInterval')

        const { result } = renderUseAutoplay({
          autoplay: false,
          gliderRef: { current: gliderMock },
        })

        const [startAutoplay] = result.current

        act(() => {
          startAutoplay()
        })

        expect(setInterval).not.toHaveBeenCalled()
      })
    })

    describe('when glider is not set', () => {
      it('should not set the interval', () => {
        const setInterval = jest.spyOn(global, 'setInterval')

        const { result } = renderUseAutoplay({
          autoplay: true,
          gliderRef: { current: null },
        })

        const [startAutoplay] = result.current

        act(() => {
          startAutoplay()
        })

        expect(setInterval).not.toHaveBeenCalled()
      })
    })

    describe('when rewind is false', () => {
      beforeEach(() => {
        jest.useFakeTimers()
        jest.clearAllTimers()
        jest.spyOn(global, 'setInterval')
        jest.spyOn(global, 'clearInterval')
      })

      it('should stop autoplay on last item', () => {
        const { result } = renderUseAutoplay({
          autoplay: true,
          rewind: false,
          gliderRef: { current: gliderMock },
          slidesToScroll: 1,
          autoplayDelay: 1000,
          currentSlide: 2,
          isOnLastSlide: true,
        })

        const [startAutoplay] = result.current

        act(() => {
          startAutoplay()
        })

        jest.runOnlyPendingTimers()

        expect(clearInterval).toHaveBeenCalledTimes(1)
      })
    })
    describe('when rewind is true', () => {
      it('should scroll to first item again', () => {
        const scrollItem = jest.fn()
        const { result } = renderUseAutoplay({
          autoplay: true,
          rewind: true,
          gliderRef: { current: { ...gliderMock, scrollItem } },
          slidesToScroll: 1,
          autoplayDelay: 1000,
          currentSlide: 2,
          isOnLastSlide: true,
        })

        const [startAutoplay] = result.current

        act(() => {
          startAutoplay()
        })

        jest.runOnlyPendingTimers()

        expect(scrollItem).toHaveBeenCalledTimes(1)
        expect(scrollItem).toHaveBeenCalledWith(0)
      })
    })

    it('scrolls to next item when delay passes', () => {
      const scrollItem = jest.fn()
      const { result } = renderUseAutoplay({
        autoplay: true,
        rewind: true,
        gliderRef: { current: { ...gliderMock, scrollItem } },
        slidesToScroll: 1,
        autoplayDelay: 1000,
        currentSlide: 0,
      })

      const [startAutoplay] = result.current

      act(() => {
        startAutoplay()
      })

      jest.advanceTimersByTime(1000)

      expect(scrollItem).toHaveBeenCalledTimes(1)
      expect(scrollItem).toHaveBeenCalledWith(1)
    })
  })
})
