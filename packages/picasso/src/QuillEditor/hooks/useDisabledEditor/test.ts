import Quill from 'quill'
import { renderHook } from '@testing-library/react-hooks'

import useDisabledEditor from './useDisabledEditor'

describe('useDisabledEditor', () => {
  describe('when disabled is false', () => {
    it('does not disable the editor', () => {
      const disabled = false
      const quill = ({
        enable: jest.fn()
      } as unknown) as Quill

      renderHook(() => useDisabledEditor({ disabled, quill }))

      expect(quill.enable).toHaveBeenCalledWith(true)
    })
  })

  describe('when disabled is true', () => {
    it('does disable the editor', () => {
      const disabled = true
      const quill = ({
        enable: jest.fn()
      } as unknown) as Quill

      renderHook(() => useDisabledEditor({ disabled, quill }))

      expect(quill.enable).toHaveBeenCalledWith(false)
    })
  })
})
