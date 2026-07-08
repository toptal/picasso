import React from 'react'
import type { OperatorSelectorProps } from 'react-querybuilder'

import { Select } from '../Select'
import type { Field } from '../types/query-builder'

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

  return (
    // TODO(tokens): [PF-1994] 6.25rem operator-selector min-width is off the Picasso spacing scale
    <Select {...rest} className='basis-[6.25rem]' />
  )
}
