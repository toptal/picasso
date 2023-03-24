import quillDecodeIndent from './quillDecodeIndent'

describe('quillDecodeIndent', () => {
  describe('when input is null or empty', () => {
    it('should return an empty string', () => {
      expect(quillDecodeIndent('')).toBe('')
    })
  })

  it('should correctly process unordered lists', () => {
    const input =
      '<ul><li>item 1</li><li class="ql-indent-1">item 1.1</li><li>item 2</li></ul>'
    const expectedOutput =
      '<ul><li>item 1<ul><li class="">item 1.1</li></ul></li><li>item 2</li></ul>'

    expect(quillDecodeIndent(input)).toBe(expectedOutput)
  })

  it('should correctly process ordered lists', () => {
    const input =
      '<ol><li>item 1</li><li class="ql-indent-1">item 1.1</li><li>item 2</li></ol>'
    const expectedOutput =
      '<ol><li>item 1<ol><li class="">item 1.1</li></ol></li><li>item 2</li></ol>'

    expect(quillDecodeIndent(input)).toBe(expectedOutput)
  })

  it('should correctly process non-list elements', () => {
    const input = '<p>Some text here</p>'
    const expectedOutput = '<p>Some text here</p>'

    const input2 =
      '<p>Some text here</p><ul><li>item 1</li><li class="ql-indent-1">item 1.1</li></ul><p>Some more text here</p><ol><li>item 2</li><li class="ql-indent-1">item 2.1</li></ol><p>Even more text here</p>'
    const expectedOutput2 =
      '<p>Some text here</p><ul><li>item 1<ul><li class="">item 1.1</li></ul></li></ul><p>Some more text here</p><ol><li>item 2<ol><li class="">item 2.1</li></ol></li></ol><p>Even more text here</p>'

    expect(quillDecodeIndent(input)).toBe(expectedOutput)
    expect(quillDecodeIndent(input2)).toBe(expectedOutput2)
  })
})
