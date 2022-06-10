import React, { FocusEvent, useCallback } from 'react'
import {
  PasswordInput as PicassoPasswordInput,
  PasswordInputProps,
} from '@toptal/picasso'

interface FieldRendererProps extends PasswordInputProps {
  onShowContent: () => void
  onHideContent: () => void
}
const FieldRenderer = (props: FieldRendererProps) => {
  const { onFocus, onBlur, onShowContent, onHideContent, ...rest } = props

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      onFocus?.(event)

      onShowContent()
    },
    [onFocus, onShowContent]
  )

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      onBlur?.(event)

      onHideContent()
    },
    [onBlur, onHideContent]
  )

  return (
    <PicassoPasswordInput {...rest} onFocus={handleFocus} onBlur={handleBlur} />
  )
}

export default FieldRenderer
