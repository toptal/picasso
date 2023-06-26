import { act } from '@toptal/picasso/test-utils'
import type Quill from 'quill'
// eslint-disable-next-line import/no-extraneous-dependencies
import Delta from 'quill-delta'

import getTextLengthChangeHandler from './getTextLengthChangeHandler'

describe('getTextLengthChangeHandler', () => {
  it('simply calls onTextLengthChange', () => {
    const onTextLengthChange = jest.fn()
    const currLength = 4
    const quill = {
      getLength: jest.fn().mockImplementation(() => currLength),
    } as unknown as Quill

    const handler = getTextLengthChangeHandler(quill, onTextLengthChange)

    const delta = new Delta()

    act(() => handler(delta, delta, 'silent'))

    expect(onTextLengthChange).toHaveBeenCalledTimes(1)
    expect(onTextLengthChange).toHaveBeenCalledWith(currLength - 1)
  })
})
