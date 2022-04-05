import React from 'react'
import { Form as PicassoForm, RequiredDecoration } from '@toptal/picasso'
import { TextLabelProps } from '@toptal/picasso-shared'

import { useFormConfig, RequiredVariant } from '../FormConfig'

export type Props = {
  name?: string
  label?: string
  required?: boolean
} & TextLabelProps

const getRequiredDecoration = (
  required?: boolean,
  requiredVariant?: RequiredVariant
): RequiredDecoration | undefined => {
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
