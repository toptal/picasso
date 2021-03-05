/* eslint-disable max-lines-per-function */
import { act, renderHook } from '@testing-library/react-hooks'
import { waitFor } from '@toptal/picasso/test-utils'

import {
  useAutocomplete,
  getNextWrappingIndex,
  normalizeInitialIndex,
  Props
} from './use-autocomplete'

const TEST_OPTIONS = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' }
  // { text: 'Bulgaria', value: 'BG' },
  // { text: 'Kyrgyzstan', value: 'KG' },
  // { text: 'Russia', value: 'RU' },
  // { text: 'Romania', value: 'RO' },
  // { text: 'Japan', value: 'JP' }
]

const MOCKED_EVENT = {
  target: { value: '' }
} as any

const defaultGetDisplayValue = jest
  .fn()
  .mockImplementation(option => option?.text ?? '')

const renderUseAutocomplete = ({
  value = '',
  options = TEST_OPTIONS,
  getDisplayValue = defaultGetDisplayValue,
  ...rest
}: Partial<Props> = {}) =>
  renderHook(() =>
    useAutocomplete({
      value,
      options,
      getDisplayValue,
      ...rest
    })
  )

describe('useAutocomplete', () => {
  beforeEach(() => {
    defaultGetDisplayValue.mockClear()
  })
  it('works', () => {
    const { result } = renderUseAutocomplete()

    expect(result.current.isOpen).toBe(false)
    expect(result.current.highlightedIndex).toBe(0)
    expect(result.current.shouldShowOtherOption).toBe(false)
  })

  it('returns input props', () => {
    const onFocus = jest.fn()
    const onBlur = jest.fn()
    const { result } = renderUseAutocomplete({
      onFocus,
      onBlur,
      enableReset: true
    })

    const input = result.current.getInputProps()

    expect(input['aria-autocomplete']).toBe('list')
    expect(input.enableReset).toBe(true)

    act(() => {
      input.onFocus(MOCKED_EVENT)
      input.onBlur(MOCKED_EVENT)
    })

    expect(onFocus).toHaveBeenCalledTimes(1)
    expect(onBlur).toHaveBeenCalledTimes(1)
  })

  it('returns item props and selects the first item by default', () => {
    const { result } = renderUseAutocomplete()

    const firstItemProps = result.current.getItemProps(0, TEST_OPTIONS[0])

    expect(firstItemProps.role).toBe('option')
    expect(firstItemProps['aria-selected']).toBe(true)
    expect(firstItemProps.selected).toBe(true)

    const secondItemProps = result.current.getItemProps(1, TEST_OPTIONS[1])

    expect(secondItemProps.role).toBe('option')
    expect(secondItemProps['aria-selected']).toBe(false)
    expect(secondItemProps.selected).toBe(false)
  })

  it('returns other item props', () => {
    const onOtherOptionSelect = jest.fn()
    const { result } = renderUseAutocomplete({ onOtherOptionSelect })

    const otherItemProps = result.current.getOtherItemProps(0, 'hello')

    expect(otherItemProps.role).toBe('option')
    expect(otherItemProps['aria-selected']).toBe(true)
    expect(otherItemProps.selected).toBe(true)

    act(() => {
      otherItemProps.onClick(MOCKED_EVENT)
    })

    expect(onOtherOptionSelect).toHaveBeenCalledTimes(1)
  })

  it('shows other options if value is set', () => {
    const { result } = renderUseAutocomplete({
      value: 'Picasso',
      showOtherOption: true
    })

    expect(result.current.shouldShowOtherOption).toBe(true)
  })

  it('highlights element on hover', () => {
    const { result } = renderUseAutocomplete()

    expect(result.current.highlightedIndex).toBe(0)

    const firstItemProps = result.current.getItemProps(0, {
      text: 'Ukraine',
      value: 'UA'
    })

    expect(firstItemProps.role).toBe('option')
    expect(firstItemProps['aria-selected']).toBe(true)
    expect(firstItemProps.selected).toBe(true)

    act(() => {
      firstItemProps.onMouseMove()
    })

    expect(result.current.highlightedIndex).toBe(0)

    const secondItemProps = result.current.getItemProps(1, {
      text: 'Ukraine',
      value: 'UA'
    })

    expect(secondItemProps.role).toBe('option')
    expect(secondItemProps['aria-selected']).toBe(false)
    expect(secondItemProps.selected).toBe(false)

    act(() => {
      secondItemProps.onMouseMove()
    })

    expect(result.current.highlightedIndex).toBe(1)
  })

  it('opens menu on input change', () => {
    const { result } = renderUseAutocomplete()

    expect(result.current.isOpen).toBe(false)

    const input = result.current.getInputProps()

    act(() => {
      input.onChange(MOCKED_EVENT)
    })

    expect(result.current.isOpen).toBe(true)
  })

  it('resets value on reset click', () => {
    const onChange = jest.fn()
    const { result } = renderUseAutocomplete({ value: 'Picasso', onChange })

    const input = result.current.getInputProps()

    const stopPropagation = jest.fn()

    act(() => {
      input.onResetClick({ stopPropagation } as any)
    })

    expect(stopPropagation).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('', {
      isSelected: false
    })
  })

  it('closes menu on blur', () => {
    const { result } = renderUseAutocomplete()

    expect(result.current.isOpen).toBe(false)

    const input = result.current.getInputProps()

    act(() => {
      input.onChange(MOCKED_EVENT)
    })

    expect(result.current.isOpen).toBe(true)

    act(() => {
      input.onBlur(MOCKED_EVENT)
    })

    expect(result.current.isOpen).toBe(false)
  })

  it('closes menu on item click', () => {
    const { result } = renderUseAutocomplete()

    expect(result.current.isOpen).toBe(false)

    const input = result.current.getInputProps()

    act(() => {
      input.onChange(MOCKED_EVENT)
    })

    expect(result.current.isOpen).toBe(true)

    const itemProps = result.current.getItemProps(0, {
      text: 'Ukraine',
      value: 'UA'
    })

    act(() => {
      itemProps.onClick(MOCKED_EVENT)
    })

    expect(result.current.isOpen).toBe(false)
  })

  describe('works with key presses', () => {
    it('opens menu on enter keypress', () => {
      const { result } = renderUseAutocomplete()

      expect(result.current.isOpen).toBe(false)

      const input = result.current.getInputProps()

      act(() => {
        input.onKeyDown({ key: 'Enter', preventDefault: jest.fn() } as any)
      })

      expect(result.current.isOpen).toBe(true)
    })

    it('opens menu on arrow up keypress', () => {
      const { result } = renderUseAutocomplete()

      expect(result.current.isOpen).toBe(false)
      expect(result.current.highlightedIndex).toBe(0)

      const input = result.current.getInputProps()

      act(() => {
        input.onKeyDown({ key: 'ArrowUp', preventDefault: jest.fn() } as any)
      })

      expect(result.current.isOpen).toBe(true)
      expect(result.current.highlightedIndex).toBe(4)
    })

    it('opens menu on arrow down keypress', () => {
      const { result } = renderUseAutocomplete()

      expect(result.current.isOpen).toBe(false)

      const input = result.current.getInputProps()

      act(() => {
        input.onKeyDown({ key: 'ArrowDown', preventDefault: jest.fn() } as any)
      })

      expect(result.current.isOpen).toBe(true)
      expect(result.current.highlightedIndex).toBe(1)
    })

    it('opens menu on enter keypress if already open', () => {
      const { result } = renderUseAutocomplete()

      const input = result.current.getInputProps()

      act(() => {
        input.onClick()
      })

      expect(result.current.isOpen).toBe(true)

      act(() => {
        input.onKeyDown({ key: 'Enter', preventDefault: jest.fn() } as any)
      })

      waitFor(() => expect(result.current.isOpen).toBe(false))
    })

    it('closes menu on backspace keypress if value is empty', () => {
      const onChange = jest.fn()

      const { result } = renderUseAutocomplete({
        onChange
      })

      expect(result.current.isOpen).toBe(false)

      const input = result.current.getInputProps()

      act(() => {
        input.onClick()
      })

      expect(result.current.isOpen).toBe(true)

      act(() => {
        input.onKeyDown({
          key: 'Backspace',
          preventDefault: jest.fn()
        } as any)
      })

      expect(result.current.isOpen).toBe(false)
    })

    it('closes menu on Escape keypress and resets value', () => {
      const onChange = jest.fn()

      const { result } = renderUseAutocomplete({ value: 'Picasso', onChange })

      expect(result.current.isOpen).toBe(false)

      const input = result.current.getInputProps()

      act(() => {
        input.onClick()
      })

      expect(result.current.isOpen).toBe(true)

      act(() => {
        input.onKeyDown({ key: 'Escape', preventDefault: jest.fn() } as any)
      })

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith('', { isSelected: false })
      expect(result.current.isOpen).toBe(false)
    })
  })
})

