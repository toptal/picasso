import { act, renderHook } from '@testing-library/react-hooks'

import useBoolean from './use-boolean'

describe('useBoolean', () => {
  it('sets state correctly', () => {
    const { result } = renderHook(() => useBoolean())
    const [, open, close, toggle] = result.current

    expect(result.current[0]).toBeFalsy()

    act(() => open())

    expect(result.current[0]).toBeTruthy()

    act(() => close())
    expect(result.current[0]).toBeFalsy()

    act(() => toggle())
    expect(result.current[0]).toBeTruthy()

    act(() => toggle())
    expect(result.current[0]).toBeFalsy()
  })
})
