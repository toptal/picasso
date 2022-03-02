import React, { HTMLAttributes } from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUIStepLabel from '@material-ui/core/StepLabel'
import { BaseProps, TextLabelProps, useTitleCase } from '@toptal/picasso-shared'

import StepIcon from '../StepIcon'
import styles from './styles'
import toTitleCase from '../utils/to-title-case'

export interface Props
  extends BaseProps,
    TextLabelProps,
    HTMLAttributes<HTMLDivElement> {
  hideLabel: boolean
  children: string
  active?: boolean
  completed?: boolean
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoStepLabel' })

export const StepLabel = (props: Props) => {
  const {
    active,
    className,
    children,
    completed,
    hideLabel,
    style,
    titleCase: propsTitleCase,
    ...rest
  } = props
  const titleCase = useTitleCase(propsTitleCase)
  const classes = useStyles()

  return (
    <MUIStepLabel
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

export default StepLabel
