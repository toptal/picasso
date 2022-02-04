import React from 'react'
import { act } from '@toptal/picasso/test-utils'
import { renderHook } from '@testing-library/react-hooks'

import { HeaderValue } from './../../../QuillEditor/types'
import useToolbarHandlers from './useToolbarHandlers'
import { initialState } from './../../store'

const initialFormatState = initialState.toolbar.format
const mockEvent = {} as React.MouseEvent<HTMLButtonElement, MouseEvent>

type SelectEvent = React.ChangeEvent<{
  value: HeaderValue
}>

describe('useToolbarHandlers', () => {
  describe('calls handleTextFormat with proper arguments', () => {
    it('checks handleBold', () => {
      const handleTextFormat = jest.fn()
      const initFormat = initialFormatState

      const { rerender, result } = renderHook(
        ({ format }) => useToolbarHandlers({ handleTextFormat, format }),
        {
          initialProps: {
            format: initFormat
          }
        }
      )

      act(() => result.current.handleBold(mockEvent))

      expect(handleTextFormat).toHaveBeenCalledTimes(1)
      expect(handleTextFormat).toHaveBeenCalledWith('bold', !initFormat.bold)

      const newFormat = { ...initFormat, bold: true }

      rerender({ format: newFormat })
      act(() => result.current.handleBold(mockEvent))

      expect(handleTextFormat).toHaveBeenCalledTimes(2)
      expect(handleTextFormat).toHaveBeenCalledWith('bold', !newFormat.bold)
    })
    it('checks handleItalic', () => {
      const handleTextFormat = jest.fn()
      const initFormat = initialFormatState

      const { rerender, result } = renderHook(
        ({ format }) => useToolbarHandlers({ handleTextFormat, format }),
        {
          initialProps: {
            format: initFormat
          }
        }
      )

      act(() => result.current.handleItalic(mockEvent))

      expect(handleTextFormat).toHaveBeenCalledTimes(1)
      expect(handleTextFormat).toHaveBeenCalledWith(
        'italic',
        !initFormat.italic
      )

      const newFormat = { ...initFormat, italic: true }

      rerender({ format: newFormat })
      act(() => result.current.handleItalic(mockEvent))

      expect(handleTextFormat).toHaveBeenCalledTimes(2)
      expect(handleTextFormat).toHaveBeenCalledWith('italic', !newFormat.italic)
    })
    it('checks handleHeader', () => {
      const handleTextFormat = jest.fn()
      const initFormat = initialFormatState

      const { result } = renderHook(() =>
        useToolbarHandlers({ handleTextFormat, format: initFormat })
      )

      act(() =>
        result.current.handleHeader({ target: { value: '3' } } as SelectEvent)
      )

      expect(handleTextFormat).toHaveBeenCalledTimes(1)
      expect(handleTextFormat).toHaveBeenCalledWith('header', '3')

      act(() =>
        result.current.handleHeader({ target: { value: '' } } as SelectEvent)
      )

      expect(handleTextFormat).toHaveBeenCalledTimes(2)
      expect(handleTextFormat).toHaveBeenCalledWith('header', '')
    })
    it('checks handleUnordered', () => {
      const handleTextFormat = jest.fn()
      const initFormat = initialFormatState

      const { rerender, result } = renderHook(
        ({ format }) => useToolbarHandlers({ handleTextFormat, format }),
        {
          initialProps: {
            format: initFormat
          }
        }
      )

      act(() => result.current.handleUnordered(mockEvent))

      expect(handleTextFormat).toHaveBeenCalledTimes(1)
      expect(handleTextFormat).toHaveBeenCalledWith('list', 'bullet')

      const newFormat = { ...initFormat, list: 'bullet' } as const

      rerender({ format: newFormat })
      act(() => result.current.handleUnordered(mockEvent))

      expect(handleTextFormat).toHaveBeenCalledTimes(2)
      expect(handleTextFormat).toHaveBeenCalledWith('list', false)
    })
    it('checks handleOrdered', () => {
      const handleTextFormat = jest.fn()
      const initFormat = initialFormatState

      const { rerender, result } = renderHook(
        ({ format }) => useToolbarHandlers({ handleTextFormat, format }),
        {
          initialProps: {
            format: initFormat
          }
        }
      )

      act(() => result.current.handleOrdered(mockEvent))

      expect(handleTextFormat).toHaveBeenCalledTimes(1)
      expect(handleTextFormat).toHaveBeenCalledWith('list', 'ordered')

      const newFormat = { ...initFormat, list: 'ordered' } as const

      rerender({ format: newFormat })
      act(() => result.current.handleOrdered(mockEvent))

      expect(handleTextFormat).toHaveBeenCalledTimes(2)
      expect(handleTextFormat).toHaveBeenCalledWith('list', false)
    })
  })
})
