import React, { FunctionComponent, HTMLAttributes } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import MUIStepLabel from '@material-ui/core/StepLabel'
import { StandardProps, useAppConfig } from '@toptal/picasso-shared'

import StepIcon from '../StepIcon'
import styles from './styles'
import toTitleCase from '../utils/to-title-case'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  hideLabel: boolean
  children: string
  active?: boolean
  completed?: boolean
  /** Defines if the text should be transformed to title case */
  titleCase?: boolean
}

export const StepLabel: FunctionComponent<Props> = ({
  active,
  classes,
  className,
  children,
  completed,
  hideLabel,
  style,
  titleCase,
  ...rest
}) => {
  const { titleCase: defaultTitleCase } = useAppConfig()
  const titleCaseIsApplied = titleCase ?? defaultTitleCase
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
      <span className={classes.label}>
        {titleCaseIsApplied ? toTitleCase(children) : children}
      </span>
    </MUIStepLabel>
  )
}

StepLabel.defaultProps = {
  hideLabel: false
}

StepLabel.displayName = 'StepLabel'

export default withStyles(styles)(StepLabel)
