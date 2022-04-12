import React from 'react'
import { Form as PicassoForm, RequiredDecoration } from '@toptal/picasso'
import { TextLabelProps } from '@toptal/picasso-shared'
import { usePropDeprecationWarning } from '@toptal/picasso/utils/use-deprecation-warnings'

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

  usePropDeprecationWarning({
    props,
    name: 'requiredDecoration',
    componentName: 'FieldLabel',
    description: "There will be 'optional' boolean property instead"
  })

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
