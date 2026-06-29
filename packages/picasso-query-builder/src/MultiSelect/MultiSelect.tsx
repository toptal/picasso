import React, { useMemo } from 'react'
import { Container } from '@toptal/picasso-container'
import { Select } from '@toptal/picasso-select'

import { generateSelectOptions, validateValueEditor } from '../utils'
import type {
  BaseVersatileSelectorProps,
  ValueEditorValidationProps,
} from '../types/query-builder'
import { rootClassName } from './styles'

type Props = BaseVersatileSelectorProps &
  ValueEditorValidationProps & {
    valueEditorTestId?: string
  }

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
    <Container className={rootClassName}>
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
        enableReset={fieldData?.enableReset}
        enableResetSearch={fieldData?.enableResetSearch}
      />
    </Container>
  )
}
