import Quill from 'quill'
import { renderHook } from '@testing-library/react-hooks'

import useFocus from './useFocus'

describe('useFocus', () => {
  describe('when isFocused is off', () => {
    it('does not focus quill', () => {
      const isFocused = false
      const quill = {
        focus: jest.fn()
      } as unknown as Quill

      renderHook(() => useFocus({ quill, isFocused }))

      expect(quill.focus).not.toHaveBeenCalled()
    })
  })

  describe('when isFocused is on', () => {
    it('does focus editor', () => {
      const isFocused = true
      const quill = {
        focus: jest.fn()
      } as unknown as Quill

      const { rerender } = renderHook(() => useFocus({ quill, isFocused }))

      rerender()

      expect(quill.focus).toHaveBeenCalledTimes(1)
    })
  })
})
