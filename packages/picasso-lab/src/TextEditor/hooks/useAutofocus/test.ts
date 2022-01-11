import { renderHook } from '@testing-library/react-hooks'

import useAutofocus from './useAutofocus'

describe('useAutofocus', () => {
  describe('when autofocus is off', () => {
    it('does not focus quill', () => {
      const autofocus = false
      const ref = {
        current: {
          focus: jest.fn()
        }
      }

      renderHook(() => useAutofocus({ ref, autofocus }))

      expect(ref.current.focus).not.toHaveBeenCalled()
    })
  })

  describe('when autofocus is on', () => {
    it('does focus editor', () => {
      const autofocus = true
      const ref = {
        current: {
          focus: jest.fn()
        }
      }

      const { rerender } = renderHook(() => useAutofocus({ ref, autofocus }))

      rerender()

      expect(ref.current.focus).toHaveBeenCalledTimes(1)
    })
  })
})
