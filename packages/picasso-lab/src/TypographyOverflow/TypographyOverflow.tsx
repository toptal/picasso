import React, { ReactNode } from 'react'
import { Tooltip, Typography, TypographyProps } from '@toptal/picasso'
import { BaseProps } from '@toptal/picasso-shared'
import { DelayType, VariantType } from '@toptal/picasso/Tooltip/Tooltip'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'

import Ellipsis from '../Ellipsis'
import styles from './styles'

export interface Props extends BaseProps, TypographyProps {
  /** A typography which can possibly overflow */
  children?: ReactNode
  /** Number of lines displayed */
  lines?: number
  /** A content to show in tooltip when typography overflows. By default, TypographyOverflow's children are used. */
  tooltipContent?: ReactNode
  /** A delay in showing the tooltip when typography overflows. */
  tooltipDelay?: DelayType
  /** Tooltip color variant to use. */
  tooltipVariant?: VariantType
  /** Do not show tooltips for shorten content. */
  disableTooltip?: boolean
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'TypographyOverflow'
})

export const TypographyOverflow = (props: Props) => {
  const {
    children,
    lines = 1,
    tooltipContent,
    tooltipDelay,
    tooltipVariant,
    disableTooltip,
    ...rest
  } = props

  const multiline = lines > 1
  const classes = useStyles(props)

  return (
    <Ellipsis
      renderWhenEllipsis={child =>
        disableTooltip ? (
          child
        ) : (
          <Tooltip
            data-testid='TypographyOverflow-Tooltip'
            disableListeners={disableTooltip}
            content={tooltipContent ?? children}
            variant={tooltipVariant}
            placement='top'
            delay={tooltipDelay}
            interactive
          >
            {child}
          </Tooltip>
        )
      }
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Typography
        {...rest}
        className={cx(
          classes.wrapper,
          multiline ? classes.multiLine : classes.singleLine
        )}
      >
        {children}
      </Typography>
    </Ellipsis>
  )
}

TypographyOverflow.displayName = 'TypographyOverflow'

TypographyOverflow.defaultProps = {
  noWrap: true
}

export default TypographyOverflow
