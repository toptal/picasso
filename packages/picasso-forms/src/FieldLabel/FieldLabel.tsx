import React from 'react'
import { Form as PicassoForm } from '@toptal/picasso'
import { TextLabelProps } from '@toptal/picasso-shared'

export type Props = {
  name?: string
  label?: string
  required?: boolean
} & TextLabelProps

const FieldLabel = (props: Props) => {
  const { label, required, titleCase, name } = props

  return (
    <PicassoForm.Label
      optional={!required}
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
