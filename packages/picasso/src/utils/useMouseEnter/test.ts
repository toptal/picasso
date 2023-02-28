import { renderHook, act } from '@testing-library/react-hooks'

import useMouseEnter from './use-mouse-enter'

describe('useMouseOver', () => {
  describe('when mouse enters and leaves element', () => {
    it('should update isMouseOver state', () => {
      const ref = { current: document.createElement('div') }
      const { result } = renderHook(() => useMouseEnter(ref))

      expect(result.current).toBe(false)

      // Simulate mouse enter
      act(() => {
        ref.current.dispatchEvent(new MouseEvent('mouseenter'))
      })
      expect(result.current).toBe(true)

      // Simulate mouse leave
      act(() => {
        ref.current.dispatchEvent(new MouseEvent('mouseleave'))
      })
      expect(result.current).toBe(false)
    })
  })

  describe('when unmount is triggered', () => {
    it('should remove event listeners', () => {
      const ref = { current: document.createElement('div') }
      const { result, unmount } = renderHook(() => useMouseEnter(ref))

      expect(result.current).toBe(false)

      // Simulate mouse enter
      act(() => {
        ref.current.dispatchEvent(new MouseEvent('mouseenter'))
      })
      expect(result.current).toBe(true)

      // Unmount the hook
      unmount()

      // Simulate mouse leave
      act(() => {
        ref.current.dispatchEvent(new MouseEvent('mouseleave'))
      })
      // Expect isMouseOver to still be true, since event listeners should have been removed on unmount
      expect(result.current).toBe(true)
    })
  })
})
