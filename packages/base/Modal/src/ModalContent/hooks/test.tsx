import type { RefObject } from 'react'
import { renderHook } from '@testing-library/react-hooks'

import useScrollableShades from './use-scrollable-shades'

jest.mock('debounce', () => ({
  __esModule: true,
  default: (fn: Function & { clear: () => void }) => {
    fn.clear = jest.fn()

    return fn
  },
}))

describe('useScrollableShades', () => {
  const getTestRef = () => {
    const el = document.createElement('div')

    return { current: el }
  }

  const renderScrollableShadesHook = (ref: RefObject<HTMLDivElement>) => {
    const {
      result: { current },
    } = renderHook(() => useScrollableShades(ref))

    return current
  }

  describe('when no current object', () => {
    it('returns top = false and bottom = false', () => {
      const testRef = getTestRef()
      const { top, bottom } = renderScrollableShadesHook(testRef)

      expect(top).toBeFalsy()
      expect(bottom).toBeFalsy()
    })
  })

  describe('when clientHeight === scrollHeight', () => {
    it('returns top = false and bottom = false', () => {
      const testRef = getTestRef()

      jest.spyOn(testRef.current, 'clientHeight', 'get').mockReturnValue(100)
      jest.spyOn(testRef.current, 'scrollHeight', 'get').mockReturnValue(100)

      const { top, bottom } = renderScrollableShadesHook(testRef)

      expect(top).toBeFalsy()
      expect(bottom).toBeFalsy()
    })
  })

  describe('when sum of scrollTop and clientHeight less then scrollHeight', () => {
    it('returns top = true and bottom = true', () => {
      const testRef = getTestRef()

      jest.spyOn(testRef.current, 'scrollTop', 'get').mockReturnValue(10)
      jest.spyOn(testRef.current, 'clientHeight', 'get').mockReturnValue(50)
      jest.spyOn(testRef.current, 'scrollHeight', 'get').mockReturnValue(100)

      const { top, bottom } = renderScrollableShadesHook(testRef)

      expect(top).toBeTruthy()
      expect(bottom).toBeTruthy()
    })
  })

  describe('when sum of scrollTop and clientHeight not less then scrollHeight', () => {
    it('returns top = true and bottom = false', () => {
      const testRef = getTestRef()

      jest.spyOn(testRef.current, 'scrollTop', 'get').mockReturnValue(50)
      jest.spyOn(testRef.current, 'clientHeight', 'get').mockReturnValue(50)
      jest.spyOn(testRef.current, 'scrollHeight', 'get').mockReturnValue(100)

      const { top, bottom } = renderScrollableShadesHook(testRef)

      expect(top).toBeTruthy()
      expect(bottom).toBeFalsy()
    })
  })

  describe('when scrollTop gives an edge value for a zoomed view', () => {
    it('returns top = true and bottom = false', () => {
      const testRef = getTestRef()

      jest.spyOn(testRef.current, 'scrollTop', 'get').mockReturnValue(49.654)
      jest.spyOn(testRef.current, 'clientHeight', 'get').mockReturnValue(50)
      jest.spyOn(testRef.current, 'scrollHeight', 'get').mockReturnValue(100)

      const { top, bottom } = renderScrollableShadesHook(testRef)

      expect(top).toBeTruthy()
      expect(bottom).toBeFalsy()
    })
  })
})
