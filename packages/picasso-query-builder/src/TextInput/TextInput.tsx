import React from 'react'
import { Container, Input } from '@toptal/picasso'
import { makeStyles } from '@material-ui/core/styles'

import validateValueEditor from '../utils/validate-value-editor'
import type { ValueEditorValidationProps } from '../types/query-builder'
import styles from '../ValueEditor/styles'

type Props = {
  value: string
  onChange: (value: string) => void
  className?: string
  inputType?: string
  disabled?: boolean
} & ValueEditorValidationProps

const useStyles = makeStyles(styles)

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
  const classes = useStyles()

  const hasError = validateValueEditor({
    validation,
    touched,
  })

  return (
    <Container className={classes.root}>
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
