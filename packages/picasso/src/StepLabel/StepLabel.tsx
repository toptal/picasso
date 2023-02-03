import React, { HTMLAttributes } from 'react'
import cx from 'classnames'
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import MUIStepLabel from '@mui/material/StepLabel'
import { BaseProps, TextLabelProps, useTitleCase } from '@toptal/picasso-shared'

import StepIcon from '../StepIcon'
import styles from './styles'
import toTitleCase from '../utils/to-title-case'
import TypographyOverflow from '../TypographyOverflow'

export interface Props
  extends BaseProps,
    TextLabelProps,
    HTMLAttributes<HTMLDivElement> {
  hideLabel: boolean
  children: string
  active?: boolean
  completed?: boolean
  overflowEllipsis?: boolean
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoStepLabel' })

export const StepLabel = (props: Props) => {
  const {
    active,
    className,
    children,
    completed,
    hideLabel,
    overflowEllipsis,
    style,
    titleCase: propsTitleCase,
    ...rest
  } = props
  const titleCase = useTitleCase(propsTitleCase)
  const classes = useStyles()

  const withOverflowEllipsis = !hideLabel && overflowEllipsis
  const labelElement = (
    <span className={classes.label}>
      {titleCase ? toTitleCase(children) : children}
    </span>
  )

  return (
    <MUIStepLabel
      {...rest}
      classes={{
        labelContainer: cx({
          [classes.root]: !hideLabel || active,
          [classes.labelContainerOverflowEllipsis]: withOverflowEllipsis,
        }),
        label: cx({
          [classes.hidden]: hideLabel && !active,
          [classes.labelOverflowEllipsis]: withOverflowEllipsis,
        }),
      }}
      className={className}
      icon={<StepIcon active={active} completed={completed} />}
      style={style}
    >
      {withOverflowEllipsis ? (
        <TypographyOverflow>{labelElement}</TypographyOverflow>
      ) : (
        labelElement
      )}
    </MUIStepLabel>
  )
}

StepLabel.defaultProps = {
  hideLabel: false,
}

StepLabel.displayName = 'StepLabel'

export default StepLabel
