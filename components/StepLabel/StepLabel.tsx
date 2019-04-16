import React, { FunctionComponent } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import MUIStepLabel from '@material-ui/core/StepLabel'

import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {
  hideLabel: boolean
  children: React.ReactNode
  active?: boolean
  completed?: boolean
  icon?: React.ReactElement
}

export const StepLabel: FunctionComponent<Props> = ({
  hideLabel,
  classes,
  children,
  active,
  completed,
  icon
}) => {
  return (
    <MUIStepLabel
      classes={{
        label: cx({ [classes.hidden]: hideLabel })
      }}
      active={active}
      completed={completed}
      icon={icon}
    >
      {children}
    </MUIStepLabel>
  )
}

StepLabel.defaultProps = {
  hideLabel: false
}

StepLabel.displayName = 'StepLabel'

export default withStyles(styles)(StepLabel)
