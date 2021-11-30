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

const disableOptions = (options: Option[], indicies: number[]) =>
  options.map((option, index) =>
    indicies.includes(index) ? { ...option, disabled: true } : option
  )

const getHighlightIndex = (
  result: RenderResult<ReturnType<typeof useHighlightedIndex>>
) => result.current[0]

const setHighlightedIndex = (
  result: RenderResult<ReturnType<typeof useHighlightedIndex>>,
  index: number
) => result.current[1](index)

const renderUseHighlightedIndex = ({
  options,
  selectedOptions = []
}: {
  options: Option[]
  selectedOptions?: Option[]
}) =>
  renderHook(
    ({ isOpen }: { isOpen: boolean }) =>
      useHighlightedIndex({
        flatOptions: options,
        isOpen: isOpen,
        selection: {
          isSelected: () => selectedOptions.length > 0,
          isOptionSelected: (option: Option) =>
            selectedOptions?.some(
              selectedOption => selectedOption.value === option.value
            ),
          display: () => ''
        }
      }),
    {
      initialProps: { isOpen: true }
    }
  )

describe('useHighlightedIndex', () => {
  it('sets a highlighted index', () => {
    const { result } = renderUseHighlightedIndex({ options: OPTIONS })

    expect(getHighlightIndex(result)).toBe(0)
    act(() => {
      setHighlightedIndex(result, 2)
    })
    expect(getHighlightIndex(result)).toBe(2)
  })

  it('sets highlighted index when closed', () => {
    const SELECTED_OPTION_INDEX = 2

    const { result, rerender } = renderUseHighlightedIndex({
      options: OPTIONS,
      selectedOptions: [OPTIONS[SELECTED_OPTION_INDEX]]
    })

    expect(getHighlightIndex(result)).toBe(SELECTED_OPTION_INDEX)

    act(() => {
      setHighlightedIndex(result, 4)
    })
    expect(getHighlightIndex(result)).toBe(4)

    rerender({ isOpen: false })
    expect(getHighlightIndex(result)).toBe(SELECTED_OPTION_INDEX)
  })

  it('resets highlighted index when closed and multiple values', () => {
    const { result, rerender } = renderUseHighlightedIndex({
      options: OPTIONS,
      selectedOptions: [OPTIONS[2], OPTIONS[3]]
    })

    expect(getHighlightIndex(result)).toBe(0)

    act(() => {
      setHighlightedIndex(result, 4)
    })
    expect(getHighlightIndex(result)).toBe(4)

    rerender({ isOpen: false })
    expect(getHighlightIndex(result)).toBe(0)
  })

  it("doesn't set highlighted index for a disabled option", () => {
    const FIRST_DISABLED_OPTION_INDEX = 0
    const SECOND_DISABLED_OPTION_INDEX = 2
    const FIRST_ENABLED_OPTION_INDEX = 1

    const { result, rerender } = renderUseHighlightedIndex({
      options: disableOptions(OPTIONS, [
        FIRST_DISABLED_OPTION_INDEX,
        SECOND_DISABLED_OPTION_INDEX
      ])
    })

    expect(getHighlightIndex(result)).toBe(FIRST_ENABLED_OPTION_INDEX)

    act(() => {
      setHighlightedIndex(result, SECOND_DISABLED_OPTION_INDEX)
    })
    expect(getHighlightIndex(result)).toBe(FIRST_ENABLED_OPTION_INDEX)

    act(() => {
      setHighlightedIndex(result, 4)
    })
    expect(getHighlightIndex(result)).toBe(4)

    rerender({ isOpen: false })
    expect(getHighlightIndex(result)).toBe(FIRST_ENABLED_OPTION_INDEX)
  })

  it("doesn't set highlighted index for a selected and disabled option", () => {
    const DISABLED_OPTION_INDEX = 0
    const FIRST_ENABLED_OPTION_INDEX = 1
    const options = disableOptions(OPTIONS, [DISABLED_OPTION_INDEX])
    const { result, rerender } = renderUseHighlightedIndex({
      options,
      selectedOptions: [options[DISABLED_OPTION_INDEX]]
    })

    expect(getHighlightIndex(result)).toBe(FIRST_ENABLED_OPTION_INDEX)

    act(() => {
      setHighlightedIndex(result, DISABLED_OPTION_INDEX)
    })
    expect(getHighlightIndex(result)).toBe(FIRST_ENABLED_OPTION_INDEX)

    rerender({ isOpen: false })
    expect(getHighlightIndex(result)).toBe(FIRST_ENABLED_OPTION_INDEX)
  })
})
