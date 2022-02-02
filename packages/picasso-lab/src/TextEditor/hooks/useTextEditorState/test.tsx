import { renderHook } from '@testing-library/react-hooks'
import { act } from '@toptal/picasso/test-utils'
import react from 'react'

import useTextEditorState from './useTextEditorState'
import {
  actions as toolbarActions,
  initialState as toolbarInitialState
} from '../../store/toolbar'
import {
  actions as editorActions,
  initialState as editorInitialState
} from '../../store/editor'

describe('useTextEditorState', () => {
  describe('toolbar state', () => {
    it('sets bold value', () => {
      const { result } = renderHook(() => useTextEditorState())

      act(() => {
        const dispatch = result.current.dispatch

        toolbarActions.setBold(dispatch)(true)
      })
      expect(result.current.state).toEqual({
        editor: editorInitialState,
        toolbar: {
          ...toolbarInitialState,
          format: {
            ...toolbarInitialState.format,
            bold: true
          }
        }
      })
    })
    it('sets italic value', () => {
      const { result } = renderHook(() => useTextEditorState())

      act(() => {
        const dispatch = result.current.dispatch

        toolbarActions.setItalic(dispatch)(true)
      })
      expect(result.current.state).toEqual({
        editor: editorInitialState,
        toolbar: {
          ...toolbarInitialState,
          format: {
            ...toolbarInitialState.format,
            italic: true
          }
        }
      })
    })
    it('sets list value', () => {
      const { result } = renderHook(() => useTextEditorState())

      act(() => {
        const dispatch = result.current.dispatch

        toolbarActions.setList(dispatch)('bullet')
      })
      expect(result.current.state).toEqual({
        editor: editorInitialState,
        toolbar: {
          ...toolbarInitialState,
          format: {
            ...toolbarInitialState.format,
            list: 'bullet'
          }
        }
      })
    })
    it('sets header value', () => {
      const { result } = renderHook(() => useTextEditorState())

      act(() => {
        const dispatch = result.current.dispatch

        toolbarActions.setHeader(dispatch)('3')
      })
      expect(result.current.state).toEqual({
        editor: editorInitialState,
        toolbar: {
          ...toolbarInitialState,
          format: {
            ...toolbarInitialState.format,
            header: '3'
          }
        }
      })
    })
    it('sets disabled value', () => {
      const { result } = renderHook(() => useTextEditorState())

      act(() => {
        const dispatch = result.current.dispatch

        toolbarActions.setDisabled(dispatch)(true)
      })
      expect(result.current.state).toEqual({
        editor: editorInitialState,
        toolbar: {
          ...toolbarInitialState,
          disabled: true
        }
      })
    })
    it('sets handlers', () => {
      const { result } = renderHook(() => useTextEditorState())
      const handlers = {
        handleBold: jest.fn(),
        handleItalic: jest.fn(),
        handleList: jest.fn(),
        handleHeader: jest.fn()
      }

      act(() => {
        const dispatch = result.current.dispatch

        toolbarActions.setHandlers(dispatch)(handlers)
      })
      expect(result.current.state).toEqual({
        editor: editorInitialState,
        toolbar: {
          ...toolbarInitialState,
          handlers
        }
      })

      act(() => {
        const handleBold = result.current.state.toolbar.handlers.handleBold

        if (handleBold) {
          const mockEvent = {} as react.MouseEvent<
            HTMLButtonElement,
            MouseEvent
          >

          handleBold(mockEvent)
        }
      })

      expect(handlers.handleBold).toHaveBeenCalled()
    })
  })
  describe('editor', () => {
    it('sets isFocused', () => {
      const { result } = renderHook(() => useTextEditorState())

      act(() => {
        const dispatch = result.current.dispatch

        editorActions.setIsFocused(dispatch)(true)
      })
      expect(result.current.state).toEqual({
        editor: {
          ...editorInitialState,
          isFocused: true
        },
        toolbar: toolbarInitialState
      })
    })
  })
})
