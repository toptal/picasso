import { renderHook, act } from '@testing-library/react-hooks'

import useHighlightedIndex from './use-highlighted-index'

describe('useHighlightedIndex', () => {
  it('sets a highlighted index', () => {
    const { result } = renderHook(() =>
      useHighlightedIndex({ selectedIndexes: [1, 2, 3], isOpen: true })
    )

    expect(result.current[0]).toBe(0)
    act(() => {
      result.current[1](2)
    })
    expect(result.current[0]).toBe(2)
  })

  it('resets highlighted index when closed', () => {
    const { result, rerender } = renderHook(
      (isOpen: boolean) =>
        useHighlightedIndex({ selectedIndexes: [1, 2, 3], isOpen }),
      {
        initialProps: true
      }
    )

    expect(result.current[0]).toBe(0)
    act(() => {
      result.current[1](2)
    })
    expect(result.current[0]).toBe(2)

    rerender(false)
    expect(result.current[0]).toBe(0)
  })
})
