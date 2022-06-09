import { renderHook } from '@testing-library/react-hooks'

import useFormInputReset from './use-form-input-reset'

describe('useFormInputReset', () => {
  it('returns undefined when no reset button', () => {
    const enableReset = false

    const { result } = renderHook(() =>
      useFormInputReset({
        input: {} as never,
        enableReset,
      })
    )

    expect(result.current).toBeUndefined()
  })

  it('returns a default event handler when no special callback is sent', () => {
    const enableReset = true
    const onResetClick = undefined
    const input = {
      onChange: jest.fn(),
    }

    const { result } = renderHook(() =>
      useFormInputReset({
        input: input as never,
        enableReset,
        onResetClick,
      })
    )

    expect(result.current).toBeDefined()

    const callback = result.current

    if (callback) {
      callback()
    }

    expect(input.onChange).toHaveBeenCalledWith('')
  })

  it('wraps the passed reset click handler if exists', () => {
    const enableReset = true
    const resetValue = 'reset-value'
    const onResetClick = jest.fn(callback => callback(resetValue))
    const input = {
      onChange: jest.fn(),
    }

    const { result } = renderHook(() =>
      useFormInputReset({
        input: input as never,
        enableReset,
        onResetClick,
      })
    )

    expect(result.current).toBeDefined()

    const callback = result.current

    if (callback) {
      callback()
    }

    expect(onResetClick).toHaveBeenCalled()
    expect(input.onChange).toHaveBeenCalledWith(resetValue)
  })
})
