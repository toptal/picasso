import React from 'react'
import type { OperatorSelectorProps } from 'react-querybuilder'

import { Select } from '../Select'
import type { Field } from '../types/query-builder'
import { rootClassName } from './styles'

export const OperatorSelector = ({
  fieldData,
  ...rest
}: OperatorSelectorProps) => {
  if (
    fieldData.hideOperator ||
    (fieldData as Field).valueEditorType === 'range'
  ) {
    return null
  }

  return <Select {...rest} className={rootClassName} />
}
