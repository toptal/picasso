import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import type { OperatorSelectorProps } from 'react-querybuilder'

import { Select } from '../Select/Select'
import type { Field } from '../types/query-builder'
import styles from './styles'

const useStyles = makeStyles(styles)

const OperatorSelector = (props: OperatorSelectorProps) => {
  const classes = useStyles()

  const fieldData = props.fieldData as Field

  if (fieldData.hideOperator || fieldData.valueEditorType === 'range') {
    return null
  }

  return <Select {...props} className={classes.root} fieldData={undefined} />
}

export default OperatorSelector
