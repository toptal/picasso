import { useEffect, useState } from 'react'

interface Props {
  /** Indicate whether component has focused state by default */
  autoFocus?: boolean
  /** Indicate whether component has hovered state by default */
  autoHover?: boolean
  /** Indicate whether component has active state as default */
  defaultActive?: boolean
  /** Indicate whether the dropzone component got focused */
  isDropzoneFocused?: boolean
  /** Indicate whether the dropzone component got active dragging */
  isDropzoneDragActive?: boolean
}

interface ReturnValue {
  /** Whether the component is currently hovered */
  hovered: boolean
  /** Whether the component is currently focused */
  isFocused: boolean
  /** Whether the component is currently active */
  isDragActive: boolean
  /** Callback for when the mouse enters the component */
  onMouseEnter: () => void
  /** Callback for when the mouse leaves the component */
  onMouseLeave: () => void
}

const useAvatarStates = (props: Props): ReturnValue => {
  const {
    autoHover,
    autoFocus,
    defaultActive,
    isDropzoneFocused,
    isDropzoneDragActive,
  } = props

  const [{ initiallyFocused, initiallyActive, hovered }, setVisualStates] =
    useState<{
      hovered: boolean
      initiallyFocused: boolean
      initiallyActive: boolean
    }>({
      hovered: Boolean(autoHover),
      initiallyFocused: Boolean(autoFocus),
      initiallyActive: Boolean(defaultActive),
    })

  const onMouseEnter = () => {
    setVisualStates(oldState => ({ ...oldState, hovered: true }))
  }

  const onMouseLeave = () => {
    setVisualStates(oldState => ({ ...oldState, hovered: false }))
  }

  useEffect(() => {
    if (initiallyActive && isDropzoneDragActive) {
      setVisualStates(oldState => ({ ...oldState, initiallyActive: false }))
    }
  }, [initiallyActive, isDropzoneDragActive])

  useEffect(() => {
    if (initiallyFocused && isDropzoneFocused) {
      setVisualStates(oldState => ({ ...oldState, initiallyFocused: false }))
    }
  }, [initiallyFocused, isDropzoneFocused])

  return {
    hovered,
    onMouseEnter,
    onMouseLeave,
    isFocused: Boolean(initiallyFocused || isDropzoneFocused),
    isDragActive: Boolean(initiallyActive || isDropzoneDragActive),
  }
}

export default useAvatarStates
