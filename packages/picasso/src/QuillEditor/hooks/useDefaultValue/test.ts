import { renderHook } from '@testing-library/react-hooks'
import Quill, { DeltaStatic } from 'quill'
// eslint-disable-next-line import/no-extraneous-dependencies
import Delta from 'quill-delta'

import useDefaultValue from './useDefaultValue'

describe('useDefaultValue', () => {
  let deltaMock: DeltaStatic
  let quillMock: Quill

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
    } as unknown as Quill
  })

  it('does nothing without defaultValue', () => {
    const quill = quillMock
    const defaultValue = ''

    renderHook(() => useDefaultValue({ defaultValue, quill }))

    expect(quill.clipboard.convert).not.toHaveBeenCalled()
    expect(quill.setContents).not.toHaveBeenCalled()
  })
  it('sets to correct contents', () => {
    const quill = quillMock
    const defaultValue = '<p>foobar</p>'

    const { rerender } = renderHook(() =>
      useDefaultValue({ defaultValue, quill })
    )

    expect(quill.clipboard.convert).toHaveBeenCalledWith(defaultValue)
    expect(quill.clipboard.convert).toHaveBeenCalledTimes(1)
    expect(quill.setContents).toHaveBeenCalledWith(deltaMock, 'api')
    expect(quill.setContents).toHaveBeenCalledTimes(1)
    rerender()
    expect(quill.clipboard.convert).toHaveBeenCalledTimes(1)
    expect(quill.setContents).toHaveBeenCalledTimes(1)
  })
})
