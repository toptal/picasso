import Quill from 'quill'
import { renderHook } from '@testing-library/react-hooks'

import useDisabledEditor from './useDisabledEditor'

describe('useDisabledEditor', () => {
  describe('when disabled is off', () => {
    it('does not disable the editor', () => {
      const disabled = false
      const quill = ({
        enable: jest.fn()
      } as unknown) as Quill

      renderHook(() => useDisabledEditor({ disabled, quill }))

      expect(quill.enable).not.toHaveBeenCalled()
    })
  })

  describe('when disabled is on', () => {
    it('disables the editor', () => {
      const quill = ({
        enable: jest.fn()
      } as unknown) as Quill

      const { rerender } = renderHook(
        ({ disabled }) => useDisabledEditor({ disabled, quill }),
        {
          initialProps: {
            disabled: true
          }
        }
      )

      expect(quill.enable).toHaveBeenCalledWith(false)
      rerender({ disabled: false })
      expect(quill.enable).toHaveBeenCalledWith(true)
      expect(quill.enable).toHaveBeenCalledTimes(2)
    })
  })
})
