import React from 'react'
import { Container, Select as PicassoSelect } from '@toptal/picasso'
import type { VersatileSelectorProps } from 'react-querybuilder'

import { generateSelectOptions } from '../../services/generate-select-options'
import validateValueEditor from '../../services/validate-value-editor'
import type { ValueEditorValidationProps } from '../../types/query-builder'

interface Props
  extends Omit<VersatileSelectorProps, 'path' | 'level' | 'schema'>,
    ValueEditorValidationProps {}

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
}: Props) => {
  const formatedOptions = generateSelectOptions(options)
  const hasError = validateValueEditor({
    validation,
    touched,
  })

  return (
    <Container
      className={className}
      // css={S.root}
    >
      <PicassoSelect
        menuWidth='fit-content'
        disabled={disabled}
        onChange={event => handleOnChange(event.target.value)}
        onClick={fieldData?.onClick}
        options={formatedOptions}
        value={value}
        loading={fieldData?.loading}
        status={hasError ? 'error' : undefined}
        onBlur={() => handleTouched?.(true)}
        data-testid='query-builder-select'
      />
    </Container>
  )
}
