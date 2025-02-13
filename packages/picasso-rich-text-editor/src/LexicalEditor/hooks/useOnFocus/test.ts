import { renderHook, act } from '@testing-library/react-hooks'

import useOnFocus from './use-on-focus'

let mockEvent: React.FocusEvent<HTMLDivElement>

const getFocusEvent = (
  relatedTarget: HTMLElement = document.createElement('div')
) =>
  ({
    relatedTarget,
  } as unknown as React.FocusEvent<HTMLDivElement>)

describe('useOnFocus', () => {
  beforeEach(() => {
    mockEvent = getFocusEvent()
  })

  it('sets `focused` to true when handleFocus is called', () => {
    const onFocus = jest.fn()
    const { result } = renderHook(() => useOnFocus({ onFocus }))

    act(() => {
      result.current.handleFocus(mockEvent)
    })

    expect(result.current.focused).toBe(true)
    expect(onFocus).toHaveBeenCalledTimes(1)
  })

  describe('when internalRefs is passed', () => {
    describe('when handleBlur is called and the focus is not on an internal element', () => {
      it('sets `focused` to false', () => {
        const onBlur = jest.fn()
        const internalRefs = [{ current: document.createElement('div') }]
        const { result } = renderHook(() =>
          useOnFocus({ onBlur, internalRefs })
        )

        // Simulating handleFocus to make focused true initially
        act(() => {
          result.current.handleFocus(mockEvent)
        })

        act(() => {
          result.current.handleBlur(mockEvent)
        })

        expect(result.current.focused).toBe(false)
        expect(onBlur).toHaveBeenCalledTimes(1)
      })
    })

    describe('when handleBlur is called and the focus is on an internal element', () => {
      it('does not set `focused` to false', () => {
        const onBlur = jest.fn()
        const internalRefs = [{ current: document.createElement('div') }]
        const { result } = renderHook(() =>
          useOnFocus({ onBlur, internalRefs })
        )

        // Simulating handleFocus to make focused true initially
        act(() => {
          result.current.handleFocus(mockEvent)
        })

        act(() => {
          result.current.handleBlur(getFocusEvent(internalRefs[0].current))
        })

        expect(result.current.focused).toBe(true)
        expect(onBlur).toHaveBeenCalledTimes(0)
      })
    })
  })
})
