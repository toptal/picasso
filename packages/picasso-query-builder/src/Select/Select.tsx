import type { ComponentProps } from 'react'
import React, { useMemo } from 'react'
import { Container, Select as PicassoSelect } from '@toptal/picasso'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { generateSelectOptions, validateValueEditor } from '../utils'
import type {
  BaseVersatileSelectorProps,
  BooleanField,
  SelectField,
  ValueEditorValidationProps,
} from '../types/query-builder'
import styles from './styles'

interface Props
  extends Omit<
      BaseVersatileSelectorProps<SelectField | BooleanField>,
      'path' | 'level' | 'schema'
    >,
    Pick<ComponentProps<typeof PicassoSelect>, 'renderOption'>,
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
  renderOption,
}: Props) => {
  const classes = useStyles()

  const formattedOptions = useMemo(
    () => generateSelectOptions(options),
    [options]
  )

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
        onClick={
          fieldData !== undefined && 'onClick' in fieldData
            ? fieldData?.onClick
            : undefined
        }
        options={formattedOptions}
        value={value}
        loading={
          fieldData !== undefined && 'onClick' in fieldData
            ? fieldData?.loading
            : undefined
        }
        status={hasError ? 'error' : undefined}
        onBlur={() => handleTouched?.(true)}
        data-testid={valueEditorTestId}
        renderOption={renderOption}
      />
    </Container>
  )
}
