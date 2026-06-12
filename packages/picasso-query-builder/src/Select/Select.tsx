import type { ComponentProps } from 'react'
import React, { useMemo } from 'react'
import { Container } from '@toptal/picasso-container'
import { Select as PicassoSelect } from '@toptal/picasso-select'
import type { VersatileSelectorProps } from 'react-querybuilder'
import cx from 'classnames'

import { generateSelectOptions, validateValueEditor } from '../utils'
import type { ValueEditorValidationProps } from '../types/query-builder'
import { rootClassName } from './styles'

interface Props
  extends Omit<VersatileSelectorProps, 'path' | 'level' | 'schema'>,
    Pick<ComponentProps<typeof PicassoSelect>, 'renderOption'>,
    ValueEditorValidationProps {
  valueEditorTestId?: string
}

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
  const formattedOptions = useMemo(
    () => generateSelectOptions(options),
    [options]
  )

  const hasError = validateValueEditor({
    validation,
    touched,
  })

  return (
    <Container className={cx(className, rootClassName)}>
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
        renderOption={renderOption}
      />
    </Container>
  )
}
