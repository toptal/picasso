import React, { useMemo } from 'react'
import { Container, Select } from '@toptal/picasso'
import { makeStyles } from '@material-ui/core/styles'

import { generateSelectOptions, validateValueEditor } from '../utils'
import type {
  BaseVersatileSelectorProps,
  ValueEditorValidationProps,
} from '../types/query-builder'
import styles from './styles'

type Props = BaseVersatileSelectorProps &
  ValueEditorValidationProps & {
    valueEditorTestId?: string
  }

const useStyles = makeStyles(styles)

export const MultiSelect = ({
  options,
  handleOnChange,
  handleTouched,
  validation,
  touched,
  value = '',
  disabled,
  className,
  fieldData,
  valueEditorTestId,
}: Props) => {
  const classes = useStyles()

  const hasError = validateValueEditor({
    validation,
    touched,
  })

  const formattedOptions = useMemo(
    () => generateSelectOptions(options),
    [options]
  )
  const values = useMemo(() => {
    return value?.split(',').filter(Boolean)
  }, [value])

  return (
    <Container className={classes.root}>
      <Select
        disabled={disabled}
        className={className}
        onChange={event => handleOnChange(event.target.value.join(','))}
        onClick={fieldData?.onClick}
        loading={fieldData?.loading}
        onBlur={() => handleTouched?.(true)}
        options={formattedOptions}
        multiple
        value={values}
        status={hasError ? 'error' : undefined}
        data-testid={valueEditorTestId}
        enableResetSearch={fieldData?.enableResetSearch}
      />
    </Container>
  )
}
