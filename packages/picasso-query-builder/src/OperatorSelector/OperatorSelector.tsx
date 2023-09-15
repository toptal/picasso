import type { OperatorSelectorProps } from 'react-querybuilder'
import React from 'react'

import { Select } from '../Select/Select'
import type { Field } from '../types/query-builder'

const OperatorSelector = (props: OperatorSelectorProps) => {
  const fieldData = props.fieldData as Field

  if (fieldData.hideOperator || fieldData.valueEditorType === 'range') {
    return null
  }

  return (
    <Select
      // TODO: https://toptal-core.atlassian.net/browse/CPT-993
      // Styling will be fixed with styled-components to JSS conversion
      // css={S.root}
      {...props}
      fieldData={undefined}
    />
  )
}

export default OperatorSelector
