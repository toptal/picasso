import { renderHook } from '@testing-library/react-hooks'

import { getUseSelectPropsMock } from '../mocks'
import useSelectKeydownHandle from './use-select-keydown-handler'
import focusRef from '../../../utils/focus-ref'

jest.mock('../../../utils/focus-ref', () => jest.fn())

const mockedFocusRef = focusRef as jest.MockedFunction<typeof focusRef>

describe('useSelectKeydownHandle', () => {
  beforeEach(() => {
    mockedFocusRef.mockClear()
  })

  it('handles by default when native', () => {
    const handleArrowsKeyDown = jest.fn()
    const handleEnterOrSpaceKeyDown = jest.fn()
    const handleEscapeKeyDown = jest.fn()
    const props = {
      ...getUseSelectPropsMock(),
      handleArrowsKeyDown,
      handleEnterOrSpaceKeyDown,
      handleEscapeKeyDown
    }

    props.selectProps.onKeyDown = jest.fn()
    props.selectProps.native = true

    const { result } = renderHook(() => useSelectKeydownHandle(props))
    const event = new KeyboardEvent('keydown', { key: 'Tab' }) as any

    result.current(event)

    expect(props.selectProps.onKeyDown).toHaveBeenCalledTimes(1)
    expect(props.selectProps.onKeyDown).toHaveBeenCalledWith(event)
  })

  it('focuses input if typing text', () => {
    const handleArrowsKeyDown = jest.fn()
    const handleEnterOrSpaceKeyDown = jest.fn()
    const handleEscapeKeyDown = jest.fn()
    const props = {
      ...getUseSelectPropsMock(),
      handleArrowsKeyDown,
      handleEnterOrSpaceKeyDown,
      handleEscapeKeyDown
    }

    props.selectProps.onKeyDown = jest.fn()
    props.selectState.showSearch = true

    const { result } = renderHook(() => useSelectKeydownHandle(props))
    const event = new KeyboardEvent('keydown', { key: 'A' }) as any

    event.preventDefault = jest.fn()

    result.current(event)

    expect(event.preventDefault).not.toHaveBeenCalled()
    expect(focusRef).toHaveBeenCalledTimes(1)
    expect(focusRef).toHaveBeenCalledWith(props.searchInputRef)
    expect(props.selectProps.onKeyDown).toHaveBeenCalledTimes(1)
    expect(props.selectProps.onKeyDown).toHaveBeenCalledWith(event)
  })

  it('focuses input on tab when open and search is shown', () => {
    const handleArrowsKeyDown = jest.fn()
    const handleEnterOrSpaceKeyDown = jest.fn()
    const handleEscapeKeyDown = jest.fn()
    const props = {
      ...getUseSelectPropsMock(),
      handleArrowsKeyDown,
      handleEnterOrSpaceKeyDown,
      handleEscapeKeyDown
    }

    props.selectState.isOpen = true
    props.selectProps.onKeyDown = jest.fn()
    props.selectState.showSearch = true

    const { result } = renderHook(() => useSelectKeydownHandle(props))
    const event = new KeyboardEvent('keydown', { key: 'Tab' }) as any

    result.current(event)

    expect(focusRef).toHaveBeenCalledTimes(1)
    expect(focusRef).toHaveBeenCalledWith(props.searchInputRef)
    expect(props.selectProps.onKeyDown).toHaveBeenCalledTimes(1)
    expect(props.selectProps.onKeyDown).toHaveBeenCalledWith(event)
  })

  it('handles arrows', () => {
    const handleArrowsKeyDown = jest.fn()
    const handleEnterOrSpaceKeyDown = jest.fn()
    const handleEscapeKeyDown = jest.fn()
    const props = {
      ...getUseSelectPropsMock(),
      handleArrowsKeyDown,
      handleEnterOrSpaceKeyDown,
      handleEscapeKeyDown
    }

    props.selectProps.onKeyDown = jest.fn()

    const { result } = renderHook(() => useSelectKeydownHandle(props))
    const upEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' }) as any

    result.current(upEvent)
    expect(props.handleArrowsKeyDown).toHaveBeenCalledTimes(1)
    expect(props.handleArrowsKeyDown).toHaveBeenLastCalledWith(
      'ArrowUp',
      upEvent
    )
    expect(props.selectProps.onKeyDown).toHaveBeenCalledTimes(1)
    expect(props.selectProps.onKeyDown).toHaveBeenLastCalledWith(upEvent)

    const downEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' }) as any

    result.current(downEvent)
    expect(props.handleArrowsKeyDown).toHaveBeenCalledTimes(2)
    expect(props.handleArrowsKeyDown).toHaveBeenLastCalledWith(
      'ArrowDown',
      downEvent
    )
    expect(props.selectProps.onKeyDown).toHaveBeenCalledTimes(2)
    expect(props.selectProps.onKeyDown).toHaveBeenLastCalledWith(downEvent)
  })

  it('handles enter', () => {
    const handleArrowsKeyDown = jest.fn()
    const handleEnterOrSpaceKeyDown = jest.fn()
    const handleEscapeKeyDown = jest.fn()
    const props = {
      ...getUseSelectPropsMock(),
      handleArrowsKeyDown,
      handleEnterOrSpaceKeyDown,
      handleEscapeKeyDown
    }

    props.selectProps.onKeyDown = jest.fn()

    const { result } = renderHook(() => useSelectKeydownHandle(props))
    const event = new KeyboardEvent('keydown', { key: 'Enter' }) as any

    result.current(event)
    expect(props.handleEnterOrSpaceKeyDown).toHaveBeenCalledTimes(1)
    expect(props.handleEnterOrSpaceKeyDown).toHaveBeenCalledWith(event)
    expect(props.selectProps.onKeyDown).toHaveBeenCalledTimes(1)
    expect(props.selectProps.onKeyDown).toHaveBeenCalledWith(event)
  })

  it('handles escape', () => {
    const handleArrowsKeyDown = jest.fn()
    const handleEnterOrSpaceKeyDown = jest.fn()
    const handleEscapeKeyDown = jest.fn()
    const props = {
      ...getUseSelectPropsMock(),
      handleArrowsKeyDown,
      handleEnterOrSpaceKeyDown,
      handleEscapeKeyDown
    }

    props.selectProps.onKeyDown = jest.fn()

    const { result } = renderHook(() => useSelectKeydownHandle(props))
    const event = new KeyboardEvent('keydown', { key: 'Escape' }) as any

    result.current(event)
    expect(props.handleEscapeKeyDown).toHaveBeenCalledTimes(1)
    expect(props.handleEscapeKeyDown).toHaveBeenCalledWith(event)
    expect(props.selectProps.onKeyDown).toHaveBeenCalledTimes(1)
    expect(props.selectProps.onKeyDown).toHaveBeenCalledWith(event)
  })
})
