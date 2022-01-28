import Quill, { RangeStatic, SelectionChangeHandler } from 'quill'
import { renderHook } from '@testing-library/react-hooks'

import useHasFocus from './useHasFocus'

const mockRange = { index: 0, length: 0 } as RangeStatic

describe('useHasFocus', () => {
  it('does nothing when event is triggered as silent', () => {
    const eventSource = 'silent'
    const quill = ({
      hasFocus: jest.fn().mockImplementation(() => true),
      on: jest
        .fn()
        .mockImplementation((name, fn) =>
          fn(mockRange, mockRange, eventSource)
        ),
      off: jest.fn()
    } as unknown) as Quill

    const { result } = renderHook(() => useHasFocus({ quill }))

    expect(quill.hasFocus).not.toHaveBeenCalled()
    expect(result.current.hasFocus).toBe(false)
  })

  it('sets hasFocus state', () => {
    const eventSource = 'user'
    const quill = ({
      hasFocus: jest.fn().mockImplementation(() => true),
      on: jest
        .fn()
        .mockImplementation(
          (name: 'selection-change', fn: SelectionChangeHandler) =>
            fn(mockRange, mockRange, eventSource)
        ),
      off: jest.fn()
    } as unknown) as Quill

    const { result } = renderHook(() => useHasFocus({ quill }))

    expect(quill.hasFocus).toHaveBeenCalled()
    expect(result.current.hasFocus).toBe(true)
  })
})
