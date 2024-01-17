import { act, renderHook } from '@testing-library/react-hooks'

import useCounter from './useCounter'
import { RichTextEditor } from '../../RichTextEditor'

const minLengthMessage = RichTextEditor.defaultProps?.minLengthMessage
const maxLengthMessage = RichTextEditor.defaultProps?.maxLengthMessage

describe('useCounter', () => {
  it('returns empty message when minLength and maxLength are undefined', () => {
    const hookOptions = {
      minLengthMessage,
      maxLengthMessage,
    }

    const { result } = renderHook(() => useCounter(hookOptions))

    const { counterMessage } = result.current

    expect(counterMessage).toBe('')
  })

  it('returns default message when only minLength is provided', () => {
    const hookOptions = {
      minLength: 4,
      minLengthMessage,
    }

    const { result } = renderHook(() => useCounter(hookOptions))

    const { counterMessage } = result.current

    expect(counterMessage).toContain('4')
  })

  it('returns default message when only maxLength is provided', () => {
    const hookOptions = {
      maxLength: 4,
      maxLengthMessage,
    }

    const { result } = renderHook(() => useCounter(hookOptions))

    const { counterMessage } = result.current

    expect(counterMessage).toContain('4')
  })

  it('returns custom minLength message when minLengthMessage is provided', () => {
    const hookOptions = {
      minLength: 4,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      minLengthMessage: (_minLength: number, _currLength: number) =>
        'custom message',
    }

    const { result } = renderHook(() => useCounter(hookOptions))

    const { counterMessage } = result.current

    expect(counterMessage).toBe('custom message')
  })

  it('returns custom maxLength message when maxLengthMessage is provided', () => {
    const hookOptions = {
      maxLength: 8,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      maxLengthMessage: () => 'custom message',
    }

    const { result } = renderHook(() => useCounter(hookOptions))

    const { counterMessage } = result.current

    expect(counterMessage).toBe('custom message')
  })

  it('returns respective message when both minLength and maxLength are provided', () => {
    const hookOptions = {
      minLength: 4,
      maxLength: 8,
      minLengthMessage: jest.fn(),
      maxLengthMessage: jest.fn(),
    }

    const { result } = renderHook(() => useCounter(hookOptions))

    const { handleCounterMessage } = result.current

    expect(hookOptions.minLengthMessage).toHaveBeenCalledTimes(1)

    act(() => handleCounterMessage(6))

    expect(hookOptions.maxLengthMessage).toHaveBeenCalledTimes(1)
  })
})
