import React, { FunctionComponent, HTMLAttributes } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import MUIStepLabel from '@material-ui/core/StepLabel'
import { StandardProps } from '@toptal/picasso-shared'

import StepIcon from '../StepIcon'
import styles from './styles'

interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
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
  style,
  ...rest
}) => {
  return (
    <MUIStepLabel
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
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
