import type { ReactNode } from 'react'
import React, { useCallback, useState } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Tooltip } from '@toptal/picasso-tooltip'
import { Typography } from '@toptal/picasso-typography'
import {
  isOverflown,
  isPointerDevice,
  isSafari,
  toTitleCase,
  useIsomorphicLayoutEffect,
} from '@toptal/picasso-utils'
import type { TypographyProps } from '@toptal/picasso-typography'
import type { DelayType, PlacementType } from '@toptal/picasso-tooltip'
import { twMerge } from '@toptal/picasso-tailwind-merge'

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
  /** Do not cover the text with the layer that stops desktop Safari from adding its own tooltip. Links and other controls inside are kept above the layer, so they stay clickable without it. */
  disableTooltipGuard?: boolean
  /** Where should the tooltip be positioned */
  placement?: PlacementType
}

export const TypographyOverflow = (props: Props) => {
  const {
    children,
    lines = 1,
    tooltipContent,
    tooltipDelay,
    disableTooltip,
    disableTooltipGuard,
    titleCase,
    className,
    onClick,
    onMouseEnter,
    style,
    placement = 'top',
    ...rest
  } = props

  const [isTooltipActive, setIsTooltipActive] = useState(false)
  const [isTooltipOpened, setIsTooltipOpened] = useState(false)
  const [isTooltipAnimating, setIsTooltipAnimating] = useState(false)
  const [isGuarded, setIsGuarded] = useState(false)
  const isTooltipRendered = isTooltipActive || isTooltipAnimating
  const isMultiline = lines > 1

  // Decided after mount, so server-rendered HTML never has the layer, and only in
  // Safari, so other browsers render the plain text without an extra render
  useIsomorphicLayoutEffect(() => {
    if (!isSafari()) {
      return
    }

    setIsGuarded(
      !disableTooltip && !disableTooltipGuard && Boolean(isPointerDevice())
    )
  }, [disableTooltip, disableTooltipGuard])

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
      noWrap={!isMultiline}
      className={twMerge(
        '[-webkit-box-orient:vertical] overflow-hidden text-ellipsis pr-[0.9px]',
        isMultiline
          ? '[display:-webkit-box] break-words ![white-space:initial]'
          : 'block',
        isGuarded &&
          // Positioned controls paint over the earlier layer, so they keep the pointer
          'relative [&_:where(a[href],button,input,select,textarea,[role="button"],[role="link"],[tabindex]:not([tabindex="-1"]))]:relative',
        className
      )}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      {isGuarded && (
        // Desktop Safari shows a native tooltip when the element under the pointer
        // has no title and its block ends in an ellipsis; this empty layer is that element
        <span aria-hidden className='absolute inset-0' />
      )}
      {titleCase ? toTitleCase(children) : children}
    </Typography>
  )

  const tooltip = (
    <Tooltip
      open={isTooltipOpened}
      content={tooltipContent ?? children}
      placement={placement}
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

export default TypographyOverflow
