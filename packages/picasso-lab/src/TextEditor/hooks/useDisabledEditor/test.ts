import Quill from 'quill'
import { renderHook } from '@testing-library/react-hooks'

import useDisabledEditor from './useDisabledEditor'

describe('useDisabledEditor', () => {
  describe('when disabled is off', () => {
    it('does not disable the editor', () => {
      const disabled = false
      const ref = {
        current: ({
          enable: jest.fn()
        } as unknown) as Quill
      }

      renderHook(() => useDisabledEditor({ disabled, ref }))

      expect(ref.current.enable).not.toHaveBeenCalled()
    })
  })

  describe('when disabled is on', () => {
    it('disables the editor', () => {
      const ref = {
        current: ({
          enable: jest.fn()
        } as unknown) as Quill
      }

      const { rerender } = renderHook(
        ({ disabled }) => useDisabledEditor({ disabled, ref }),
        {
          initialProps: {
            disabled: true
          }
        }
      )

      expect(ref.current?.enable).toHaveBeenCalledWith(false)
      rerender({ disabled: false })
      expect(ref.current?.enable).toHaveBeenCalledWith(true)
      expect(ref.current?.enable).toHaveBeenCalledTimes(2)
    })
  })
})
