import React, { FunctionComponent, ReactNode, ReactElement } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import MUIStepLabel from '@material-ui/core/StepLabel'

import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {
  hideLabel: boolean
  children: ReactNode
  active?: boolean
  completed?: boolean
  icon?: ReactElement
}

export const StepLabel: FunctionComponent<Props> = ({
  active,
  classes,
  className,
  children,
  completed,
  hideLabel,
  icon,
  style
}) => {
  return (
    <MUIStepLabel
      active={active}
      classes={{
        label: cx({ [classes.hidden]: hideLabel })
      }}
      className={className}
      completed={completed}
      icon={icon}
      style={style}
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
