import type { OperatorSelectorProps } from 'react-querybuilder'
import React from 'react'

import { Select } from '../Select/Select'
import type { Field } from '../../types/query-builder'

const OperatorSelector = (props: OperatorSelectorProps) => {
  const fieldData = props.fieldData as Field

  if (fieldData.hideOperator || fieldData.valueEditorType === 'range') {
    return null
  }

  return (
    <Select
      // css={S.root}
      {...props}
      fieldData={undefined}
    />
  )
}

export default OperatorSelector
