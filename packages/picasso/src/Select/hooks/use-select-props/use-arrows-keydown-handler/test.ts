import { renderHook } from '@testing-library/react-hooks'

import { getUseSelectPropsMock } from '../mocks'
import useArrowsKeydownHandler from './use-arrows-keydown-handler'

describe('useArrowsKeydownHandler', () => {
  it('handles arrow down and up events', () => {
    const props = getUseSelectPropsMock()

    props.selectState.isOpen = true
    props.selectState.highlightedIndex = 1
    props.selectState.filteredOptions = [
      {
        text: 'One',
        value: '1'
      },
      {
        text: 'Two',
        value: '2'
      },
      {
        text: 'Three',
        value: '3'
      }
    ]

    const { result } = renderHook(() => useArrowsKeydownHandler(props))
    const event = new KeyboardEvent('keydown')

    event.preventDefault = jest.fn()
    result.current('ArrowDown', event as any)

    expect(event.preventDefault).toHaveBeenCalledTimes(1)
    expect(props.selectState.setHighlightedIndex).toHaveBeenCalledWith(2)
  })

  it('opens if not open', () => {
    const props = getUseSelectPropsMock()

    props.selectState.isOpen = false

    const { result } = renderHook(() => useArrowsKeydownHandler(props))
    const event = new KeyboardEvent('keydown')

    event.preventDefault = jest.fn()
    result.current('ArrowDown', event as any)

    expect(event.preventDefault).toHaveBeenCalledTimes(1)
  })
})
