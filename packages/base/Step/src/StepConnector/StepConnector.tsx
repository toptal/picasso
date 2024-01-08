import React from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { ChevronRight16 as ChevronRightIcon } from '@toptal/picasso-icons'

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
