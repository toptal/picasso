import { act } from '@toptal/picasso/test-utils'
import Quill from 'quill'
import Delta from 'quill-delta'

import getTextChangeHandler from './getTextChangeHandler'

const mockDelta = {} as Delta

describe('getTextChangeHandler', () => {
  it('does nothing when silent event', () => {
    const quill = ({
      root: {
        innerHTML: '<p class="foo">bar</p>'
      }
    } as unknown) as Quill
    const handleTextChange = jest.fn()
    const handler = getTextChangeHandler(quill, handleTextChange)

    act(() => handler(mockDelta, mockDelta, 'silent'))

    expect(handleTextChange).not.toHaveBeenCalled()
  })

  it('returns cleaned html', () => {
    const quill = ({
      root: {
        innerHTML: '<p class="foo">bar</p>'
      }
    } as unknown) as Quill
    const handleTextChange = jest.fn()
    const handler = getTextChangeHandler(quill, handleTextChange)

    act(() => handler(mockDelta, mockDelta, 'user'))

    expect(handleTextChange).toHaveBeenCalledWith('<p>bar</p>')
    expect(handleTextChange).toHaveBeenCalledTimes(1)
  })
})
