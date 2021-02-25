import { act, renderHook } from '@testing-library/react-hooks'

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

const MOCKED_KEYBOARD_EVENT: KeyboardEvent = { target: { value: '' } }

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
    const { result } = renderUseAutocomplete({ onFocus, enableReset: true })

    const input = result.current.getInputProps()

    expect(input['aria-autocomplete']).toBe('list')
    expect(input.enableReset).toBe(true)

    act(() => {
      input.onFocus(MOCKED_KEYBOARD_EVENT)
    })

    expect(onFocus).toHaveBeenCalledTimes(1)
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

  it('closes menu on item click', () => {
    const { result } = renderUseAutocomplete()

    expect(result.current.isOpen).toBe(false)

    const input = result.current.getInputProps()

    act(() => {
      input.onChange(MOCKED_KEYBOARD_EVENT)
    })

    expect(result.current.isOpen).toBe(true)

    const itemProps = result.current.getItemProps(0, {
      text: 'Ukraine',
      value: 'UA'
    })

    act(() => {
      itemProps.onClick(MOCKED_KEYBOARD_EVENT)
    })

    expect(result.current.isOpen).toBe(false)
  })

  describe('works with keyboard events', () => {
    it('opens menu on input change', () => {
      const onChange = jest.fn()
      const { result } = renderUseAutocomplete({ value: 'Picasso', onChange })

      expect(result.current.isOpen).toBe(false)

      const input = result.current.getInputProps()

      act(() => {
        input.onChange(MOCKED_KEYBOARD_EVENT)
      })
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(result.current.isOpen).toBe(true)
    })

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

      // TODO: make this assertion work
      // expect(result.current.isOpen).toBe(false)
    })

    it('closes menu on backspace keypress if value is empty', () => {
      const onChange = jest.fn()
      const getDisplayValue = jest.fn()

      const { result } = renderHook(() =>
        useAutocomplete({ value: '', getDisplayValue, onChange })
      )

      //   TODO: figure out why this doesn't work
      //   const { result } = renderUseAutocomplete({ onChange })

      expect(result.current.isOpen).toBe(false)

      const input = result.current.getInputProps()

      act(() => {
        input.onClick()
      })

      expect(result.current.isOpen).toBe(true)

      act(() => {
        input.onKeyDown({ key: 'Backspace', preventDefault: jest.fn() } as any)
      })

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(result.current.isOpen).toBe(false)
    })

    it('closes menu on Escape keypress', () => {
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
