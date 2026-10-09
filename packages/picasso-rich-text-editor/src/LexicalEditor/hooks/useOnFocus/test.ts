import { renderHook, act } from '@testing-library/react-hooks'

import useOnFocus, { INTERNAL_DIALOG_ATTRIBUTE } from './use-on-focus'

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

  it('calls onFocus once while focus stays inside the editor', () => {
    const onFocus = jest.fn()
    const { result } = renderHook(() => useOnFocus({ onFocus }))

    act(() => {
      result.current.handleFocus(mockEvent)
      result.current.handleFocus(mockEvent)
    })

    expect(onFocus).toHaveBeenCalledTimes(1)
  })

  it('does not blur when focus moves into a plugin dialog', () => {
    const onBlur = jest.fn()
    const dialog = document.createElement('div')
    const input = document.createElement('input')

    dialog.setAttribute(INTERNAL_DIALOG_ATTRIBUTE, '')
    dialog.appendChild(input)

    const { result } = renderHook(() => useOnFocus({ onBlur }))

    act(() => {
      result.current.handleFocus(mockEvent)
    })
    act(() => {
      result.current.handleBlur(getFocusEvent(input))
    })

    expect(result.current.focused).toBe(true)
    expect(onBlur).not.toHaveBeenCalled()
  })

  it('calls onFocus again after a blur', () => {
    const onFocus = jest.fn()
    const { result } = renderHook(() => useOnFocus({ onFocus }))

    act(() => {
      result.current.handleFocus(mockEvent)
    })
    act(() => {
      result.current.handleBlur(mockEvent)
    })
    act(() => {
      result.current.handleFocus(mockEvent)
    })

    expect(onFocus).toHaveBeenCalledTimes(2)
  })

  it("does not blur when focus moves to the dialog's focus guard", () => {
    const onBlur = jest.fn()
    const portal = document.createElement('div')
    const guard = document.createElement('span')
    const dialog = document.createElement('div')

    guard.setAttribute('data-base-ui-focus-guard', '')
    dialog.setAttribute(INTERNAL_DIALOG_ATTRIBUTE, '')
    portal.append(guard, dialog)

    const { result } = renderHook(() => useOnFocus({ onBlur }))

    act(() => {
      result.current.handleFocus(mockEvent)
    })
    act(() => {
      result.current.handleBlur(getFocusEvent(guard))
    })

    expect(onBlur).not.toHaveBeenCalled()
  })

  it('blurs when focus moves to a focus guard of another dialog', () => {
    const onBlur = jest.fn()
    const portal = document.createElement('div')
    const guard = document.createElement('span')

    guard.setAttribute('data-base-ui-focus-guard', '')
    portal.append(guard, document.createElement('div'))

    const { result } = renderHook(() => useOnFocus({ onBlur }))

    act(() => {
      result.current.handleFocus(mockEvent)
    })
    act(() => {
      result.current.handleBlur(getFocusEvent(guard))
    })

    expect(onBlur).toHaveBeenCalledTimes(1)
  })

  it('does not blur when focus moves within the editor', () => {
    const onBlur = jest.fn()
    const wrapper = document.createElement('div')
    const content = document.createElement('div')

    wrapper.appendChild(content)

    const { result } = renderHook(() => useOnFocus({ onBlur }))

    act(() => {
      result.current.handleFocus(mockEvent)
    })
    act(() => {
      result.current.handleBlur({
        relatedTarget: content,
        currentTarget: wrapper,
      } as unknown as React.FocusEvent<HTMLDivElement>)
    })

    expect(onBlur).not.toHaveBeenCalled()
  })
})
