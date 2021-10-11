import { renderHook, act } from '@testing-library/react-hooks'

import useHighlightedIndex from './use-highlighted-index'

describe('useHighlightedIndex', () => {
  describe('when all indexes are enabled', () => {
    it('sets a highlighted index', () => {
      const { result } = renderHook(() =>
        useHighlightedIndex({
          selectedIndexes: [1, 2, 3],
          isOpen: true,
          indexes: [0, 1, 2, 3]
        })
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
          useHighlightedIndex({
            selectedIndexes: [1, 2, 3],
            isOpen,
            indexes: [0, 1, 2, 3]
          }),
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

  describe('when no enabled indexes', () => {
    it('sets highlighted index as null', () => {
      const { result } = renderHook(() =>
        useHighlightedIndex({
          selectedIndexes: [],
          isOpen: true,
          indexes: []
        })
      )

      expect(result.current[0]).toBeNull()
    })
  })

  describe('when first index is not enabled', () => {
    it('should return the first available index', () => {
      const { result, rerender } = renderHook(
        (isOpen: boolean) =>
          useHighlightedIndex({
            selectedIndexes: [2, 3, 4],
            isOpen,
            indexes: [1, 2, 3, 4]
          }),
        {
          initialProps: true
        }
      )

      expect(result.current[0]).toBe(1)
      act(() => {
        result.current[1](4)
      })
      expect(result.current[0]).toBe(4)

      rerender(false)
      expect(result.current[0]).toBe(1)
    })
  })

  describe('when the last index enabled only', () => {
    it('should return the last index', () => {
      const { result, rerender } = renderHook(
        (isOpen: boolean) =>
          useHighlightedIndex({
            selectedIndexes: [2, 3, 4],
            isOpen,
            indexes: [4]
          }),
        {
          initialProps: true
        }
      )

      expect(result.current[0]).toBe(4)
      act(() => {
        result.current[1](4)
      })
      expect(result.current[0]).toBe(4)

      rerender(false)
      expect(result.current[0]).toBe(4)
    })
  })
})
