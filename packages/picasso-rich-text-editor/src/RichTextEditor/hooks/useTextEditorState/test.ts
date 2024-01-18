import { renderHook } from '@testing-library/react-hooks'
import { act } from '@toptal/picasso-test-utils'

import useTextEditorState from './useTextEditorState'
import { initialState } from '../../store'
import { actionTypes } from '../../store/toolbar'

describe('useTextEditorState', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useTextEditorState())

    expect(result.current.state).toEqual(initialState)
    expect(result.current.dispatch).toBeInstanceOf(Function)
  })

  describe('toolbar', () => {
    describe('format', () => {
      it('updates bold', () => {
        const { result } = renderHook(() => useTextEditorState())
        const dispatch = result.current.dispatch

        expect(result.current.state).toEqual(initialState)
        act(() => dispatch({ type: actionTypes.bold, payload: true }))
        expect(result.current.state).toEqual({
          ...initialState,
          toolbar: {
            ...initialState.toolbar,
            format: {
              ...initialState.toolbar.format,
              bold: true,
            },
          },
        })
      })
      it('updates italic', () => {
        const { result } = renderHook(() => useTextEditorState())
        const dispatch = result.current.dispatch

        expect(result.current.state).toEqual(initialState)
        act(() => dispatch({ type: actionTypes.italic, payload: true }))
        expect(result.current.state).toEqual({
          ...initialState,
          toolbar: {
            ...initialState.toolbar,
            format: {
              ...initialState.toolbar.format,
              italic: true,
            },
          },
        })
      })
      it('updates header', () => {
        const { result } = renderHook(() => useTextEditorState())
        const dispatch = result.current.dispatch

        expect(result.current.state).toEqual(initialState)
        act(() => dispatch({ type: actionTypes.header, payload: '3' }))
        expect(result.current.state).toEqual({
          ...initialState,
          toolbar: {
            ...initialState.toolbar,
            format: {
              ...initialState.toolbar.format,
              header: '3',
            },
          },
        })
      })
      it('updates list', () => {
        const { result } = renderHook(() => useTextEditorState())
        const dispatch = result.current.dispatch

        expect(result.current.state).toEqual(initialState)
        act(() => dispatch({ type: actionTypes.list, payload: 'ordered' }))
        expect(result.current.state).toEqual({
          ...initialState,
          toolbar: {
            ...initialState.toolbar,
            format: {
              ...initialState.toolbar.format,
              list: 'ordered',
            },
          },
        })
      })
    })
    it('updates disabled', () => {
      const { result } = renderHook(() => useTextEditorState())
      const dispatch = result.current.dispatch

      expect(result.current.state).toEqual(initialState)
      act(() => dispatch({ type: actionTypes.disabled, payload: true }))
      expect(result.current.state).toEqual({
        ...initialState,
        toolbar: {
          ...initialState.toolbar,
          disabled: true,
        },
      })
    })
  })
})
