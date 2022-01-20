import { renderHook } from '@testing-library/react-hooks'
import { act } from '@toptal/picasso/test-utils'

import useEditorReducer from './useEditorReducer'

describe('useEditorReducer', () => {
  it('foobar', () => {
    const { result } = renderHook(() => useEditorReducer())

    act(() => {
      result.current.actions.setToolbarStateKey('bold', true)
    })
    expect(result.current.toolbarState).toEqual({ bold: true })

    act(() => {
      result.current.actions.setToolbarStateKey('italic', true)
    })
    expect(result.current.toolbarState).toEqual({ bold: true, italic: true })

    act(() => {
      result.current.actions.setToolbarStateKey('italic', undefined)
    })
    expect(result.current.toolbarState).toEqual({ bold: true })

    act(() => {
      result.current.actions.setToolbarState({
        header: '3',
        bold: true,
        italic: true,
        list: 'bullet'
      })
    })
    expect(result.current.toolbarState).toEqual({
      header: '3',
      bold: true,
      italic: true,
      list: 'bullet'
    })
  })
})
