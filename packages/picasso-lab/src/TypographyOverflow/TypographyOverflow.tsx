import cx from 'classnames'
import React, { ReactNode, useCallback, useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Tooltip, Typography, TypographyProps } from '@toptal/picasso'
import { isOverflown } from '@toptal/picasso/utils'
import { BaseProps } from '@toptal/picasso-shared'
import { DelayType, VariantType } from '@toptal/picasso/Tooltip/Tooltip'

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
    onMouseEnter,
    ...rest
  } = props

  const classes = useStyles(props)
  const [isTooltipActive, setIsTooltipActive] = useState(false)
  const [isTooltipAnimating, setIsTooltipAnimating] = useState(false)
  const isTooltipRendered = isTooltipActive || isTooltipAnimating
  const isMultiline = lines > 1

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (isOverflown(event.currentTarget)) {
        setIsTooltipActive(true)
        setIsTooltipAnimating(true)
      }

      if (onMouseEnter) {
        onMouseEnter(event)
      }
    },
    [onMouseEnter]
  )

  const handleTooltipClose = useCallback(() => {
    setIsTooltipActive(false)
  }, [])

  const handleTransitionExiting = useCallback(() => {
    setIsTooltipAnimating(true)
  }, [])

  const handleTransitionExited = useCallback(() => {
    setIsTooltipAnimating(false)
  }, [])

  const typography = (
    <Typography
      {...rest}
      className={cx(
        classes.wrapper,
        isMultiline ? classes.multiLine : classes.singleLine,
        className
      )}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </Typography>
  )

  const tooltip = (
    <Tooltip
      content={tooltipContent ?? children}
      variant={tooltipVariant}
      placement='top'
      delay={tooltipDelay}
      interactive
      disableListeners={disableTooltip}
      onClose={handleTooltipClose}
      onTransitionExiting={handleTransitionExiting}
      onTransitionExited={handleTransitionExited}
    >
      {typography}
    </Tooltip>
  )

  return isTooltipRendered ? tooltip : typography
}

TypographyOverflow.displayName = 'TypographyOverflow'

TypographyOverflow.defaultProps = {
  noWrap: true
}

export default TypographyOverflow
