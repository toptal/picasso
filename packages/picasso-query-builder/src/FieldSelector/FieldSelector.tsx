import React from 'react'
import type { ComponentProps } from 'react'
import { Tooltip } from '@toptal/picasso-tooltip'
import { Typography } from '@toptal/picasso-typography'
import { SPACING_4 } from '@toptal/picasso-provider'

import { Select } from '../Select'
import { tooltipOptionTextClassName } from './styles'

export const FieldSelector = ({
  context: { resetSubmitButtonClicked, getDisabledFields, testIds },
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
      valueEditorTestId={testIds?.fieldSelector}
      renderOption={option => {
        if (option.tooltip) {
          return (
            <Tooltip
              compact
              interactive
              content={option.tooltip}
              placement='right'
              offset={{
                left: SPACING_4,
              }}
            >
              <Typography
                className={tooltipOptionTextClassName}
                variant='body'
                size='medium'
                color='inherit'
              >
                {option.text}
              </Typography>
            </Tooltip>
          )
        }

        return option.text
      }}
    />
  )
}
