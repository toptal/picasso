import { renderHook, act } from '@testing-library/react-hooks'

import useSelectState, { Props } from './use-select-state'

const DEFAULT_OPTIONS = [
  { text: 'One', value: '1' },
  { text: 'Two', value: '2' },
  { text: 'Three', value: '3' },
]

const defaultGetDisplayValue = jest
  .fn()
  .mockImplementation(option => option?.text ?? '')

const renderUseSelectState = (initialProps: Partial<Props> = {}) =>
  renderHook(
    ({
      options = DEFAULT_OPTIONS,
      getDisplayValue = defaultGetDisplayValue,
      searchThreshold = 10,
      ...rest
    }: Partial<Props>) =>
      useSelectState({
        options,
        getDisplayValue: getDisplayValue,
        searchThreshold,
        ...rest,
      }),
    {
      initialProps,
    }
  )

describe('useSelectState', () => {
  beforeEach(() => {
    defaultGetDisplayValue.mockClear()
  })

  it('returns initial state', () => {
    const { result } = renderUseSelectState()

    expect(result.current.selectedOptions).toEqual([])
    expect(result.current.isOpen).toBe(false)
    expect(result.current.canOpen).toBe(true)
    expect(result.current.highlightedIndex).toBe(0)
    expect(result.current.closeOnEnter).toBe(true)
    expect(result.current.showSearch).toBe(false)
    expect(result.current.filterOptionsValue).toBe('')
    expect(result.current.displayValue).toBe('')
    expect(result.current.emptySelectValue).toBe('')
  })

  it('returns state with value', () => {
    const { result } = renderUseSelectState({
      value: DEFAULT_OPTIONS[0].value,
    })

    expect(result.current.selectedOptions).toEqual([DEFAULT_OPTIONS[0]])
    expect(result.current.isOpen).toBe(false)
    expect(result.current.canOpen).toBe(true)
    expect(result.current.highlightedIndex).toBe(0)
    expect(result.current.closeOnEnter).toBe(true)
    expect(result.current.showSearch).toBe(false)
    expect(result.current.filterOptionsValue).toBe('')
    expect(result.current.displayValue).toEqual(DEFAULT_OPTIONS[0].text)
    expect(result.current.emptySelectValue).toBe('')
  })

  it('returns multiple state with value', () => {
    const { result } = renderUseSelectState({
      value: [DEFAULT_OPTIONS[0].value, DEFAULT_OPTIONS[1].value],
      multiple: true,
    })

    expect(result.current.selectedOptions).toEqual([
      DEFAULT_OPTIONS[0],
      DEFAULT_OPTIONS[1],
    ])
    expect(result.current.isOpen).toBe(false)
    expect(result.current.canOpen).toBe(true)
    expect(result.current.highlightedIndex).toBe(0)
    expect(result.current.closeOnEnter).toBe(false)
    expect(result.current.showSearch).toBe(false)
    expect(result.current.filterOptionsValue).toBe('')
    expect(result.current.displayValue).toBe(
      `${DEFAULT_OPTIONS[0].text}, ${DEFAULT_OPTIONS[1].text}`
    )
    expect(result.current.emptySelectValue).toEqual([])
  })

  it('show search when there is more items than threshold allows', () => {
    const { result } = renderUseSelectState({ searchThreshold: 2 })

    expect(result.current.showSearch).toBe(true)
  })

  it('forces search when threshold is higher than max number of elements to show', () => {
    const { result } = renderUseSelectState({
      searchThreshold: 3,
      limit: 2,
    })

    expect(result.current.showSearch).toBe(true)
  })

  it('toggles isOpen state', () => {
    const { result } = renderUseSelectState()

    act(() => {
      result.current.open()
    })
    expect(result.current.isOpen).toBe(true)

    act(() => {
      result.current.close()
    })
    expect(result.current.isOpen).toBe(false)
  })

  it('filters options correctly', () => {
    const { result } = renderUseSelectState()

    act(() => {
      result.current.setFilterOptionsValue('one')
    })
    expect(result.current.filterOptionsValue).toBe('one')
    expect(result.current.filteredOptions).toEqual([DEFAULT_OPTIONS[0]])
  })

  it('updates display value and selected options automatically', () => {
    const { result, rerender } = renderUseSelectState()

    expect(result.current.selectedOptions).toEqual([])
    expect(result.current.displayValue).toBe('')

    rerender({ value: DEFAULT_OPTIONS[0].value })

    expect(result.current.selectedOptions).toEqual([DEFAULT_OPTIONS[0]])
    expect(result.current.displayValue).toEqual(DEFAULT_OPTIONS[0].text)
  })

  describe('when select is opened but has became disabled', () => {
    it('switches to closed state to false', () => {
      const { result, rerender } = renderUseSelectState()

      expect(result.current.isOpen).toBe(false)

      act(() => {
        result.current.open()
      })

      expect(result.current.isOpen).toBe(true)

      rerender({ disabled: true })

      expect(result.current.isOpen).toBe(false)
    })
  })
})
