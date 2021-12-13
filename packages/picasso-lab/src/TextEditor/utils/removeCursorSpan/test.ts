import removeCursorSpan from './removeCursorSpan'

describe('removeCursorSpan', () => {
  it('has nothing to replace', () => {
    const value = '<p><strong>foobar</strong></p>'
    const expectedOutput = '<p><strong>foobar</strong></p>'

    expect(removeCursorSpan(value)).toBe(expectedOutput)
  })
  it('replaces span wrapped in strong', () => {
    const value =
      '<p><strong>foobar</strong></p><p><strong><span class="ql-cursor">﻿</span></strong></p>'
    const expectedOutput = '<p><strong>foobar</strong></p><p><br></p>'

    expect(removeCursorSpan(value)).toBe(expectedOutput)
  })
  it('replaces span wrapped in em', () => {
    const value =
      '<p><em>foobar</em></p><p><em><span class="ql-cursor">﻿</span></em></p>'
    const expectedOutput = '<p><em>foobar</em></p><p><br></p>'

    expect(removeCursorSpan(value)).toBe(expectedOutput)
  })
  it('replaces span wrapped in strong and em', () => {
    const value =
      '<p><strong><em>foobar</em></strong></p><p><strong><em><span class="ql-cursor">﻿</span></em></strong></p>'
    const expectedOutput = '<p><strong><em>foobar</em></strong></p><p><br></p>'

    expect(removeCursorSpan(value)).toBe(expectedOutput)
  })
})
