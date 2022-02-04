import { renderHook } from '@testing-library/react-hooks'
import { act } from '@toptal/picasso/test-utils'

import { actionTypes } from '../../store/toolbar'
import useOnTextFormat from './useOnTextFormat'

describe('useOnTextFormat', () => {
  it('handles bold action', () => {
    const dispatch = jest.fn()

    const { result } = renderHook(() => useOnTextFormat({ dispatch }))

    const handleTextFormat = result.current.handleTextFormat

    act(() => handleTextFormat('bold', true))

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.bold,
      payload: true
    })

    act(() => handleTextFormat('bold', false))
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.bold,
      payload: false
    })
  })
  it('handles italic action', () => {
    const dispatch = jest.fn()

    const { result } = renderHook(() => useOnTextFormat({ dispatch }))

    const handleTextFormat = result.current.handleTextFormat

    act(() => handleTextFormat('italic', true))

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.italic,
      payload: true
    })

    act(() => handleTextFormat('italic', false))
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.italic,
      payload: false
    })
  })
  it('handles list action', () => {
    const dispatch = jest.fn()

    const { result } = renderHook(() => useOnTextFormat({ dispatch }))

    const handleTextFormat = result.current.handleTextFormat

    act(() => handleTextFormat('list', 'bullet'))

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.list,
      payload: 'bullet'
    })

    act(() => handleTextFormat('list', false))
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.list,
      payload: false
    })
  })
  it('handles header action', () => {
    const dispatch = jest.fn()

    const { result } = renderHook(() => useOnTextFormat({ dispatch }))

    const handleTextFormat = result.current.handleTextFormat

    act(() => handleTextFormat('header', '3'))

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.header,
      payload: '3'
    })

    act(() => handleTextFormat('header', ''))
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.header,
      payload: ''
    })
  })
})
