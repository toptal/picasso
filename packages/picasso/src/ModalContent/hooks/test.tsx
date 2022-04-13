import { RefObject } from 'react'
import { renderHook } from '@testing-library/react-hooks'

import useScrollableShades from './use-scrollable-shades'

jest.mock('debounce', () => ({
  __esModule: true,
  default: (fn: Function) => fn
}))

interface currentProps {
  scrollTop?: number
  clientHeight?: number
  scrollHeight?: number
  addEventListener?: Function
  removeEventListener?: Function
}

interface testRefProps {
  current?: currentProps
}

describe('useScrollableShades', () => {
  const windowAddEventListenerOriginal = window.addEventListener
  const windowRemoveEventListenerOriginal = window.removeEventListener

  beforeAll(() => {
    window.addEventListener = jest.fn()
    window.removeEventListener = jest.fn()
  })

  afterAll(() => {
    window.addEventListener = windowAddEventListenerOriginal
    window.removeEventListener = windowRemoveEventListenerOriginal
  })

  const getTestRef = (currentUpdates?: currentProps) => {
    const testRef: testRefProps = {
      current: currentUpdates
        ? {
            scrollTop: 0,
            clientHeight: 0,
            scrollHeight: 100,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            ...currentUpdates
          }
        : undefined
    }

    return testRef
  }

  const renderScrollableShadesHook = (ref: testRefProps) => {
    const {
      result: { current }
    } = renderHook(() =>
      useScrollableShades(ref as unknown as RefObject<HTMLDivElement>)
    )

    return current
  }

  describe('when no current object', () => {
    it('returns top = false and bottom = false', () => {
      const testRef = getTestRef(undefined)
      const { top, bottom } = renderScrollableShadesHook(testRef)

      expect(top).toBeFalsy()
      expect(bottom).toBeFalsy()
    })
  })

  describe('when clientHeight === scrollHeight', () => {
    it('returns top = false and bottom = false', () => {
      const testRef = getTestRef({
        clientHeight: 100,
        scrollHeight: 100
      })

      const { top, bottom } = renderScrollableShadesHook(testRef)

      expect(top).toBeFalsy()
      expect(bottom).toBeFalsy()
    })
  })

  describe('when sum of scrollTop and clientHeight less then scrollHeight', () => {
    it('returns top = true and bottom = true', () => {
      const testRef = getTestRef({
        scrollTop: 10,
        clientHeight: 50,
        scrollHeight: 100
      })

      const { top, bottom } = renderScrollableShadesHook(testRef)

      expect(top).toBeTruthy()
      expect(bottom).toBeTruthy()
    })
  })

  describe('when sum of scrollTop and clientHeight not less then scrollHeight', () => {
    it('returns top = true and bottom = false', () => {
      const testRef = getTestRef({
        scrollTop: 50,
        clientHeight: 50,
        scrollHeight: 100
      })

      const { top, bottom } = renderScrollableShadesHook(testRef)

      expect(top).toBeTruthy()
      expect(bottom).toBeFalsy()
    })
  })

  describe('when scrollTop gives an edge value for a zoomed view', () => {
    it('returns top = true and bottom = false', () => {
      const testRef = getTestRef({
        scrollTop: 49.654, // may give a bug without rounding
        clientHeight: 50,
        scrollHeight: 100
      })

      const { top, bottom } = renderScrollableShadesHook(testRef)

      expect(top).toBeTruthy()
      expect(bottom).toBeFalsy()
    })
  })
})
