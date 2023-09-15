import { act, renderHook } from '@testing-library/react-hooks'

import useHandleTouched from './use-handle-touched'

describe('useHandleTouched', () => {
  describe('when submit button is clicked', () => {
    it('sets touched to true', () => {
      const { result } = renderHook(() =>
        useHandleTouched({
          submitButtonClicked: true,
        })
      )

      expect(result.current.touched).toBe(true)
    })
  })

  describe('when submit button is not clicked', () => {
    it('sets touched to false', () => {
      const { result } = renderHook(() =>
        useHandleTouched({
          submitButtonClicked: false,
        })
      )

      expect(result.current.touched).toBe(false)
    })
  })

  describe('when handleTouched is called', () => {
    it('sets touched to true', () => {
      const { result } = renderHook(() =>
        useHandleTouched({
          submitButtonClicked: false,
        })
      )

      act(() => result.current.handleTouched())

      expect(result.current.touched).toBe(true)
    })
  })

  describe('when handleTouched is called with false', () => {
    it('sets touched to false', () => {
      const { result } = renderHook(() =>
        useHandleTouched({
          submitButtonClicked: false,
        })
      )

      act(() => result.current.handleTouched(false))

      expect(result.current.touched).toBe(false)
    })
  })
})
