import React from 'react'
import { Theme } from '@mui/material/styles';

import makeStyles from '@mui/styles/makeStyles';

import { ChevronRight16 as ChevronRightIcon } from '../Icon'
import styles from './styles'

export type Props = { direction: 'vertical' | 'horizontal' }

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoStepConnector',
})

export const StepConnector = ({ direction }: Props) => {
  const classes = useStyles()

  if (direction === 'vertical') {
    return <div className={classes.divider} />
  }

  return <ChevronRightIcon className={classes.connectorIcon} />
}

StepConnector.displayName = 'StepConnector'

export default StepConnector
