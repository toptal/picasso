import { act } from '@toptal/picasso/test-utils'
import Quill from 'quill'
// eslint-disable-next-line import/no-extraneous-dependencies
import Delta from 'quill-delta'

import getTextChangeHandler from './getTextChangeHandler'

const mockDelta = new Delta()

describe('getTextChangeHandler', () => {
  it('does nothing when silent event', () => {
    const quill = {
      root: {
        innerHTML: '<p class="foo">bar</p>',
      },
    } as unknown as Quill
    const handleTextChange = jest.fn()
    const handler = getTextChangeHandler(quill, handleTextChange)

    act(() => handler(mockDelta, mockDelta, 'silent'))

    expect(handleTextChange).not.toHaveBeenCalled()
  })

  it('returns cleaned html', () => {
    const quill = {
      root: {
        innerHTML: '<p class="foo">bar</p>',
      },
      getLength: jest.fn(() => 4),
    } as unknown as Quill
    const handleTextChange = jest.fn()
    const handler = getTextChangeHandler(quill, handleTextChange)

    act(() => handler(mockDelta, mockDelta, 'user'))

    expect(handleTextChange).toHaveBeenCalledWith('<p>bar</p>')
    expect(handleTextChange).toHaveBeenCalledTimes(1)
  })

  describe('when content is removed', () => {
    it('returns empty string', () => {
      const quill = {
        root: {
          innerHTML: '<p><br></p>',
        },
        getLength: jest.fn(() => 1),
      } as unknown as Quill
      const handleTextChange = jest.fn()
      const handler = getTextChangeHandler(quill, handleTextChange)

      act(() => handler(mockDelta, mockDelta, 'user'))

      expect(handleTextChange).toHaveBeenCalledWith('')
      expect(handleTextChange).toHaveBeenCalledTimes(1)
    })
  })
})
