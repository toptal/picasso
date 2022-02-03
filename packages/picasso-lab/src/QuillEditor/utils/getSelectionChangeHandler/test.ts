import { act } from '@toptal/picasso/test-utils'
import Quill, { RangeStatic, Sources } from 'quill'

import getSelectionChangeHandler from './getSelectionChangeHandler'

const mockRange: RangeStatic = { index: 0, length: 0 }
const defaultFormat = {
  bold: false,
  italic: false,
  header: '',
  list: false
}

describe('getSelectionChangeHandler', () => {
  it('does nothing when silent event', () => {
    const handleFormatChange = jest.fn()
    const quill = ({
      getFormat: jest.fn()
    } as unknown) as Quill

    const handler = getSelectionChangeHandler(quill, handleFormatChange)

    act(() => handler(mockRange, mockRange, 'silent'))

    expect(handleFormatChange).not.toHaveBeenCalled()
  })

  it('calls handleFormatChange with proper format when editor is focused', () => {
    const handleFormatChange = jest.fn()
    const quill = ({
      getFormat: jest.fn().mockImplementation(() => ({ bold: true }))
    } as unknown) as Quill

    const handler = getSelectionChangeHandler(quill, handleFormatChange)

    act(() => handler(mockRange, mockRange, 'user'))

    expect(handleFormatChange).toHaveBeenCalledTimes(1)
    expect(handleFormatChange).toHaveBeenCalledWith({
      ...defaultFormat,
      bold: true
    })
  })

  it('calls handleFormatChange with default format when clicking outside of editor', () => {
    const handleFormatChange = jest.fn()
    const quill = ({
      getFormat: jest.fn()
    } as unknown) as Quill

    const handler = getSelectionChangeHandler(quill, handleFormatChange) as (
      range: RangeStatic | null,
      oldRange: RangeStatic | null,
      sources: Sources
    ) => void

    act(() => handler(null, null, 'user'))

    expect(handleFormatChange).toHaveBeenCalledTimes(1)
    expect(handleFormatChange).toHaveBeenCalledWith(defaultFormat)
  })
})
