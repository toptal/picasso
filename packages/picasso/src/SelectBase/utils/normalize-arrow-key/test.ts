import type { KeyboardEvent } from 'react'

import normalizeArrowKey from './normalize-arrow-key'

const getKeyboardEvent = (key: string, keyCode: number) =>
  ({ key, keyCode } as KeyboardEvent<HTMLInputElement>)

describe('normalizeArrowKey', () => {
  it('normalizes correctly', () => {
    expect(normalizeArrowKey(getKeyboardEvent('Test', 37))).toBe('ArrowTest')
    expect(normalizeArrowKey(getKeyboardEvent('Test', 38))).toBe('ArrowTest')
    expect(normalizeArrowKey(getKeyboardEvent('Test', 39))).toBe('ArrowTest')
    expect(normalizeArrowKey(getKeyboardEvent('Test', 40))).toBe('ArrowTest')

    expect(normalizeArrowKey(getKeyboardEvent('ArrowLeft', 37))).toBe(
      'ArrowLeft'
    )

    expect(normalizeArrowKey(getKeyboardEvent('Other', 127))).toBe('Other')
  })
})
