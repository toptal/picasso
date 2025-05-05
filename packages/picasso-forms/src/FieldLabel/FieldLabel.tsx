import type { ReactNode } from 'react'
import React from 'react'
import type { RequiredDecoration } from '@toptal/picasso-form-label'
import { FormCompound as PicassoForm } from '@toptal/picasso-form'
import type { TextLabelProps } from '@toptal/picasso-shared'

import type { RequiredVariant } from '../FormConfig'
import { useFormConfig } from '../FormConfig'

export type Props = {
  name?: string
  label?: ReactNode
  /** Label's end adornment */
  labelEndAdornment?: ReactNode
  required?: boolean
} & TextLabelProps

type InternalProps = {
  /** Whether label should be aligned to top of the container or not */
  alignment?: 'top' | 'middle'
}

const getRequiredDecoration = (
  required?: boolean,
  requiredVariant?: RequiredVariant
): RequiredDecoration | undefined => {
  const showAsterisk = required && requiredVariant === 'asterisk'

  if (showAsterisk) {
    return 'asterisk'
  }

  const showOptional =
    !required && (!requiredVariant || requiredVariant === 'default')

  if (showOptional) {
    return 'optional'
  }
}

const FieldLabel = ({
  label,
  required,
  titleCase,
  name,
  alignment,
  labelEndAdornment,
}: Props & InternalProps) => {
  const formConfig = useFormConfig()

  if (!label) {
    return null
  }

  const requiredDecoration = getRequiredDecoration(
    required,
    formConfig.requiredVariant
  )

  return (
    <PicassoForm.Label
      requiredDecoration={requiredDecoration}
      htmlFor={name}
      titleCase={titleCase}
      alignment={alignment}
      labelEndAdornment={labelEndAdornment}
    >
      {label}
    </PicassoForm.Label>
  )
}

FieldLabel.defaultProps = {}

FieldLabel.displayName = 'FieldLabel'

export default FieldLabel
