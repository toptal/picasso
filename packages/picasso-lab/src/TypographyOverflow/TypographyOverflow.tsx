import React, { ReactNode, useCallback, useState } from 'react'
import { Tooltip, Typography, TypographyProps } from '@toptal/picasso'
import { BaseProps } from '@toptal/picasso-shared'
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

const isTextOverflow = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  /**
   * Pixel value of font render space correction.
   * It's individual for different fonts, so it won't work for 100% cases,
   * but it allows us to be much closer to actual overflow detection while calculating.
   * Tolerance of the render could be 0-2px depending on the font that is used,
   * and also affected by the right-padding added at Ellipsis component.
   */
  const FONT_RENDER_CORRECTION = 0.475

  return (
    element.scrollWidth > rect.width + FONT_RENDER_CORRECTION ||
    element.scrollHeight > rect.height + FONT_RENDER_CORRECTION
  )
}

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
  const [isTooltipOpened, setIsTooltipOpened] = useState(false)
  const [isTooltipAnimating, setIsTooltipAnimating] = useState(false)
  const isTooltipRendered =
    (isTooltipOpened || isTooltipAnimating) && !disableTooltip
  const isMultiline = lines > 1

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (isTextOverflow(event.currentTarget)) {
        setIsTooltipOpened(true)
        setIsTooltipAnimating(true)
      }

      if (onMouseEnter) {
        onMouseEnter(event)
      }
    },
    [onMouseEnter]
  )

  const handleTooltipClose = useCallback(() => {
    setIsTooltipOpened(false)
  }, [])

  const handleTransitionExiting = useCallback(() => {
    setIsTooltipAnimating(true)
  }, [])

  const handleTransitionExited = useCallback(() => {
    setIsTooltipAnimating(false)
  }, [])

  const text = (
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
      data-testid='TypographyOverflow-Tooltip'
      content={tooltipContent ?? children}
      variant={tooltipVariant}
      placement='top'
      delay={tooltipDelay}
      open={isTooltipOpened}
      interactive
      onClose={handleTooltipClose}
      onTransitionExiting={handleTransitionExiting}
      onTransitionExited={handleTransitionExited}
    >
      {text}
    </Tooltip>
  )

  return isTooltipRendered ? tooltip : text
}

TypographyOverflow.displayName = 'TypographyOverflow'

TypographyOverflow.defaultProps = {
  noWrap: true
}

export default TypographyOverflow
