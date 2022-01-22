import Quill from 'quill'
import { renderHook } from '@testing-library/react-hooks'

import useMinMaxLength from './useMinMaxLength'

describe('useMinMaxLength', () => {
  it('returns undefined messsage', () => {
    const ref = {
      current: ({ on: jest.fn(), off: jest.fn() } as unknown) as Quill
    }

    const { result } = renderHook(() => useMinMaxLength({ ref }))

    const { message } = result.current

    expect(message).toBeUndefined()
  })

  it('returns minlength message', () => {
    const ref = {
      current: ({ on: jest.fn(), off: jest.fn() } as unknown) as Quill
    }
    const minlength = 4

    const { result } = renderHook(() => useMinMaxLength({ ref, minlength }))

    const { message } = result.current

    expect(message).toEqual('4 characters required, current count is 4')
  })

  it('returns maxlength message', () => {
    const ref = {
      current: ({ on: jest.fn(), off: jest.fn() } as unknown) as Quill
    }
    const maxlength = 4

    const { result } = renderHook(() => useMinMaxLength({ ref, maxlength }))

    const { message } = result.current

    expect(message).toEqual('4 characters left')
  })
})
