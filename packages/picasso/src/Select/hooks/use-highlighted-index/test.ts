import { renderHook, act, RenderResult } from '@testing-library/react-hooks'

import { Option } from '../../types'
import useHighlightedIndex from './use-highlighted-index'

const OPTIONS = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' }
]

const DISABLED_OPTIONS = [
  { text: 'Belarus', value: 'BY', disabled: true },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU', disabled: true },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' }
]

const getHighlightIndex = (
  result: RenderResult<ReturnType<typeof useHighlightedIndex>>
) => result.current[0]

const setHighlightedIndex = (
  result: RenderResult<ReturnType<typeof useHighlightedIndex>>,
  index: number
) => result.current[1](index)

describe('useHighlightedIndex', () => {
  it('sets a highlighted index', () => {
    const { result } = renderHook(() =>
      useHighlightedIndex({
        options: OPTIONS,
        isOpen: true,
        selection: {
          isSelected: jest.fn().mockReturnValue(false),
          isOptionSelected: jest.fn().mockReturnValue(false),
          display: jest.fn()
        }
      })
    )

    expect(getHighlightIndex(result)).toBe(0)
    act(() => {
      setHighlightedIndex(result, 2)
    })
    expect(getHighlightIndex(result)).toBe(2)
  })

  it('sets highlighted index when closed', () => {
    const { result, rerender } = renderHook(
      (isOpen: boolean) =>
        useHighlightedIndex({
          options: OPTIONS,
          isOpen: isOpen,
          selection: {
            isSelected: jest.fn().mockReturnValue(true),
            isOptionSelected: jest
              .fn()
              .mockImplementation(
                (option: Option) => option.value === OPTIONS[2].value
              ),
            display: jest.fn()
          }
        }),
      {
        initialProps: true
      }
    )

    expect(getHighlightIndex(result)).toBe(2)
    act(() => {
      setHighlightedIndex(result, 4)
    })
    expect(getHighlightIndex(result)).toBe(4)

    rerender(false)
    expect(getHighlightIndex(result)).toBe(2)
  })

  it('resets highlighted index when closed and multiple values', () => {
    const isOptionSelected = jest
      .fn()
      .mockImplementation(
        (option: Option) =>
          option.value === OPTIONS[2].value || option.value === OPTIONS[3].value
      )

    const { result, rerender } = renderHook(
      (isOpen: boolean) =>
        useHighlightedIndex({
          options: OPTIONS,
          isOpen: isOpen,
          selection: {
            isSelected: jest.fn().mockReturnValue(true),
            isOptionSelected,
            display: jest.fn()
          }
        }),
      {
        initialProps: true
      }
    )

    expect(getHighlightIndex(result)).toBe(0)
    act(() => {
      setHighlightedIndex(result, 4)
    })
    expect(getHighlightIndex(result)).toBe(4)

    rerender(false)
    expect(getHighlightIndex(result)).toBe(0)
  })

  it("doesn't set highlighted index for a disabled option", () => {
    const { result, rerender } = renderHook(
      (isOpen: boolean) =>
        useHighlightedIndex({
          options: DISABLED_OPTIONS,
          isOpen: isOpen,
          selection: {
            isSelected: jest.fn().mockReturnValue(false),
            isOptionSelected: jest.fn().mockReturnValue(false),
            display: jest.fn()
          }
        }),
      {
        initialProps: true
      }
    )

    expect(getHighlightIndex(result)).toBe(1)

    act(() => {
      setHighlightedIndex(result, 2)
    })
    expect(getHighlightIndex(result)).toBe(1)

    act(() => {
      setHighlightedIndex(result, 4)
    })
    expect(getHighlightIndex(result)).toBe(4)

    rerender(false)
    expect(getHighlightIndex(result)).toBe(1)
  })
})
