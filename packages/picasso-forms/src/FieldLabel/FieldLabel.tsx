import React from 'react'
import { Form as PicassoForm, RequiredDecoration } from '@toptal/picasso'
import { TextLabelProps } from '@toptal/picasso-shared'

import { useFormConfig, RequiredVariant } from '../FormConfig'

export type Props = {
  name?: string
  label?: string
  required?: boolean
  onClick?: () => void
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
  const { label, required, titleCase, name, onClick } = props

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
      onClick={onClick}
    >
      {label}
    </PicassoForm.Label>
  )
}

FieldLabel.defaultProps = {}

FieldLabel.displayName = 'FieldLabel'

export default FieldLabel
