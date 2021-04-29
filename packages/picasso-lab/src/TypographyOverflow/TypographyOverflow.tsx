import React, { MouseEvent, ReactNode, useState } from 'react'
import { Tooltip, Typography, TypographyProps } from '@toptal/picasso'
import { BaseProps, isOverflown } from '@toptal/picasso-shared'
import { DelayType, VariantType } from '@toptal/picasso/Tooltip/Tooltip'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'

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
    className,
    ...rest
  } = props
  const classes = useStyles(props)
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)

  const handleMouseOver = (event: MouseEvent<HTMLElement>) => {
    if (disableTooltip) {
      return
    }

    if (isOverflown(event.currentTarget)) {
      setIsTooltipOpen(true)
    }
  }

  const handleMouseOut = () => setIsTooltipOpen(false)

  return (
    <Tooltip
      data-testid='TypographyOverflow-Tooltip'
      placement='top'
      open={isTooltipOpen}
      content={tooltipContent ?? children}
      variant={tooltipVariant}
      delay={tooltipDelay}
      interactive
    >
      <Typography
        {...rest}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className={cx(
          classes.wrapper,
          lines > 1 ? classes.multiLine : classes.singleLine,
          className
        )}
      >
        {children}
      </Typography>
    </Tooltip>
  )
}

TypographyOverflow.displayName = 'TypographyOverflow'

TypographyOverflow.defaultProps = {
  noWrap: true
}

export default TypographyOverflow
