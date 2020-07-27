import React, { FunctionComponent, HTMLAttributes } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import MUIStepLabel from '@material-ui/core/StepLabel'
import {
  StandardProps,
  TextLabelProps,
  useTitleCase
} from '@toptal/picasso-shared'

import StepIcon from '../StepIcon'
import styles from './styles'
import toTitleCase from '../utils/to-title-case'

export interface Props
  extends StandardProps,
    TextLabelProps,
    HTMLAttributes<HTMLDivElement> {
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
  titleCase: propsTitleCase,
  ...rest
}) => {
  const titleCase = useTitleCase(propsTitleCase)
  return (
    <MUIStepLabel
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      classes={{
        labelContainer: cx({
          [classes.root]: !hideLabel || active
        }),
        label: cx({ [classes.hidden]: hideLabel && !active })
      }}
      className={className}
      icon={<StepIcon active={active} completed={completed} />}
      style={style}
    >
      <span className={classes.label}>
        {titleCase ? toTitleCase(children) : children}
      </span>
    </MUIStepLabel>
  )
}

StepLabel.defaultProps = {
  hideLabel: false
}

StepLabel.displayName = 'StepLabel'

export default withStyles(styles)(StepLabel)
