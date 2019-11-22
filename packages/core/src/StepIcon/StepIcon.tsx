import React, { FunctionComponent, HTMLAttributes } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import { CheckMinor24 as TickIcon } from '../Icon'
import styles from './styles'

interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  active?: boolean
  completed?: boolean
}

export const StepIcon: FunctionComponent<Props> = ({
  active,
  completed,
  classes,
  ...rest
}) => {
  return (
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
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
