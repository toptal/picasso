import { KeyboardEvent } from 'react'

import normalizeArrowKey from './normalize-arrow-key'

const getKeyboardEvent = (key: string, keyCode: number) =>
  ({ key, keyCode } as KeyboardEvent<HTMLInputElement>)

describe('normalizeArrowKey', () => {
  it('normalizes correctly', () => {
    expect(normalizeArrowKey(getKeyboardEvent('Test', 37))).toEqual('ArrowTest')
    expect(normalizeArrowKey(getKeyboardEvent('Test', 38))).toEqual('ArrowTest')
    expect(normalizeArrowKey(getKeyboardEvent('Test', 39))).toEqual('ArrowTest')
    expect(normalizeArrowKey(getKeyboardEvent('Test', 40))).toEqual('ArrowTest')

    expect(normalizeArrowKey(getKeyboardEvent('ArrowLeft', 37))).toEqual(
      'ArrowLeft'
    )

    expect(normalizeArrowKey(getKeyboardEvent('Other', 127))).toEqual('Other')
  })
})
