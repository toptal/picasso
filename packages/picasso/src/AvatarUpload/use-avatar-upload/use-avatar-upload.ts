import { useCallback, useState } from 'react'

export type Props = {
  focused?: boolean
  hovered?: boolean
  uploading?: boolean
  src?: string
}

export const useAvatarUpload = (props: Props) => {
  const {
    focused: initiallyFocused,
    hovered: initiallyHovered,
    uploading,
    src,
  } = props

  const [focused, setFocused] = useState(initiallyFocused)
  const [hovered, setHovered] = useState(initiallyHovered)

  const onFocus = useCallback(() => {
    setFocused(true)
  }, [])

  const onBlur = useCallback(() => {
    setFocused(false)
  }, [])

  const onMouseEnter = useCallback(() => {
    setHovered(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setHovered(false)
  }, [])

  const callbacks = {
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
  }

  const showLoader = Boolean(uploading)
  const showAvatar = !showLoader && Boolean(src)
  const showUploadIcon = !showAvatar && !showLoader

  return {
    callbacks,
    focused,
    hovered,
    showUploadIcon,
    showLoader,
    showAvatar,
  }
}

export default useAvatarUpload
