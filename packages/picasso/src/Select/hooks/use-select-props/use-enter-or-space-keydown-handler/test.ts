import { renderHook } from '@testing-library/react-hooks'

import { getUseSelectPropsMock } from '../mocks'
import useEnterOrSpaceKeydownHandler from './use-enter-or-space-keydown-handler'

describe('useEnterOrSpaceKeydownHandler', () => {
  it('opens if can open', () => {
    const handleSelect = jest.fn()
    const props = { ...getUseSelectPropsMock(), handleSelect }
    const { result } = renderHook(() => useEnterOrSpaceKeydownHandler(props))
    const event = new KeyboardEvent('keydown') as any

    result.current(event)

    expect(props.selectState.open).toHaveBeenCalledTimes(1)
  })

  it('does nothing if open and no option highlighted', () => {
    const handleSelect = jest.fn()
    const props = { ...getUseSelectPropsMock(), handleSelect }

    props.selectState.canOpen = false
    props.selectState.highlightedIndex = 0
    props.selectState.filteredOptions = []

    const { result } = renderHook(() => useEnterOrSpaceKeydownHandler(props))
    const event = new KeyboardEvent('keydown') as any

    result.current(event)

    expect(props.selectState.open).toHaveBeenCalledTimes(0)
    expect(props.selectState.close).toHaveBeenCalledTimes(0)
    expect(handleSelect).toHaveBeenCalledTimes(0)
  })

  it('closes if open and an option selected', () => {
    const handleSelect = jest.fn()
    const props = { ...getUseSelectPropsMock(), handleSelect }

    props.selectState.canOpen = false
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

    const { result } = renderHook(() => useEnterOrSpaceKeydownHandler(props))
    const event = new KeyboardEvent('keydown') as any

    result.current(event)

    expect(props.selectState.close).toHaveBeenCalledTimes(1)
    expect(handleSelect).toHaveBeenCalledWith(event, {
      text: 'Two',
      value: '2'
    })
  })
})
