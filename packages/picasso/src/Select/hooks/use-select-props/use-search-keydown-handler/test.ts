import { renderHook } from '@testing-library/react-hooks'

import { getUseSelectPropsMock } from '../mocks'
import useSearchKeydownHandler from './use-search-keydown-handler'
import { focusRef } from '../../../utils'

jest.mock('../../../utils', () =>
  Object.assign({}, jest.requireActual('../../../utils'), {
    focusRef: jest.fn()
  })
)

const mockedFocusRef = focusRef as jest.MockedFunction<typeof focusRef>

describe('useSearchKeydownHandler', () => {
  beforeEach(() => {
    mockedFocusRef.mockClear()
  })

  it('focuses select on tab', () => {
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

    const { result } = renderHook(() => useSearchKeydownHandler(props))
    const event = new KeyboardEvent('keydown', { key: 'Tab' }) as any

    event.preventDefault = jest.fn()

    result.current(event)

    expect(mockedFocusRef).toHaveBeenCalledTimes(1)
    expect(mockedFocusRef).toHaveBeenCalledWith(props.selectRef)
    expect(event.preventDefault).toHaveBeenCalledTimes(1)
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

    const { result } = renderHook(() => useSearchKeydownHandler(props))
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

    const { result } = renderHook(() => useSearchKeydownHandler(props))
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

    const { result } = renderHook(() => useSearchKeydownHandler(props))
    const event = new KeyboardEvent('keydown', { key: 'Escape' }) as any

    result.current(event)
    expect(props.handleEscapeKeyDown).toHaveBeenCalledTimes(1)
    expect(props.handleEscapeKeyDown).toHaveBeenCalledWith(event)
    expect(props.selectProps.onKeyDown).toHaveBeenCalledTimes(1)
    expect(props.selectProps.onKeyDown).toHaveBeenCalledWith(event)
  })
})
