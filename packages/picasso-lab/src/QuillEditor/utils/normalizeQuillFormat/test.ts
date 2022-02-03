import normalizeQuillFormat from './normalizeQuillFormat'
import { QuillFormatType } from './../../types'

const normalizedFormat = {
  bold: false,
  header: '',
  italic: false,
  list: false
}

describe('normalizeQuillFormat', () => {
  it('returns default format when quill format is empty', () => {
    const quillFormat: QuillFormatType = {}

    const result = normalizeQuillFormat(quillFormat)

    expect(result).toEqual(normalizedFormat)
  })
  it('transforms header value correctly', () => {
    const quillFormat: QuillFormatType = { header: 3 }

    const result = normalizeQuillFormat(quillFormat)

    expect(result).toEqual({ ...normalizedFormat, header: '3' })
  })
  it('returns correct values if set', () => {
    const quillFormat: QuillFormatType = {
      header: 3,
      bold: true,
      italic: true,
      list: 'bullet'
    }

    const result = normalizeQuillFormat(quillFormat)

    expect(result).toEqual({
      header: '3',
      bold: true,
      italic: true,
      list: 'bullet'
    })
  })
})
