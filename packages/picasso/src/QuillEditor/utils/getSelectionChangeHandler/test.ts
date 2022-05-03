import { act } from '@toptal/picasso/test-utils'
import Quill, { RangeStatic, Sources } from 'quill'

import getSelectionChangeHandler from './getSelectionChangeHandler'

const mockRange: RangeStatic = { index: 0, length: 0 }

describe('getSelectionChangeHandler', () => {
  it('does nothing when silent event', () => {
    const onSelectionChange = jest.fn()
    const quill = {
      getFormat: jest.fn()
    } as unknown as Quill

    const handler = getSelectionChangeHandler(quill, onSelectionChange)

    act(() => handler(mockRange, mockRange, 'silent'))

    expect(onSelectionChange).not.toHaveBeenCalled()
  })

  it('does nothing when api event', () => {
    const onSelectionChange = jest.fn()
    const quill = {
      getFormat: jest.fn()
    } as unknown as Quill

    const handler = getSelectionChangeHandler(quill, onSelectionChange)

    act(() => handler(mockRange, mockRange, 'api'))

    expect(onSelectionChange).not.toHaveBeenCalled()
  })

  it('calls onSelectionChange with proper format when selection has been changed', () => {
    const onSelectionChange = jest.fn()
    const quill = {
      getFormat: jest.fn().mockImplementation(() => ({ bold: true }))
    } as unknown as Quill

    const handler = getSelectionChangeHandler(quill, onSelectionChange)

    act(() => handler(mockRange, mockRange, 'user'))

    expect(onSelectionChange).toHaveBeenCalledTimes(1)
    expect(onSelectionChange).toHaveBeenCalledWith({
      bold: true
    })
  })

  it('does not call onSelectionChange when clicking outside of editor', () => {
    const onSelectionChange = jest.fn()
    const quill = {
      getFormat: jest.fn()
    } as unknown as Quill

    const handler = getSelectionChangeHandler(quill, onSelectionChange) as (
      range: RangeStatic | null,
      oldRange: RangeStatic | null,
      sources: Sources
    ) => void

    act(() => handler(null, null, 'user'))

    expect(onSelectionChange).toHaveBeenCalledTimes(0)
  })
})
