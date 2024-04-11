import cx from 'classnames'
import type { ReactNode } from 'react'
import React, { useCallback, useState } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { BaseProps } from '@toptal/picasso-shared'
import { Tooltip } from '@toptal/picasso-tooltip'
import { Typography } from '@toptal/picasso-typography'
import { isOverflown } from '@toptal/picasso-utils'
import type { TypographyProps } from '@toptal/picasso-typography'
import type { DelayType } from '@toptal/picasso-tooltip'

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
  /** Do not show tooltips for shorten content. */
  disableTooltip?: boolean
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'TypographyOverflow',
})

export const TypographyOverflow = (props: Props) => {
  const {
    children,
    lines = 1,
    tooltipContent,
    tooltipDelay,
    disableTooltip,
    className,
    onClick,
    onMouseEnter,
    style,
    ...rest
  } = props

  const classes = useStyles(props)
  const [isTooltipActive, setIsTooltipActive] = useState(false)
  const [isTooltipOpened, setIsTooltipOpened] = useState(false)
  const [isTooltipAnimating, setIsTooltipAnimating] = useState(false)
  const isTooltipRendered = isTooltipActive || isTooltipAnimating
  const isMultiline = lines > 1

  // We are paying a very high price when using dynamic JSS rules
  // for a component that is used on a very large scale.
  // It was causing a major UI freezes and unnecessary style recalculations,
  // that's why we decided to go with inline styles:
  // https://github.com/toptal/picasso/pull/2110
  const extendedStyle = isMultiline
    ? { ...style, WebkitLineClamp: lines }
    : style

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (
        !isTooltipOpened &&
        !disableTooltip &&
        isOverflown(event.currentTarget)
      ) {
        setIsTooltipOpened(true)
        setIsTooltipActive(true)
      }

      if (onClick) {
        onClick(event)
      }
    },
    [isTooltipOpened, disableTooltip, onClick]
  )

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

  const handleTooltipOpen = useCallback(() => {
    setIsTooltipOpened(true)
  }, [])

  const handleTooltipClose = useCallback(() => {
    setIsTooltipActive(false)
    setIsTooltipOpened(false)
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
      style={extendedStyle}
      className={cx(
        classes.wrapper,
        isMultiline ? classes.multiLine : '!block !whitespace-nowrap',
        className
      )}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </Typography>
  )

  const tooltip = (
    <Tooltip
      open={isTooltipOpened}
      content={tooltipContent ?? children}
      placement='top'
      delay={tooltipDelay}
      interactive
      disableListeners={disableTooltip}
      onOpen={handleTooltipOpen}
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
  noWrap: true,
}

export default TypographyOverflow
