import type { ComponentProps } from 'react'
import React, { useMemo } from 'react'
import { Container } from '@toptal/picasso-container'
import { Select as PicassoSelect } from '@toptal/picasso-select'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type { BaseProps } from '@toptal/picasso-shared'

import { generateSelectOptions, validateValueEditor } from '../utils'
import type {
  BaseVersatileSelectorProps,
  ValueEditorValidationProps,
} from '../types/query-builder'

interface Props
  extends BaseProps,
    Omit<BaseVersatileSelectorProps, 'path' | 'level' | 'className'>,
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
  style,
  'data-testid': dataTestId,
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
    <Container
      className={twMerge('flex-[1_0_6.25rem]', className)}
      style={style}
      data-testid={dataTestId}
    >
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
