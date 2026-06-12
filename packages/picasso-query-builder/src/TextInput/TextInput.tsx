import React from 'react'
import { Container } from '@toptal/picasso-container'
import { Input } from '@toptal/picasso-input'
import type { CommonSubComponentProps } from 'react-querybuilder'

import { validateValueEditor } from '../utils'
import type { ValueEditorValidationProps } from '../types/query-builder'
import { rootClassName } from '../ValueEditor/styles'

type Props = {
  value: string
  handleOnChange: (value: string) => void
  className?: string
  inputType?: string
  disabled?: boolean
  valueEditorTestId?: string
} & ValueEditorValidationProps &
  Pick<CommonSubComponentProps, 'context'>

export const TextInput = ({
  value,
  className,
  inputType,
  handleOnChange,
  disabled,
  validation,
  touched,
  handleTouched,
  valueEditorTestId,
}: Props) => {
  const hasError = validateValueEditor({
    validation,
    touched,
  })

  return (
    <Container className={rootClassName}>
      <Input
        width='full'
        value={value}
        onChange={event => handleOnChange(event.target.value)}
        className={className}
        type={inputType || undefined}
        disabled={disabled}
        onBlur={() => handleTouched?.(true)}
        status={hasError ? 'error' : undefined}
        data-testid={valueEditorTestId}
      />
    </Container>
  )
}
