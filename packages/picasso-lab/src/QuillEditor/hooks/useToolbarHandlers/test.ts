import { renderHook } from '@testing-library/react-hooks'
import Quill from 'quill'
import React from 'react'
import { act } from '@toptal/picasso/test-utils'

import { HeaderValue } from '../../types'
import useToolbarHandlers from './useToolbarHandlers'

const mockQuill = ({
  format: jest.fn(),
  focus: jest.fn(),
  hasFocus: jest.fn(),
  getFormat: jest.fn().mockImplementation(() => ({}))
} as unknown) as Quill

const mockButtonEvent = {} as React.MouseEvent<HTMLButtonElement>

const getMockedHeaderEventWithValue = (value?: HeaderValue) =>
  ({ target: { value } } as React.ChangeEvent<{
    value: HeaderValue
  }>)

describe('useToolbarHandlers', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('handles header format', async () => {
    const quill = mockQuill
    const handleTextFormat = jest.fn()

    const { result } = renderHook(() =>
      useToolbarHandlers({ quill, handleTextFormat })
    )

    const { handleHeader } = result.current.toolbarHandlers

    const mockEventSelect = getMockedHeaderEventWithValue('3')
    const mockEventUnselect = getMockedHeaderEventWithValue()

    act(() => {
      if (handleHeader) {
        handleHeader(mockEventSelect)
      }
    })

    expect(quill.format).toHaveBeenCalledWith('header', 3)

    act(() => {
      if (handleHeader) {
        handleHeader(mockEventUnselect)
      }
    })

    expect(quill.format).toHaveBeenCalledWith('header', false)
  })

  it('handles bold', () => {
    const quill = mockQuill
    const handleTextFormat = jest.fn()

    const { result } = renderHook(() =>
      useToolbarHandlers({ quill, handleTextFormat })
    )

    const { handleBold } = result.current.toolbarHandlers

    act(() => {
      if (handleBold) {
        handleBold(mockButtonEvent)
      }
    })
    expect(quill.format).toHaveBeenCalledWith('bold', true)
    expect(handleTextFormat).toHaveBeenCalledWith('bold', true)
  })
  it('handles italic', () => {
    const quill = mockQuill
    const handleTextFormat = jest.fn()

    const { result } = renderHook(() =>
      useToolbarHandlers({ quill, handleTextFormat })
    )

    const { handleItalic } = result.current.toolbarHandlers

    act(() => {
      if (handleItalic) {
        handleItalic(mockButtonEvent)
      }
    })
    expect(quill.format).toHaveBeenCalledWith('italic', true)
    expect(handleTextFormat).toHaveBeenCalledWith('italic', true)
  })
  describe('list', () => {
    it('handles ordered', () => {
      const quill = mockQuill
      const handleTextFormat = jest.fn()

      const { result } = renderHook(() =>
        useToolbarHandlers({ quill, handleTextFormat })
      )

      const { handleOrdered } = result.current.toolbarHandlers

      act(() => {
        if (handleOrdered) {
          handleOrdered(mockButtonEvent)
        }
      })
      expect(quill.format).toHaveBeenCalledWith('list', 'ordered')
    })
    it('handles unordered', () => {
      const quill = mockQuill
      const handleTextFormat = jest.fn()

      const { result } = renderHook(() =>
        useToolbarHandlers({ quill, handleTextFormat })
      )

      const { handleUnordered } = result.current.toolbarHandlers

      act(() => {
        if (handleUnordered) {
          handleUnordered(mockButtonEvent)
        }
      })
      expect(quill.format).toHaveBeenCalledWith('list', 'bullet')
    })
  })
})
