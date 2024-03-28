import React from 'react'
import type { ComponentProps } from 'react'
import { Tooltip, Typography } from '@toptal/picasso'
import { makeStyles } from '@material-ui/core/styles'
import { SPACING_4 } from '@toptal/picasso-provider'

import { Select } from '../Select'
import styles from './styles'

const useStyles = makeStyles(styles)

export const FieldSelector = ({
  context: { resetSubmitButtonClicked, getDisabledFields, testIds },
  disabled,
  ...props
}: ComponentProps<typeof Select>) => {
  // TODO: https://toptal-core.atlassian.net/browse/CPT-947
  const disabledFields = getDisabledFields()
  const classes = useStyles()

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
                className={classes.tooltipOptionText}
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