describe('getNextWrappingIndex', () => {
  it('works', () => {
    expect(getNextWrappingIndex(1, 0, 5)).toBe(1)
  })
  it('returns initial index when movement is larger than item count', () => {
    expect(getNextWrappingIndex(6, 0, 5)).toBe(0)
  })

  it('returns initial index when no movement', () => {
    expect(getNextWrappingIndex(0, 0, 5)).toBe(0)
  })

  it('handles backwards movements', () => {
    expect(getNextWrappingIndex(-1, 1, 5)).toBe(0)
  })

  it('handles negative initial index', () => {
    expect(getNextWrappingIndex(0, -1, 5)).toBe(0)
  })

  describe('normalizeInitialIndex', () => {
    it('works', () => {
      expect(
        normalizeInitialIndex({ initialIndex: 0, itemCount: 6, moveAmount: 1 })
      ).toBe(0)
    })
    it('handles negative index', () => {
      expect(
        normalizeInitialIndex({ initialIndex: -1, itemCount: 6, moveAmount: 1 })
      ).toBe(-1)
      expect(
        normalizeInitialIndex({ initialIndex: -1, itemCount: 6, moveAmount: 0 })
      ).toBe(6)
    })

    it('index larger than item count', () => {
      expect(
        normalizeInitialIndex({ initialIndex: 10, itemCount: 6, moveAmount: 1 })
      ).toBe(-1)
      expect(
        normalizeInitialIndex({ initialIndex: 10, itemCount: 6, moveAmount: 0 })
      ).toBe(6)
    })
  })
})
