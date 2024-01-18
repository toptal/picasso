import { renderHook } from '@testing-library/react-hooks'
import { act } from '@toptal/picasso-test-utils'
import type React from 'react'

import { actionTypes as toolbarActionTypes } from '../../store/toolbar'
import useOnFocus from './useOnFocus'

const emptyRef = { current: null }
const mockEvent = {
  target: {},
  relatedTarget: {},
} as React.FocusEvent<HTMLDivElement>

describe('useOnFocus', () => {
  describe('handleFocus', () => {
    it('does nothing when editor or toolbar are not rendered', () => {
      const hookOptions = {
        autoFocus: false,
        editorRef: emptyRef,
        toolbarRef: emptyRef,
        wrapperRef: emptyRef,
        onFocus: jest.fn(),
        onBlur: jest.fn(),
        dispatch: jest.fn(),
      }

      const { result } = renderHook(() => useOnFocus(hookOptions))

      const handleFocus = result.current.handleFocus

      act(() => {
        handleFocus(mockEvent)
      })

      expect(hookOptions.dispatch).not.toHaveBeenCalled()
      expect(hookOptions.onFocus).not.toHaveBeenCalled()
      expect(hookOptions.onBlur).not.toHaveBeenCalled()
    })

    it('enables toolbar when clicked inside toolbar', () => {
      const hookOptions = {
        autoFocus: false,
        editorRef: { current: {} } as React.RefObject<HTMLDivElement>,
        toolbarRef: {
          current: { contains: jest.fn().mockImplementation(() => true) },
        } as unknown as React.RefObject<HTMLDivElement>,
        wrapperRef: {
          current: { contains: jest.fn().mockImplementation(() => false) },
        } as unknown as React.RefObject<HTMLDivElement>,
        onFocus: jest.fn(),
        onBlur: jest.fn(),
        dispatch: jest.fn(),
      }

      const { result } = renderHook(() => useOnFocus(hookOptions))

      const handleFocus = result.current.handleFocus

      act(() => {
        handleFocus(mockEvent)
      })

      expect(hookOptions.dispatch).toHaveBeenCalledTimes(1)
      expect(hookOptions.dispatch).toHaveBeenCalledWith({
        payload: false,
        type: toolbarActionTypes.disabled,
      })
      expect(hookOptions.onFocus).not.toHaveBeenCalled()
      expect(hookOptions.onBlur).not.toHaveBeenCalled()
    })
    it('enables toolbar and calls onFocus when clicked inside editor', () => {
      const hookOptions = {
        autoFocus: false,
        editorRef: { current: {} } as React.RefObject<HTMLDivElement>,
        toolbarRef: {
          current: { contains: jest.fn().mockImplementation(() => false) },
        } as unknown as React.RefObject<HTMLDivElement>,
        wrapperRef: {
          current: { contains: jest.fn().mockImplementation(() => false) },
        } as unknown as React.RefObject<HTMLDivElement>,
        onFocus: jest.fn(),
        onBlur: jest.fn(),
        dispatch: jest.fn(),
      }

      const { result } = renderHook(() => useOnFocus(hookOptions))

      const handleFocus = result.current.handleFocus

      act(() => {
        handleFocus(mockEvent)
      })

      expect(hookOptions.dispatch).toHaveBeenCalledTimes(1)
      expect(hookOptions.dispatch).toHaveBeenCalledWith({
        payload: false,
        type: toolbarActionTypes.disabled,
      })
      expect(hookOptions.onFocus).toHaveBeenCalledTimes(1)
      expect(hookOptions.onBlur).not.toHaveBeenCalled()
    })
  })
  describe('handleBlur', () => {
    it('does nothing when editor or toolbar are not rendered', () => {
      const hookOptions = {
        autoFocus: false,
        editorRef: emptyRef,
        toolbarRef: emptyRef,
        wrapperRef: emptyRef,
        onFocus: jest.fn(),
        onBlur: jest.fn(),
        dispatch: jest.fn(),
      }

      const { result } = renderHook(() => useOnFocus(hookOptions))

      const handleBlur = result.current.handleBlur

      act(() => {
        handleBlur(mockEvent)
      })

      expect(hookOptions.dispatch).not.toHaveBeenCalled()
      expect(hookOptions.onBlur).not.toHaveBeenCalled()
      expect(hookOptions.onFocus).not.toHaveBeenCalled()
    })

    it('does nothing when focusElement is in toolbar', () => {
      const hookOptions = {
        autoFocus: false,
        editorRef: {
          contains: jest.fn().mockImplementation(() => false),
        } as unknown as React.RefObject<HTMLDivElement>,
        toolbarRef: {
          current: { contains: jest.fn().mockImplementation(() => true) },
        } as unknown as React.RefObject<HTMLDivElement>,
        wrapperRef: {
          current: { contains: jest.fn().mockImplementation(() => false) },
        } as unknown as React.RefObject<HTMLDivElement>,
        onFocus: jest.fn(),
        onBlur: jest.fn(),
        dispatch: jest.fn(),
      }

      const { result } = renderHook(() => useOnFocus(hookOptions))

      const handleBlur = result.current.handleBlur

      act(() => {
        handleBlur(mockEvent)
      })

      expect(hookOptions.dispatch).not.toHaveBeenCalled()
      expect(hookOptions.onBlur).not.toHaveBeenCalled()
      expect(hookOptions.onFocus).not.toHaveBeenCalled()
    })
    it('does nothing when focusElement is in editor', () => {
      const hookOptions = {
        autoFocus: false,
        editorRef: {
          contains: jest.fn().mockImplementation(() => true),
        } as unknown as React.RefObject<HTMLDivElement>,
        toolbarRef: {
          current: { contains: jest.fn().mockImplementation(() => false) },
        } as unknown as React.RefObject<HTMLDivElement>,
        wrapperRef: {
          current: { contains: jest.fn().mockImplementation(() => false) },
        } as unknown as React.RefObject<HTMLDivElement>,
        onFocus: jest.fn(),
        onBlur: jest.fn(),
        dispatch: jest.fn(),
      }

      const { result } = renderHook(() => useOnFocus(hookOptions))

      const handleBlur = result.current.handleBlur

      act(() => {
        handleBlur(mockEvent)
      })

      expect(hookOptions.dispatch).not.toHaveBeenCalled()
      expect(hookOptions.onBlur).not.toHaveBeenCalled()
      expect(hookOptions.onFocus).not.toHaveBeenCalled()
    })
    it('disables toolbar and calls onBlur when clicked outside the editor or toolbar', () => {
      const hookOptions = {
        autoFocus: false,
        editorRef: {
          current: { contains: jest.fn().mockImplementation(() => false) },
        } as unknown as React.RefObject<HTMLDivElement>,
        toolbarRef: {
          current: { contains: jest.fn().mockImplementation(() => false) },
        } as unknown as React.RefObject<HTMLDivElement>,
        wrapperRef: {
          current: { contains: jest.fn().mockImplementation(() => false) },
        } as unknown as React.RefObject<HTMLDivElement>,
        onFocus: jest.fn(),
        onBlur: jest.fn(),
        dispatch: jest.fn(),
      }

      const { result } = renderHook(() => useOnFocus(hookOptions))

      const handleBlur = result.current.handleBlur

      act(() => {
        handleBlur(mockEvent)
      })

      expect(hookOptions.dispatch).toHaveBeenCalledTimes(2)
      expect(hookOptions.dispatch).toHaveBeenCalledWith({
        payload: true,
        type: toolbarActionTypes.disabled,
      })
      expect(hookOptions.dispatch).toHaveBeenCalledWith({
        type: toolbarActionTypes.resetFormat,
      })
      expect(hookOptions.onBlur).toHaveBeenCalledTimes(1)
      expect(hookOptions.onFocus).not.toHaveBeenCalled()
    })
  })
})
