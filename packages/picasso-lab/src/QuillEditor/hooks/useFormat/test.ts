import { renderHook } from '@testing-library/react-hooks'
import Quill from 'quill'

import useFormat from './useFormat'
import { FormatType } from '../../types'

const mockQuill = ({
  format: jest.fn()
} as unknown) as Quill

const defaultFormat: FormatType = {
  header: '',
  bold: false,
  italic: false,
  list: false
}

describe('useFormat', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('formats on first render', () => {
    const quill = mockQuill

    const { rerender } = renderHook(
      ({ format }: { format: FormatType }) => useFormat({ quill, format }),
      {
        initialProps: {
          format: defaultFormat
        }
      }
    )

    expect(quill.format).toHaveBeenCalledTimes(4)
    rerender()
    expect(quill.format).toHaveBeenCalledTimes(4)
  })

  it('formats only changed properties', () => {
    const quill = mockQuill

    const { rerender } = renderHook(
      ({ format }: { format: FormatType }) => useFormat({ quill, format }),
      {
        initialProps: {
          format: defaultFormat
        }
      }
    )

    expect(quill.format).toHaveBeenCalledTimes(4) // first render
    rerender({ format: { ...defaultFormat, bold: true } })
    expect(quill.format).toHaveBeenCalledTimes(5)
  })

  it('formats bold correctly', () => {
    const quill = mockQuill

    const { rerender } = renderHook(
      ({ format }: { format: FormatType }) => useFormat({ quill, format }),
      {
        initialProps: {
          format: defaultFormat
        }
      }
    )

    expect(quill.format).toHaveBeenCalledWith('bold', false)
    expect(quill.format).not.toHaveBeenCalledWith('bold', true)
    rerender({ format: { ...defaultFormat, bold: true } })
    expect(quill.format).toHaveBeenCalledWith('bold', true)
  })
  it('formats italic correctly', () => {
    const quill = mockQuill

    const { rerender } = renderHook(
      ({ format }: { format: FormatType }) => useFormat({ quill, format }),
      {
        initialProps: {
          format: defaultFormat
        }
      }
    )

    expect(quill.format).toHaveBeenCalledWith('italic', false)
    expect(quill.format).not.toHaveBeenCalledWith('italic', true)
    rerender({ format: { ...defaultFormat, italic: true } })
    expect(quill.format).toHaveBeenCalledWith('italic', true)
  })
  it('formats list correctly', () => {
    const quill = mockQuill

    const { rerender } = renderHook(
      ({ format }: { format: FormatType }) => useFormat({ quill, format }),
      {
        initialProps: {
          format: defaultFormat
        }
      }
    )

    expect(quill.format).toHaveBeenCalledWith('list', false)
    expect(quill.format).not.toHaveBeenCalledWith('list', 'bullet')
    expect(quill.format).not.toHaveBeenCalledWith('list', 'ordered')
    rerender({ format: { ...defaultFormat, list: 'ordered' } })
    expect(quill.format).toHaveBeenCalledWith('list', 'ordered')
    rerender({ format: { ...defaultFormat, list: 'bullet' } })
    expect(quill.format).toHaveBeenCalledWith('list', 'bullet')
    expect(quill.format).toHaveBeenCalledTimes(6)
  })
  it('formats header correctly', () => {
    const quill = mockQuill

    const { rerender } = renderHook(
      ({ format }: { format: FormatType }) => useFormat({ quill, format }),
      {
        initialProps: {
          format: defaultFormat
        }
      }
    )

    expect(quill.format).toHaveBeenCalledWith('header', false)
    rerender({ format: { ...defaultFormat, header: '3' } })
    expect(quill.format).toHaveBeenCalledWith('header', 3)
    expect(quill.format).toHaveBeenCalledTimes(5)
  })
})
