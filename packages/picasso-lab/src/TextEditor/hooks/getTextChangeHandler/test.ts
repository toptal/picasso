import Quill from 'quill'
import Delta from 'quill-delta'

import getTextChangeHandler from '.'

const mockDelta = {} as Delta

describe('getTextChangeHandler', () => {
  it('returns early without quill', () => {
    const onChange = jest.fn()
    const ref = { current: undefined }
    const handler = getTextChangeHandler({ ref, onChange })

    handler(mockDelta, mockDelta, 'user')

    expect(onChange).not.toHaveBeenCalled()
  })

  it('calls onChange callback', () => {
    const onChange = jest.fn()
    const ref = {
      current: {
        root: {
          innerHTML: '<p>foobar</p>'
        }
      } as Quill
    }
    const handler = getTextChangeHandler({ ref, onChange })

    handler(mockDelta, mockDelta, 'user')

    expect(onChange).toHaveBeenCalledWith('<p>foobar</p>')
  })
})
