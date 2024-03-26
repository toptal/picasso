import type {
  ReactNode,
  ReactElement,
  ChangeEvent,
  HTMLAttributes,
} from 'react'
import React, { forwardRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { TooltipProps } from '@material-ui/core'
import { Tooltip as MUITooltip } from '@material-ui/core'
import cx from 'classnames'
import type { BaseProps } from '@toptal/picasso-shared'
import { usePicassoRoot } from '@toptal/picasso-provider'
import { Typography } from '@toptal/picasso-typography'

import styles from './styles'
import type { ChildrenProps, ContainerValue } from './types'
import { useTooltipState } from './use-tooltip-state'
import { useTooltipHandlers } from './use-tooltip-handlers'
import { useTooltipFollowCursor } from './use-tooltip-follow-cursor'

export type DelayType = 'short' | 'long'

export type MaxWidthType = 'none' | 'default'

export type PlacementType = TooltipProps['placement']

const delayDurations: { [k in DelayType]: number } = {
  short: 200,
  long: 500,
}

const getDelayDuration = (delay: DelayType, isTouchDevice: boolean) => {
  return isTouchDevice ? 0 : delayDurations[delay]
}

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Trigger element for tooltip */
  children: ReactNode
  /** Content to be rendered inside tooltip */
  content?: ReactNode
  /** Where should the tooltip be positioned */
  placement?: PlacementType
  /** Called when tooltip is opened */
  onOpen?: (event: ChangeEvent<{}>) => void
  /** Called when tooltip is closed */
  onClose?: (event: ChangeEvent<{}>) => void
  /** Whether user can interact with tooltip content */
  interactive?: boolean
  /** Programatically control tooltip's visibility */
  open?: boolean
  /** Disables all listener */
  disableListeners?: boolean
  /** Allows tooltip to change its placement when it overflows */
  preventOverflow?: boolean
  /** Disable the portal behavior. The children stay within it's parent */
  disablePortal?: boolean
  /** A delay in showing the tooltip */
  delay?: DelayType
  /** Show a compact tooltip */
  compact?: boolean
  /** If `true`, the tooltip follow the cursor over the wrapped element. This prop exists in material-ui@5+ */
  followCursor?: boolean
  /** Max width of a tooltip */
  maxWidth?: MaxWidthType
  onTransitionExiting?: () => void
  onTransitionExited?: () => void
  /** Tooltip div ref */
  tooltipRef?: React.Ref<HTMLDivElement>
  /** A node, or a function that returns node. The container will have the portal children appended to it. */
  container?: ContainerValue
  /** Allows customizing the tooltip popper style */
  popperClassName?: string
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoTooltip' })

export const Tooltip = forwardRef<unknown, Props>((props, ref) => {
  const {
    content,
    children: originalChildren,
    placement,
    interactive,
    className,
    popperClassName,
    style,
    open,
    onOpen,
    onClose,
    onTransitionExiting,
    onTransitionExited,
    disableListeners,
    preventOverflow,
    disablePortal,
    delay = 'short',
    compact,
    maxWidth,
    followCursor = false,
    tooltipRef,
    container,
    'data-private': dataPrivate,
    ...rest
  } = props

  const classes = useStyles()
  const picassoRootContainer = usePicassoRoot()

  const tooltipState = useTooltipState({ externalOpen: open, followCursor })

  const delayDuration = getDelayDuration(delay, tooltipState.isTouchDevice)

  const followCursorTooltipData = useTooltipFollowCursor({
    followCursor,
    tooltipState,
  })

  const { children, handleOpen, handleClose } = useTooltipHandlers({
    children: originalChildren as ReactElement<ChildrenProps>,
    tooltipState,
    disableListeners,
    onOpen,
    onClose,
    onMouseOver: followCursorTooltipData?.handleMouseOver,
    onMouseMove: followCursorTooltipData?.handleMouseMove,
    onClick: followCursorTooltipData?.handleClick,
  })

  const title = (
    <Typography
      data-private={dataPrivate}
      as='div'
      size='small'
      color='inherit'
    >
      {content}
    </Typography>
  )

  return (
    <MUITooltip
      {...rest}
      ref={ref}
      arrow={!compact && !followCursor}
      PopperProps={{
        ref: tooltipRef,
        container: container || picassoRootContainer,
        disablePortal,
        popperOptions: {
          modifiers: {
            preventOverflow: {
              enabled: preventOverflow,
              boundariesElement: 'window',
            },
            hide: {
              enabled: preventOverflow,
            },
          },
        },
        ...(followCursor && followCursorTooltipData?.followCursorPopperProps),
      }}
      TransitionProps={{
        // passing undefined onExiting or onExited changes Tooltip behavior
        ...(onTransitionExiting && { onExiting: onTransitionExiting }),
        ...(onTransitionExited && { onExiting: onTransitionExited }),
      }}
      classes={{
        arrow: classes.arrow,
        tooltip: cx(classes.tooltip, {
          [classes.light]: !compact,
          [classes.compact]: compact,
          [classes.noMaxWidth]: maxWidth === 'none',
        }),
        popper: popperClassName,
      }}
      className={className}
      style={style}
      interactive={interactive}
      onClose={handleClose}
      onOpen={handleOpen}
      open={tooltipState.isOpen}
      placement={placement}
      title={title}
      disableHoverListener={disableListeners}
      disableFocusListener={disableListeners}
      disableTouchListener
      enterDelay={delayDuration}
      enterNextDelay={delayDuration}
    >
      {children as ReactElement}
    </MUITooltip>
  )
})

Tooltip.defaultProps = {
  preventOverflow: true,
  placement: 'top',
  disablePortal: false,
  maxWidth: 'default',
  delay: 'short',
}

export default Tooltip
