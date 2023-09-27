import React from 'react'
import type { ComponentProps } from 'react'

import { Select } from '../Select'

export const FieldSelector = ({
  context: { resetSubmitButtonClicked, getDisabledFields },
  disabled,
  ...props
}: ComponentProps<typeof Select>) => {
  // TODO: https://toptal-core.atlassian.net/browse/CPT-947
  const disabledFields = getDisabledFields()

  return (
    <Select
      {...props}
      handleOnChange={value => {
        if (disabledFields.includes(value)) {
          return
        }
        resetSubmitButtonClicked()
        props.handleOnChange(value)
      }}
      disabled={disabled || disabledFields.includes(props.value)}
    />
  )
}
