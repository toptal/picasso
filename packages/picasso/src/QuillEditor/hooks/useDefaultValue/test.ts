import { renderHook } from '@testing-library/react-hooks'
import Quill from 'quill'
import Delta from 'quill-delta'

import useDefaultValue from './useDefaultValue'
const deltaMock = {
  ops: [
    { insert: 'Gandalf', attributes: { bold: true } },
    { insert: ' the ' },
    { insert: 'Grey', attributes: { italic: true } }
  ]
} as Delta
const quillMock = ({
  clipboard: {
    convert: jest.fn((): Delta => deltaMock)
  },
  setContents: jest.fn()
} as unknown) as Quill

describe('useDefaultValue', () => {
  it('does nothing without defaultValue', () => {
    const quill = quillMock
    const defaultValue = ''

    renderHook(() => useDefaultValue({ defaultValue, quill }))

    expect(quill.clipboard.convert).not.toHaveBeenCalled()
    expect(quill.setContents).not.toHaveBeenCalled()
  })
  it('does nothing without quill', () => {
    const quill = undefined
    const defaultValue = '<p>foobar</p>'

    const { result } = renderHook(() =>
      useDefaultValue({ defaultValue, quill })
    )

    expect(result.current).toBeUndefined()
  })
  it('sets to correct contents', () => {
    const quill = quillMock
    const defaultValue = '<p>foobar</p>'

    renderHook(() => useDefaultValue({ defaultValue, quill }))

    expect(quill.clipboard.convert).toHaveBeenCalledWith(defaultValue)
    expect(quill.clipboard.convert).toHaveBeenCalledTimes(1)
    expect(quill.setContents).toHaveBeenCalledWith(deltaMock, 'api')
    expect(quill.setContents).toHaveBeenCalledTimes(1)
  })
})
