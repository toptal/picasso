import React, {
  useState,
  forwardRef,
  ReactNode,
  ReactElement,
  ChangeEvent,
  HTMLAttributes,
  cloneElement
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUITooltip, { TooltipProps } from '@material-ui/core/Tooltip'
import cx from 'classnames'
import { BaseProps } from '@toptal/picasso-shared'
import { usePicassoRoot } from '@toptal/picasso-provider'

import { isPointerDevice } from '../utils'
import styles from './styles'

export type VariantType = 'light' | 'dark'

export type PlacementType = TooltipProps['placement']

type MaxWidthType = 'none' | 'default'

export type DelayType = 'short' | 'long'

const delayDurations: { [k in DelayType]: number } = {
  short: 200,
  long: 500
}

interface UseTooltipHandlersOptions {
  open?: boolean
  onOpen?: (event: ChangeEvent<{}>) => void
  onClose?: (event: ChangeEvent<{}>) => void
  children: ReactElement<ChildrenProps>
  disableListeners?: boolean
  delay: DelayType
}

type ChildrenProps = {
  onClick?: (event: ChangeEvent<{}>) => void
  onMouseLeave?: () => void
}

type ContainerValue = HTMLElement | (() => HTMLElement)

interface UseTooltipStateOptions {
  externalOpen?: boolean
}

const useTooltipState = ({ externalOpen }: UseTooltipStateOptions) => {
  const isTooltipControlled = typeof externalOpen !== 'undefined'
  const [isOpen, setIsOpen] = useState(
    isTooltipControlled ? externalOpen : false
  )

  const openTooltip = () => {
    setIsOpen(true)
  }
  const closeTooltip = () => {
    setIsOpen(false)
  }

  return {
    isOpen: isTooltipControlled ? externalOpen : isOpen,
    isControlled: isTooltipControlled,
    openTooltip,
    closeTooltip
  }
}

const getDelayDuration = (delay: DelayType) => {
  const isTouchDevice = !isPointerDevice()

  return isTouchDevice ? 0 : delayDurations[delay]
}

const useTooltipHandlers = ({
  open: externalOpen,
  onClose,
  onOpen,
  disableListeners,
  children
}: UseTooltipHandlersOptions) => {
  const isTouchDevice = !isPointerDevice()
  // After closing with click the tooltip should not be opened againg until the mouse leave event
  const [ignoreOpening, setIgnoreOpening] = useState(false)
  const { isOpen, isControlled, openTooltip, closeTooltip } = useTooltipState({
    externalOpen
  })

  if (isControlled) {
    return {
      isOpen,
      handleOpen: onOpen,
      handleClose: onClose,
      children
    }
  }
  const handleClose = (event: ChangeEvent<{}>) => {
    onClose?.(event)
    closeTooltip()
  }
  const handleOpen = (event: ChangeEvent<{}>) => {
    if (ignoreOpening) {
      return
    }

    onOpen?.(event)
    openTooltip()
  }
  const handleClick = (event: ChangeEvent<{}>) => {
    if (disableListeners) {
      return
    }

    children.props.onClick?.(event)
    if (isOpen) {
      setIgnoreOpening(true)
      handleClose(event)
    } else if (isTouchDevice) {
      handleOpen(event)
    }
  }
  const handleMouseLeave = () => {
    setIgnoreOpening(false)
  }

  return {
    isOpen,
    handleOpen,
    handleClose,
    children: cloneElement(children, {
      onClick: handleClick,
      onMouseLeave: handleMouseLeave
    })
  }
}

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Trigger element for tooltip */
  children: ReactNode
  /** Content to be rendered inside tooltip */
  content?: ReactNode
  /** Select color variant to use */
  variant?: VariantType
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
  /** Max width of a tooltip */
  maxWidth?: MaxWidthType
  onTransitionExiting?: () => void
  onTransitionExited?: () => void
  /** Tooltip div ref */
  tooltipRef?: React.Ref<HTMLDivElement>
  /** A node, or a function that returns node. The container will have the portal children appended to it. */
  container?: ContainerValue
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoTooltip' })

export const Tooltip = forwardRef<unknown, Props>((props, ref) => {
  const {
    content,
    children: originalChildren,
    placement,
    interactive,
    className,
    style,
    open,
    onOpen,
    onClose,
    onTransitionExiting,
    onTransitionExited,
    variant,
    disableListeners,
    preventOverflow,
    disablePortal,
    delay = 'short',
    compact,
    maxWidth,
    tooltipRef,
    container,
    ...rest
  } = props

  const classes = useStyles()
  const [arrowRef, setArrowRef] = useState<HTMLSpanElement | null>(null)
  const picassoRootContainer = usePicassoRoot()

  const delayDuration = getDelayDuration(delay)

  const { children, isOpen, handleOpen, handleClose } = useTooltipHandlers({
    open,
    children: originalChildren as ReactElement<ChildrenProps>,
    disableListeners,
    onOpen,
    onClose,
    delay
  })

  const title = (
    <>
      {content}
      {!compact && <span className={classes.arrow} ref={setArrowRef} />}
    </>
  )

  return (
    <MUITooltip
      {...rest}
      ref={ref}
      PopperProps={{
        ref: tooltipRef,
        container: container || picassoRootContainer,
        disablePortal,
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: Boolean(arrowRef),
              element: arrowRef
            },
            preventOverflow: {
              enabled: preventOverflow,
              boundariesElement: 'window'
            },
            hide: {
              enabled: preventOverflow
            }
          }
        }
      }}
      TransitionProps={{
        // passing undefined onExiting or onExited changes Tooltip behavior
        ...(onTransitionExiting && { onExiting: onTransitionExiting }),
        ...(onTransitionExited && { onExiting: onTransitionExited })
      }}
      classes={{
        popper:
          variant === 'light' ? classes.arrowPopperLight : classes.arrowPopper,
        tooltip: cx(classes.tooltip, {
          [classes.light]: variant === 'light',
          [classes.compact]: compact,
          [classes.noMaxWidth]: maxWidth === 'none'
        })
      }}
      className={className}
      style={style}
      interactive={interactive}
      onClose={handleClose}
      onOpen={handleOpen}
      open={isOpen}
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
  variant: 'dark',
  disablePortal: false,
  maxWidth: 'default',
  delay: 'short'
}

export default Tooltip
