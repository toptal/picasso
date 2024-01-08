import { renderHook, act } from '@testing-library/react-hooks'

import type { Option } from '../../types'
import type { Props } from './use-select-state'
import useSelectState, { EMPTY_INPUT_VALUE } from './use-select-state'
import useHighlightedIndex from '../use-highlighted-index'
import {
  getMultipleSelection,
  getSingleSelection,
  getSelectedOptions,
  DEFAULT_LIMIT,
  filterOptions,
  flattenOptions,
  limitOptions,
} from '../../utils'

const utils = jest.requireActual('../../utils')

const DEFAULT_OPTIONS = [
  { text: 'One', value: '1' },
  { text: 'Two', value: '2' },
  { text: 'Three', value: '3' },
]

const defaultGetDisplayValue = (option: Option | null) => option?.text ?? ''

jest.mock('../use-highlighted-index')
jest.mock('../../utils')

const mockedUseHighlightedIndex = useHighlightedIndex as jest.Mock<
  ReturnType<typeof useHighlightedIndex>
>

const mockedGetMultipleSelection = getMultipleSelection as jest.Mock<
  ReturnType<typeof getMultipleSelection>
>

const mockedGetSingleSelection = getSingleSelection as jest.Mock<
  ReturnType<typeof getSingleSelection>
>
const mockedGetSelectedOptions = getSelectedOptions as jest.Mock<
  ReturnType<typeof getSelectedOptions>
>
const mockedFilterOptions = filterOptions as jest.Mock<
  ReturnType<typeof filterOptions>
>
const mockedLimitOptions = limitOptions as jest.Mock<
  ReturnType<typeof limitOptions>
>
const mockedFlattenOptions = flattenOptions as jest.Mock<
  ReturnType<typeof flattenOptions>
>

const options: Option[] = [
  {
    text: 'OPTION_TEXT+1',
    value: 'OPTION_VALUE+1',
  },
  {
    text: 'OPTION_TEXT+2',
    value: 'OPTION_VALUE+2',
  },
]

const filteredOptions: Option[] = [
  {
    text: 'FILTERED_OPTION_TEXT+1',
    value: 'FILTERED_OPTION_VALUE+1',
  },
  {
    text: 'FILTERED_OPTION_TEXT+2',
    value: 'FILTERED_OPTION_VALUE+2',
  },
]

const limitedOptions: Option[] = [
  {
    text: 'LIMITED_OPTION_TEXT+1',
    value: 'LIMITED_OPTION_VALUE+1',
  },
  {
    text: 'LIMITED_OPTION_TEXT+2',
    value: 'LIMITED_OPTION_VALUE+2',
  },
]

