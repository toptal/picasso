import { renderHook } from '@testing-library/react-hooks'
import Quill from 'quill'
import React from 'react'
import { act } from '@toptal/picasso/test-utils'

import { HeaderValueType, ActionCreatorsType } from '../../types'
import { EMPTY_STATE } from '../../constants'
import useToolbarHandlers from './useToolbarHandlers'

const ref = {
  current: ({
    format: jest.fn(),
    focus: jest.fn(),
    hasFocus: jest.fn()
  } as unknown) as Quill
}

const actions: ActionCreatorsType = {
  setBold: jest.fn(),
  setHeader: jest.fn(),
  setItalic: jest.fn(),
  setList: jest.fn()
}

const mockButtonEvent = {} as React.MouseEvent<HTMLButtonElement>

const getMockedHeaderEventWithValue = (value?: HeaderValueType) =>
  ({ target: { value } } as React.ChangeEvent<{
    value: HeaderValueType
  }>)

describe('useToolbarHandlers', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('handles header format', async () => {
    const { result } = renderHook(() =>
      useToolbarHandlers({ ref, toolbarState: EMPTY_STATE, actions })
    )

    const { handleHeader } = result.current

    const mockEventSelect = getMockedHeaderEventWithValue('3')
    const mockEventUnselect = getMockedHeaderEventWithValue()

    handleHeader(mockEventSelect)
    expect(ref.current.format).toHaveBeenCalledWith('header', 3)

    handleHeader(mockEventUnselect)
    expect(ref.current.format).toHaveBeenCalledWith('header', false)
  })

  describe('bold', () => {
    it('handles bold format with empty state', () => {
      const { result } = renderHook(
        ({ toolbarState }) =>
          useToolbarHandlers({ ref, toolbarState, actions }),
        {
          initialProps: {
            toolbarState: EMPTY_STATE
          }
        }
      )

      const { handleBold } = result.current

      act(() => {
        handleBold(mockButtonEvent)
      })
      expect(ref.current.format).toHaveBeenCalledWith('bold', true)
      expect(actions.setBold).toHaveBeenCalledWith(true)
    })
    it('handles bold format with state', () => {
      const { result } = renderHook(
        ({ toolbarState }) =>
          useToolbarHandlers({ ref, toolbarState, actions }),
        {
          initialProps: {
            toolbarState: { ...EMPTY_STATE, bold: true } as const
          }
        }
      )

      const { handleBold } = result.current

      act(() => {
        handleBold(mockButtonEvent)
      })
      expect(ref.current.format).toHaveBeenCalledWith('bold', false)
      expect(actions.setBold).toHaveBeenCalledWith(false)
    })
  })

  describe('italic', () => {
    it('handles italic format with empty state', () => {
      const { result } = renderHook(
        ({ toolbarState }) =>
          useToolbarHandlers({ ref, toolbarState, actions }),
        {
          initialProps: {
            toolbarState: EMPTY_STATE
          }
        }
      )

      const { handleItalic } = result.current

      act(() => {
        handleItalic(mockButtonEvent)
      })
      expect(ref.current.format).toHaveBeenCalledWith('italic', true)
      expect(actions.setItalic).toHaveBeenCalledWith(true)
    })
    it('handles italic format with state', () => {
      const { result } = renderHook(
        ({ toolbarState }) =>
          useToolbarHandlers({ ref, toolbarState, actions }),
        {
          initialProps: {
            toolbarState: { ...EMPTY_STATE, italic: true } as const
          }
        }
      )

      const { handleItalic } = result.current

      act(() => {
        handleItalic(mockButtonEvent)
      })
      expect(ref.current.format).toHaveBeenCalledWith('italic', false)
      expect(actions.setItalic).toHaveBeenCalledWith(false)
    })
  })

  describe('ordered list', () => {
    it('handles ordered list format with empty state', () => {
      const { result } = renderHook(
        ({ toolbarState }) =>
          useToolbarHandlers({ ref, toolbarState, actions }),
        {
          initialProps: {
            toolbarState: EMPTY_STATE
          }
        }
      )

      const { handleOrdered } = result.current

      act(() => {
        handleOrdered(mockButtonEvent)
      })
      expect(ref.current.format).toHaveBeenCalledWith('list', 'ordered')
    })
    it('handles ordered list format with state', () => {
      const { result } = renderHook(
        ({ toolbarState }) =>
          useToolbarHandlers({ ref, toolbarState, actions }),
        {
          initialProps: {
            toolbarState: {
              ...EMPTY_STATE,
              list: 'ordered'
            } as const
          }
        }
      )

      const { handleOrdered } = result.current

      act(() => {
        handleOrdered(mockButtonEvent)
      })
      expect(ref.current.format).toHaveBeenCalledWith('list', false)
    })
  })
  describe('unordered list', () => {
    it('handles unordered list format with empty state', () => {
      const { result } = renderHook(
        ({ toolbarState }) =>
          useToolbarHandlers({ ref, toolbarState, actions }),
        {
          initialProps: {
            toolbarState: EMPTY_STATE
          }
        }
      )

      const { handleUnordered } = result.current

      act(() => {
        handleUnordered(mockButtonEvent)
      })
      expect(ref.current.format).toHaveBeenCalledWith('list', 'bullet')
    })
    it('handles ordered list format with state', () => {
      const { result } = renderHook(
        ({ toolbarState }) =>
          useToolbarHandlers({ ref, toolbarState, actions }),
        {
          initialProps: {
            toolbarState: {
              ...EMPTY_STATE,
              list: 'bullet'
            } as const
          }
        }
      )

      const { handleUnordered } = result.current

      act(() => {
        handleUnordered(mockButtonEvent)
      })
      expect(ref.current.format).toHaveBeenCalledWith('list', false)
    })
  })
})
