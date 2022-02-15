import { act } from '@toptal/picasso/test-utils'
import Quill from 'quill'
import Delta from 'quill-delta'

import getTextLengthChangeHandler from './getTextLengthChangeHandler'

describe('getTextLengthChangeHandler', () => {
  it('calls onTextLengthChange when current length of the text does not exceed the maxLength limit', () => {
    const onTextLengthChange = jest.fn()
    const maxLength = 10
    const currLength = 4
    const quill = ({
      getLength: jest.fn().mockImplementation(() => currLength)
    } as unknown) as Quill

    const handler = getTextLengthChangeHandler({
      quill,
      maxLength,
      onTextLengthChange
    })

    const delta = new Delta()

    act(() => handler(delta, delta, 'silent'))

    expect(onTextLengthChange).toHaveBeenCalledTimes(1)
  })

  it('does not call onTextLengthChange when current length reaches the maxLength limit', () => {
    const onTextLengthChange = jest.fn()
    const maxLength = 10
    const currLength = 12
    const quill = ({
      getLength: jest.fn().mockImplementation(() => currLength),
      getSelection: jest.fn(),
      setContents: jest.fn()
    } as unknown) as Quill

    const handler = getTextLengthChangeHandler({
      quill,
      maxLength,
      onTextLengthChange
    })

    const delta = new Delta()

    act(() => handler(delta, delta, 'silent'))

    expect(onTextLengthChange).not.toHaveBeenCalled()
  })
})
