import React, { FunctionComponent } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import MUIStepLabel from '@material-ui/core/StepLabel'

import StepIcon from '../StepIcon'
import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {
  hideLabel: boolean
  children: string
  active?: boolean
  completed?: boolean
}

export const StepLabel: FunctionComponent<Props> = ({
  active,
  classes,
  className,
  children,
  completed,
  hideLabel,
  style
}) => {
  return (
    <MUIStepLabel
      active={active}
      classes={{
        labelContainer: cx({
          [classes.root]: !hideLabel || active
        }),
        label: cx({ [classes.hidden]: hideLabel })
      }}
      className={className}
      completed={completed}
      icon={<StepIcon active={active} completed={completed} />}
      style={style}
    >
      <span className={classes.label}>{children}</span>
    </MUIStepLabel>
  )
}

StepLabel.defaultProps = {
  hideLabel: false
}

StepLabel.displayName = 'StepLabel'

export default withStyles(styles)(StepLabel)
