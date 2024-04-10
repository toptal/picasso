import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { Select } from '../Select'
import type { BaseOperatorSelectorProps } from '../types/query-builder'
import styles from './styles'

const useStyles = makeStyles(styles)

export const OperatorSelector = ({
  fieldData,
  ...rest
}: BaseOperatorSelectorProps) => {
  const classes = useStyles()

  if (fieldData?.hideOperator || fieldData?.valueEditorType === 'range') {
    return null
  }

  return <Select {...rest} className={classes.root} />
}
