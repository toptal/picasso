import type { DeltaStatic } from 'quill'
import type Quill from 'quill'
import { renderHook } from '@testing-library/react-hooks'
// eslint-disable-next-line import/no-extraneous-dependencies
import Delta from 'quill-delta'

import useDisabledEditor from './useDisabledEditor'
import useDefaultValue from '../useDefaultValue'

describe('useDisabledEditor', () => {
  describe('when disabled is false', () => {
    it('does not disable the editor', () => {
      const disabled = false
      const quill = {
        enable: jest.fn(),
      } as unknown as Quill

      renderHook(() => useDisabledEditor({ disabled, quill }))

      expect(quill.enable).toHaveBeenCalledWith(true)
    })
  })

  describe('when disabled is true', () => {
    it('does disable the editor', () => {
      const disabled = true
      const quill = {
        enable: jest.fn(),
      } as unknown as Quill

      renderHook(() => useDisabledEditor({ disabled, quill }))

      expect(quill.enable).toHaveBeenCalledWith(false)
    })
  })

  describe('when disabled is true and has a default value', () => {
    let quillMock: Quill
    let deltaMock: DeltaStatic

    beforeEach(() => {
      deltaMock = new Delta()
        .insert('Gandalf', { bold: true })
        .insert('the ')
        .insert('Grey', { italic: true })

      quillMock = {
        clipboard: {
          convert: jest.fn((): DeltaStatic => deltaMock),
        },
        setContents: jest.fn(),
        enable: jest.fn(),
      } as unknown as Quill
    })

    it('does disable the editor', () => {
      const disabled = true

      const quill = quillMock
      const defaultValue = '<p>foobar</p>'

      const { rerender } = renderHook(() => {
        useDefaultValue({ defaultValue, quill })
        useDisabledEditor({ disabled, quill })
      })

      expect(quill.clipboard.convert).toHaveBeenCalledWith(defaultValue)
      expect(quill.clipboard.convert).toHaveBeenCalledTimes(1)
      expect(quill.setContents).toHaveBeenCalledWith(deltaMock, 'api')
      expect(quill.setContents).toHaveBeenCalledTimes(1)
      rerender()
      expect(quill.clipboard.convert).toHaveBeenCalledTimes(1)
      expect(quill.setContents).toHaveBeenCalledTimes(1)
      expect(quill.enable).toHaveBeenCalledWith(false)
    })
  })
})
