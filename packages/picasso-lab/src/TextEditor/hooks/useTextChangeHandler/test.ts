import { renderHook } from '@testing-library/react-hooks'
import Quill from 'quill'
import Delta from 'quill-delta'

import useTextChangeHandler from '.'

const mockDelta = {} as Delta

describe('useTextChangeHandler', () => {
  it('returns early without quill', () => {
    const onChange = jest.fn()
    const ref = { current: undefined }

    renderHook(() => useTextChangeHandler({ ref, onChange }))

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

    const { result } = renderHook(() => useTextChangeHandler({ ref, onChange }))

    result.current.textChangeHandler(mockDelta, mockDelta, 'user')

    expect(onChange).toHaveBeenCalled()
  })
})
