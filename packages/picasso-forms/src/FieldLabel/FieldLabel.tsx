import React from 'react'
import type { RequiredDecoration } from '@toptal/picasso'
import { Form as PicassoForm } from '@toptal/picasso'
import type { TextLabelProps } from '@toptal/picasso-shared'

import type { RequiredVariant } from '../FormConfig'
import { useFormConfig } from '../FormConfig'

export type Props = {
  name?: string
  label?: React.ReactNode
  required?: boolean
} & TextLabelProps

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

const FieldLabel = (props: Props) => {
  const { label, required, titleCase, name } = props

  const formConfig = useFormConfig()
  const requiredDecoration = getRequiredDecoration(
    required,
    formConfig.requiredVariant
  )

  return (
    <PicassoForm.Label
      requiredDecoration={requiredDecoration}
      htmlFor={name}
      titleCase={titleCase}
    >
      {label}
    </PicassoForm.Label>
  )
}

FieldLabel.defaultProps = {}

FieldLabel.displayName = 'FieldLabel'

export default FieldLabel
