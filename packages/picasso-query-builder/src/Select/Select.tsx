import React from 'react'
import { Container, Select as PicassoSelect } from '@toptal/picasso'
import type { VersatileSelectorProps } from 'react-querybuilder'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { generateSelectOptions, validateValueEditor } from '../utils'
import type { ValueEditorValidationProps } from '../types/query-builder'
import styles from './styles'

interface Props
  extends Omit<VersatileSelectorProps, 'path' | 'level' | 'schema'>,
    ValueEditorValidationProps {
  valueEditorTestId?: string
}

const useStyles = makeStyles(styles)

export const Select = ({
  options,
  handleOnChange,
  handleTouched,
  validation,
  touched,
  value,
  disabled,
  className,
  fieldData,
  valueEditorTestId,
}: Props) => {
  const classes = useStyles()

  const formattedOptions = generateSelectOptions(options)
  const hasError = validateValueEditor({
    validation,
    touched,
  })

  return (
    <Container className={cx(className, classes.root)}>
      <PicassoSelect
        menuWidth='fit-content'
        disabled={disabled}
        onChange={event => handleOnChange(event.target.value)}
        onClick={fieldData?.onClick}
        options={formattedOptions}
        value={value}
        loading={fieldData?.loading}
        status={hasError ? 'error' : undefined}
        onBlur={() => handleTouched?.(true)}
        data-testid={valueEditorTestId}
      />
    </Container>
  )
}
