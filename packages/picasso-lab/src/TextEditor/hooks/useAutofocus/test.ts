import Quill from 'quill'
import { renderHook } from '@testing-library/react-hooks'

import useAutofocus from './useAutofocus'

describe('useAutofocus', () => {
  describe('when autofocus is off', () => {
    it('does not focus quill', () => {
      const autofocus = false
      const quill = ({
        focus: jest.fn()
      } as unknown) as Quill

      renderHook(() => useAutofocus({ quill, autofocus }))

      expect(quill.focus).not.toHaveBeenCalled()
    })
  })

  describe('when autofocus is on', () => {
    it('does focus editor', () => {
      const autofocus = true
      const quill = ({
        focus: jest.fn()
      } as unknown) as Quill

      const { rerender } = renderHook(() => useAutofocus({ quill, autofocus }))

      rerender()

      expect(quill.focus).toHaveBeenCalledTimes(1)
    })
  })
})
