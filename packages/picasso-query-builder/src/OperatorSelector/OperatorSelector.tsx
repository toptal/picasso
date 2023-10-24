import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import type { OperatorSelectorProps } from 'react-querybuilder'

import { Select } from '../Select'
import type { Field } from '../types/query-builder'
import styles from './styles'

const useStyles = makeStyles(styles)

export const OperatorSelector = ({
  fieldData,
  ...rest
}: OperatorSelectorProps) => {
  const classes = useStyles()

  if (
    fieldData.hideOperator ||
    (fieldData as Field).valueEditorType === 'range'
  ) {
    return null
  }

  return <Select {...rest} className={classes.root} />
}
