import React, { FunctionComponent } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { Tick as TickIcon } from '../Icon'
import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {
  active?: boolean
  completed?: boolean
}

export const StepIcon: FunctionComponent<Props> = ({
  active,
  completed,
  classes
}) => {
  return (
    <div
      className={cx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {completed && <TickIcon />}
    </div>
  )
}

StepIcon.displayName = 'StepIcon'

export default withStyles(styles)(StepIcon)
