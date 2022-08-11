import { useCallback, useState } from 'react'

export interface Props {
  isDragActive: boolean
  focused?: boolean
  hovered?: boolean
  src?: string
  uploading?: boolean
}

const useAvatarUpload = ({
  isDragActive,
  src,
  focused: initiallyFocused,
  hovered: initiallyHovered,
  uploading,
}: Props) => {
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

  const sourceFileExist = src !== undefined && src !== ''
  const showImageAvatar = sourceFileExist && !isDragActive
  const showUploadIcon =
    ((sourceFileExist && hovered) || !sourceFileExist) && !uploading
  const showLoadingIcon = !!uploading

  return {
    focused,
    hovered,
    sourceFileExist,
    showImageAvatar,
    showUploadIcon,
    showLoadingIcon,

    callbacks: {
      onFocus,
      onBlur,
      onMouseEnter,
      onMouseLeave,
    },
  }
}

export default useAvatarUpload
