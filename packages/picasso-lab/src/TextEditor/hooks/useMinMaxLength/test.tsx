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

  it('returns minLength message', () => {
    const ref = {
      current: ({ on: jest.fn(), off: jest.fn() } as unknown) as Quill
    }
    const minLength = 4

    const { result } = renderHook(() => useMinMaxLength({ ref, minLength }))

    const { message } = result.current

    expect(message).toEqual('4 characters required, current count is 4')
  })

  it('returns maxLength message', () => {
    const ref = {
      current: ({ on: jest.fn(), off: jest.fn() } as unknown) as Quill
    }
    const maxLength = 4

    const { result } = renderHook(() => useMinMaxLength({ ref, maxLength }))

    const { message } = result.current

    expect(message).toEqual('4 characters left')
  })
})
