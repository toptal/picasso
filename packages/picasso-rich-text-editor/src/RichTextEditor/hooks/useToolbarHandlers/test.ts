import type React from 'react'
import { act } from '@toptal/picasso/test-utils'
import { renderHook } from '@testing-library/react-hooks'

import useToolbarHandlers from './useToolbarHandlers'
import { initialState } from '../../store'

const initialFormatState = initialState.toolbar.format
const mockEvent = {} as React.MouseEvent<HTMLButtonElement, MouseEvent>

const editorRef = {
  current: null,
}

describe('useToolbarHandlers', () => {
  describe('calls handleTextFormat with proper arguments', () => {
    it('checks handleBold', () => {
      const handleTextFormat = jest.fn()
      const initFormat = initialFormatState

      const { rerender, result } = renderHook(
        ({ format }) =>
          useToolbarHandlers({
            editorRef,
            handleTextFormat,
            format,
          }),
        {
          initialProps: {
            format: initFormat,
          },
        }
      )

      act(() => result.current.handleBold(mockEvent))

      expect(handleTextFormat).toHaveBeenCalledTimes(1)
      expect(handleTextFormat).toHaveBeenCalledWith({
        formatName: 'bold',
        value: !initFormat.bold,
      })

      const newFormat = { ...initFormat, bold: true }

      rerender({ format: newFormat })
      act(() => result.current.handleBold(mockEvent))

      expect(handleTextFormat).toHaveBeenCalledTimes(2)
      expect(handleTextFormat).toHaveBeenCalledWith({
        formatName: 'bold',
        value: !newFormat.bold,
      })
    })
    it('checks handleItalic', () => {
      const handleTextFormat = jest.fn()
      const initFormat = initialFormatState

      const { rerender, result } = renderHook(
        ({ format }) =>
          useToolbarHandlers({
            editorRef,
            handleTextFormat,
            format,
          }),
        {
          initialProps: {
            format: initFormat,
          },
        }
      )

      act(() => result.current.handleItalic(mockEvent))

      expect(handleTextFormat).toHaveBeenCalledTimes(1)
      expect(handleTextFormat).toHaveBeenCalledWith({
        formatName: 'italic',
        value: !initFormat.italic,
      })

      const newFormat = { ...initFormat, italic: true }

      rerender({ format: newFormat })
      act(() => result.current.handleItalic(mockEvent))

      expect(handleTextFormat).toHaveBeenCalledTimes(2)
      expect(handleTextFormat).toHaveBeenCalledWith({
        formatName: 'italic',
        value: !newFormat.italic,
      })
    })
    it('checks handleHeader', () => {
      const handleTextFormat = jest.fn()
      const initFormat = initialFormatState

      const { result } = renderHook(() =>
        useToolbarHandlers({
          editorRef,
          handleTextFormat,
          format: initFormat,
        })
      )

      act(() => result.current.handleHeader({ target: { value: '3' } } as any))

      expect(handleTextFormat).toHaveBeenCalledTimes(1)
      expect(handleTextFormat).toHaveBeenCalledWith({
        formatName: 'header',
        value: 3,
      })

      act(() => result.current.handleHeader({ target: { value: '' } } as any))

      expect(handleTextFormat).toHaveBeenCalledTimes(2)
      expect(handleTextFormat).toHaveBeenCalledWith({
        formatName: 'header',
        value: undefined,
      })
    })
    it('checks handleUnordered', () => {
      const handleTextFormat = jest.fn()
      const initFormat = initialFormatState

      const { rerender, result } = renderHook(
        ({ format }) =>
          useToolbarHandlers({
            editorRef,
            handleTextFormat,
            format,
          }),
        {
          initialProps: {
            format: initFormat,
          },
        }
      )

      act(() => result.current.handleUnordered(mockEvent))

      expect(handleTextFormat).toHaveBeenCalledTimes(1)
      expect(handleTextFormat).toHaveBeenCalledWith({
        formatName: 'list',
        value: 'bullet',
      })

      const newFormat = { ...initFormat, list: 'bullet' } as const

      rerender({ format: newFormat })
      act(() => result.current.handleUnordered(mockEvent))

      expect(handleTextFormat).toHaveBeenCalledTimes(2)
      expect(handleTextFormat).toHaveBeenCalledWith({
        formatName: 'list',
        value: undefined,
      })
    })
    it('checks handleOrdered', () => {
      const handleTextFormat = jest.fn()
      const initFormat = initialFormatState

      const { rerender, result } = renderHook(
        ({ format }) =>
          useToolbarHandlers({
            editorRef,
            handleTextFormat,
            format,
          }),
        {
          initialProps: {
            format: initFormat,
          },
        }
      )

      act(() => result.current.handleOrdered(mockEvent))

      expect(handleTextFormat).toHaveBeenCalledTimes(1)
      expect(handleTextFormat).toHaveBeenCalledWith({
        formatName: 'list',
        value: 'ordered',
      })

      const newFormat = { ...initFormat, list: 'ordered' } as const

      rerender({ format: newFormat })
      act(() => result.current.handleOrdered(mockEvent))

      expect(handleTextFormat).toHaveBeenCalledTimes(2)
      expect(handleTextFormat).toHaveBeenCalledWith({
        formatName: 'list',
        value: undefined,
      })
    })
  })
})
