import React from 'react'
import { Container, Input } from '@toptal/picasso'
import { makeStyles } from '@material-ui/core/styles'
import type { CommonSubComponentProps } from 'react-querybuilder'

import { validateValueEditor } from '../utils'
import type { ValueEditorValidationProps } from '../types/query-builder'
import styles from '../ValueEditor/styles'

type Props = {
  value: string
  handleOnChange: (value: string) => void
  className?: string
  inputType?: string
  disabled?: boolean
  valueEditorTestId?: string
} & ValueEditorValidationProps &
  Pick<CommonSubComponentProps, 'context'>

const useStyles = makeStyles(styles)

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
