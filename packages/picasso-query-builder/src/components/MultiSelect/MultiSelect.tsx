import React, { useMemo } from 'react'
import { Container, Select } from '@toptal/picasso'

import { generateSelectOptions } from '../../services/generate-select-options'
import validateValueEditor from '../../services/validate-value-editor'
import type {
  BaseVersatileSelectorProps,
  ValueEditorValidationProps,
} from '../../types/query-builder'

type Props = BaseVersatileSelectorProps & ValueEditorValidationProps

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
}: Props) => {
  const hasError = validateValueEditor({
    validation,
    touched,
  })

  const formatedOptions = useMemo(
    () => generateSelectOptions(options),
    [options]
  )
  const values = useMemo(() => {
    return value?.split(',').filter(Boolean)
  }, [value])

  return (
    <Container>
      <Select
        disabled={disabled}
        className={className}
        onChange={event => handleOnChange(event.target.value.join(','))}
        onClick={fieldData?.onClick}
        loading={fieldData?.loading}
        onBlur={() => handleTouched?.(true)}
        options={formatedOptions}
        multiple
        value={values}
        status={hasError ? 'error' : undefined}
        data-testid='query-builder-multi-select'
      />
    </Container>
  )
}
