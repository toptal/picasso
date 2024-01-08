import type { HTMLAttributes, ReactNode } from 'react'
import React from 'react'
import cx from 'classnames'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import MUIStepLabel from '@material-ui/core/StepLabel'
import type { BaseProps, TextLabelProps } from '@toptal/picasso-shared'
import { useTitleCase } from '@toptal/picasso-shared'
import { toTitleCase } from '@toptal/picasso-utils'
import { TypographyOverflow } from '@toptal/picasso-typography-overflow'

import StepIcon from '../StepIcon'
import styles from './styles'

export interface Props
  extends BaseProps,
    TextLabelProps,
    HTMLAttributes<HTMLDivElement> {
  hideLabel: boolean
  children: ReactNode
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
          [classes.hiddenOnMobile]: !active,
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
