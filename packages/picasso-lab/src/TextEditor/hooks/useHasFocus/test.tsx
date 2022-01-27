import Quill, { RangeStatic } from 'quill'
import { renderHook } from '@testing-library/react-hooks'
import { act } from '@toptal/picasso/test-utils'

import useHasFocus, { getSelectionChangeHandler } from './useHasFocus'

const mockRange = { index: 0, length: 0 } as RangeStatic

describe('useHasFocus', () => {
  describe('handler', () => {
    it('does nothing without editors instance', () => {
      const quill = undefined
      const setHasFocus = jest.fn()

      const handler = getSelectionChangeHandler(quill, setHasFocus)

      act(() => handler(mockRange, mockRange, 'user'))

      expect(setHasFocus).not.toHaveBeenCalled()
    })

    it('does nothing when event is triggered as silent', () => {
      const quill = ({
        hasFocus: jest.fn().mockImplementation(() => true)
      } as unknown) as Quill
      const setHasFocus = jest.fn()
      const handler = getSelectionChangeHandler(quill, setHasFocus)

      act(() => handler(mockRange, mockRange, 'silent'))

      expect(quill.hasFocus).not.toHaveBeenCalled()
      expect(setHasFocus).not.toHaveBeenCalled()
    })

    it('sets hasFocus state', () => {
      const quill = ({
        hasFocus: jest.fn().mockImplementation(() => true)
      } as unknown) as Quill
      const setHasFocus = jest.fn()
      const handler = getSelectionChangeHandler(quill, setHasFocus)

      act(() => handler(mockRange, mockRange, 'user'))

      expect(quill.hasFocus).toHaveBeenCalledTimes(1)
      expect(setHasFocus).toHaveBeenCalledWith(true)
    })
  })
  describe('hook', () => {
    it('returns hasFocus false on first render', () => {
      const quill = ({
        hasFocus: jest.fn(),
        on: jest.fn(),
        off: jest.fn()
      } as unknown) as Quill

      const { result } = renderHook(() => useHasFocus({ quill }))

      expect(result.current.hasFocus).toBe(false)
    })
  })
})