const flattenedOptions: Option[] = [
  {
    text: 'FLATTENED_OPTION_TEXT+1',
    value: 'FLATTENED_OPTION_VALUE+1',
  },
  {
    text: 'FLATTENED_OPTION_TEXT+2',
    value: 'FLATTENED_OPTION_VALUE+2',
  },
]

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
    mockedUseHighlightedIndex.mockImplementation(() => [0, jest.fn()])
    mockedGetMultipleSelection.mockImplementation(utils.getMultipleSelection)
    mockedGetSingleSelection.mockImplementation(utils.getSingleSelection)
    mockedGetSelectedOptions.mockImplementation(() => options)
    mockedFilterOptions.mockImplementation(() => filteredOptions)
    mockedLimitOptions.mockImplementation(() => limitedOptions)
    mockedFlattenOptions.mockImplementation(() => flattenedOptions)
  })

  describe('when multiple selection is off', () => {
    describe('when no selected options', () => {
      it('returns initial state', () => {
        mockedGetSelectedOptions.mockReturnValueOnce([])

        const { result } = renderUseSelectState()

        expect(mockedGetSelectedOptions).toHaveBeenCalledWith(
          flattenedOptions,
          undefined
        )

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

      describe('when value is changed on re-render', () => {
        it('updates display value and selected options automatically', () => {
          mockedGetSelectedOptions.mockReturnValueOnce([])

          const { result, rerender } = renderUseSelectState()

          expect(mockedFlattenOptions).toHaveBeenCalledWith(DEFAULT_OPTIONS)
          expect(mockedGetSelectedOptions).toHaveBeenCalledTimes(1)
          expect(mockedGetSelectedOptions).toHaveBeenCalledWith(
            flattenedOptions,
            undefined
          )
          expect(result.current.selectedOptions).toEqual([])
          expect(result.current.displayValue).toBe('')

          mockedGetSelectedOptions.mockReturnValueOnce(options)

          rerender({ value: 'NEW_VALUE' })

          expect(mockedGetSelectedOptions).toHaveBeenCalledTimes(2)
          expect(mockedGetSelectedOptions).toHaveBeenCalledWith(
            flattenedOptions,
            'NEW_VALUE'
          )
          expect(result.current.selectedOptions).toEqual(options)
          expect(result.current.displayValue).toBe('OPTION_TEXT+1')
        })
      })
    })

    describe('when selected value is specified', () => {
      it('returns state with value', () => {
        const { result } = renderUseSelectState({
          value: 'FLATTENED_OPTION_VALUE+1',
        })

        expect(mockedGetMultipleSelection).not.toHaveBeenCalled()
        expect(mockedGetSingleSelection).toHaveBeenCalledWith({
          text: 'OPTION_TEXT+1',
          value: 'OPTION_VALUE+1',
        })
        expect(mockedGetSelectedOptions).toHaveBeenCalledWith(
          flattenedOptions,
          'FLATTENED_OPTION_VALUE+1'
        )

        expect(result.current.selectedOptions).toEqual(options)
        expect(result.current.isOpen).toBe(false)
        expect(result.current.canOpen).toBe(true)
        expect(result.current.highlightedIndex).toBe(0)
        expect(result.current.closeOnEnter).toBe(true)
        expect(result.current.showSearch).toBe(false)
        expect(result.current.filterOptionsValue).toBe('')
        expect(result.current.displayValue).toBe('OPTION_TEXT+1')
        expect(result.current.emptySelectValue).toBe('')
      })
    })
  })

  describe('when multiple selection is used', () => {
    describe('when selected value is specified', () => {
      it('returns multiple state with value', () => {
        const { result } = renderUseSelectState({
          value: ['FLATTENED_OPTION_VALUE+1', 'FLATTENED_OPTION_VALUE+2'],
          multiple: true,
        })

        expect(mockedGetMultipleSelection).toHaveBeenCalledWith(options)
        expect(mockedFilterOptions).toHaveBeenCalledWith({
          options: DEFAULT_OPTIONS,
          filterOptionsValue: EMPTY_INPUT_VALUE,
          getDisplayValue: defaultGetDisplayValue,
        })
        expect(mockedGetSingleSelection).not.toHaveBeenCalled()

        expect(result.current.selectedOptions).toEqual(options)
        expect(result.current.isOpen).toBe(false)
        expect(result.current.canOpen).toBe(true)
        expect(result.current.highlightedIndex).toBe(0)
        expect(result.current.closeOnEnter).toBe(false)
        expect(result.current.showSearch).toBe(false)
        expect(result.current.filterOptionsValue).toBe('')
        expect(result.current.displayValue).toBe('OPTION_TEXT+1, OPTION_TEXT+2')
        expect(result.current.emptySelectValue).toEqual([])
      })
    })
  })

  describe('when there is more items than threshold allows', () => {
    it('shows search', () => {
      const { result } = renderUseSelectState({ searchThreshold: 1 })

      expect(result.current.showSearch).toBe(true)
    })
  })

  describe('when threshold is higher than max number of elements to show', () => {
    it('forces search', () => {
      const { result } = renderUseSelectState({
        searchThreshold: 3,
        limit: 2,
      })

      expect(result.current.showSearch).toBe(true)
    })
  })

  describe('when filter options callback was called', () => {
    it('filters options correctly', () => {
      const newFilteredOptions = [{ text: 'FILTERED', value: 'FILTERED' }]
      const newLimitedOptions = [{ text: 'LIMITED', value: 'LIMITED' }]
      const { result } = renderUseSelectState()

      expect(mockedLimitOptions).toHaveBeenCalledTimes(1)
      expect(mockedLimitOptions).toHaveBeenCalledWith({
        options: filteredOptions,
        limit: DEFAULT_LIMIT,
      })
      expect(mockedFilterOptions).toHaveBeenCalledTimes(1)
      expect(mockedFilterOptions).toHaveBeenCalledWith({
        options: DEFAULT_OPTIONS,
        filterOptionsValue: '',
        getDisplayValue: defaultGetDisplayValue,
      })
      expect(result.current.filterOptionsValue).toBe('')
      expect(result.current.filteredOptions).toEqual(limitedOptions)

      mockedFilterOptions.mockImplementationOnce(() => newFilteredOptions)
      mockedLimitOptions.mockImplementationOnce(() => newLimitedOptions)

      act(() => {
        result.current.setFilterOptionsValue('one')
      })

      expect(mockedLimitOptions).toHaveBeenCalledTimes(2)
      expect(mockedLimitOptions).toHaveBeenCalledWith({
        options: newFilteredOptions,
        limit: DEFAULT_LIMIT,
      })
      expect(mockedFilterOptions).toHaveBeenCalledTimes(2)
      expect(mockedFilterOptions).toHaveBeenCalledWith({
        options: DEFAULT_OPTIONS,
        filterOptionsValue: 'one',
        getDisplayValue: defaultGetDisplayValue,
      })
      expect(result.current.filterOptionsValue).toBe('one')
      expect(result.current.filteredOptions).toEqual(newLimitedOptions)
    })
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
