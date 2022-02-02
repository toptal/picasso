import { renderHook } from '@testing-library/react-hooks'

import { StateType } from '../../store'
import useHasFocus from './useHasFocus'

describe('useHasFocus', () => {
  it('do nothing if focus has not changed', () => {
    const isFocused = true
    const state = {
      editor: {
        isFocused
      }
    } as StateType
    const dispatch = jest.fn()

    const { result } = renderHook(() => useHasFocus({ state, dispatch }))

    result.current.handleFocusChange(isFocused)

    expect(dispatch).not.toHaveBeenCalled()
  })

  it('update state and sets a new focus value', () => {
    const isFocused = true
    const newIsFocused = false
    const state = {
      editor: {
        isFocused
      }
    } as StateType
    const dispatch = jest.fn()

    const { result } = renderHook(() => useHasFocus({ state, dispatch }))

    result.current.handleFocusChange(newIsFocused)

    expect(dispatch).toHaveBeenCalledWith({
      type: 'TOOLBAR/SET_DISABLED',
      payload: !newIsFocused
    })
    expect(dispatch).toHaveBeenCalledWith({
      type: 'EDITOR/SET_IS_FOCUSED',
      payload: newIsFocused
    })
  })
})
