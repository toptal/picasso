import React from 'react'
import { Container, Input } from '@toptal/picasso'

import validateValueEditor from '../../services/validate-value-editor'
import type { ValueEditorValidationProps } from '../../types/query-builder'

type Props = {
  value: string
  onChange: (value: string) => void
  className?: string
  inputType?: string
  disabled?: boolean
} & ValueEditorValidationProps

const TextInput = ({
  value,
  className,
  inputType,
  onChange,
  disabled,
  validation,
  touched,
  handleTouched,
}: Props) => {
  const hasError = validateValueEditor({
    validation,
    touched,
  })

  return (
    <Container>
      <Input
        width='full'
        value={value}
        onChange={event => onChange(event.target.value)}
        className={className}
        type={inputType || undefined}
        disabled={disabled}
        onBlur={() => handleTouched?.(true)}
        status={hasError ? 'error' : undefined}
      />
    </Container>
  )
}

export default TextInput
