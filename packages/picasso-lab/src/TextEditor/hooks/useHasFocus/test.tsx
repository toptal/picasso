import { act } from '@toptal/picasso/test-utils'
import Quill, { RangeStatic } from 'quill'
import { renderHook } from '@testing-library/react-hooks'

import useHasFocus, { getHandler } from './useHasFocus'

const mockRange = { index: 0, length: 0 } as RangeStatic

describe('useHasFocus', () => {
  describe('handler', () => {
    it('does nothing without editors instance', () => {
      const ref = {
        current: undefined
      }
      const setHasFocus = jest.fn()

      const handler = getHandler(ref, setHasFocus)

      act(() => handler(mockRange, mockRange, 'user'))

      expect(setHasFocus).not.toHaveBeenCalled()
    })

    it('does nothing when event is triggered as silent', () => {
      const ref = {
        current: ({
          hasFocus: jest.fn().mockImplementation(() => true)
        } as unknown) as Quill
      }
      const setHasFocus = jest.fn()
      const handler = getHandler(ref, setHasFocus)

      act(() => handler(mockRange, mockRange, 'silent'))

      expect(ref.current.hasFocus).not.toHaveBeenCalled()
      expect(setHasFocus).not.toHaveBeenCalled()
    })

    it('sets hasFocus state', () => {
      const ref = {
        current: ({
          hasFocus: jest.fn().mockImplementation(() => true)
        } as unknown) as Quill
      }
      const setHasFocus = jest.fn()
      const handler = getHandler(ref, setHasFocus)

      act(() => handler(mockRange, mockRange, 'user'))

      expect(ref.current.hasFocus).toHaveBeenCalledTimes(1)
      expect(setHasFocus).toHaveBeenCalledWith(true)
    })
  })
  describe('hook', () => {
    it('returns hasFocus', () => {
      const ref = {
        current: ({
          hasFocus: jest.fn()
        } as unknown) as Quill
      }

      const { result } = renderHook(() => useHasFocus({ ref }))

      expect(result.current.hasFocus).toBe(false)
    })
  })
})
