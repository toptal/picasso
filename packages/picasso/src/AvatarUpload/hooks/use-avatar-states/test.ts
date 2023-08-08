import { act, renderHook } from '@testing-library/react-hooks'

import useAvatarStates from './use-avatar-states'

describe('useAvatarStates', () => {
  it('returns hovered state as true', () => {
    const { result } = renderHook(() => useAvatarStates({ autoHover: true }))

    expect(result.current.hovered).toBe(true)
  })

  describe('when auto-focus is true', () => {
    it('returns isFocused state as true', () => {
      const { result } = renderHook(() => useAvatarStates({ autoFocus: true }))

      expect(result.current.isFocused).toBe(true)
    })
  })

  describe('when auto-focus is false', () => {
    it('returns isFocused state as false', () => {
      const { result } = renderHook(() => useAvatarStates({ autoFocus: false }))

      expect(result.current.isFocused).toBeFalsy()
    })

    describe('when dropzone is focused', () => {
      it('returns isFocused state as true', () => {
        const { result } = renderHook(() =>
          useAvatarStates({ isDropzoneFocused: true })
        )

        expect(result.current.isFocused).toBe(true)
      })
    })
  })

  describe('when default active is true', () => {
    it('returns isDragActive state as true', () => {
      const { result } = renderHook(() =>
        useAvatarStates({ defaultActive: true })
      )

      expect(result.current.isDragActive).toBe(true)
    })
  })

  describe('when default active is false', () => {
    it('returns isDragActive state as false', () => {
      const { result } = renderHook(() =>
        useAvatarStates({ defaultActive: false })
      )

      expect(result.current.isDragActive).toBeFalsy()
    })

    describe('when dropzone is active', () => {
      it('returns isDragActive state as true', () => {
        const { result } = renderHook(() =>
          useAvatarStates({ isDropzoneDragActive: true })
        )

        expect(result.current.isDragActive).toBe(true)
      })
    })
  })

  it('returns hovered state as true after onMouseEnter call', () => {
    const { result } = renderHook(() => useAvatarStates({}))

    act(() => {
      result.current.onMouseEnter()
    })

    expect(result.current.hovered).toBe(true)
  })

  it('returns hovered state as false after onMouseLeave call', () => {
    const { result } = renderHook(() => useAvatarStates({ autoHover: true }))

    act(() => {
      result.current.onMouseLeave()
    })

    expect(result.current.hovered).toBe(false)
  })
})
