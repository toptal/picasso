import React, {
  useState,
  FunctionComponent,
  ReactNode,
  ReactElement,
  ChangeEvent,
  HTMLAttributes,
  cloneElement
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUITooltip, { TooltipProps } from '@material-ui/core/Tooltip'
import cx from 'classnames'
import {
  usePicassoRoot,
  StandardProps,
  mergeClasses
} from '@toptal/picasso-shared'

import { isPointerDevice } from '../utils'
import styles from './styles'

type VariantType = 'light' | 'dark'

export type PlacementType = TooltipProps['placement']

type MaxWidthType = 'none' | 'default'

export type DelayType = 'short' | 'long'

const delayDurations: { [k in DelayType]: number } = {
  short: 200,
  long: 500
}

interface UseTooltipHandlersOptions {
  open?: boolean
  onOpen?(event: ChangeEvent<{}>): void
  onClose?(event: ChangeEvent<{}>): void
  delay: DelayType
  children: ReactElement<ChildrenProps>
  disableListeners?: boolean
}

type ChildrenProps = {
  onClick?(event: ChangeEvent<{}>): void
  onMouseOver?(event: MouseEvent): void
  onMouseLeave?(event: MouseEvent): void
}

const useTooltipHandlers = ({
  open: externalOpen,
  onClose,
  onOpen,
  delay,
  disableListeners,
  children
}: UseTooltipHandlersOptions) => {
  const isTouchScreen = !isPointerDevice()
  const [internalOpen, setInternalOpen] = useState(false)
  const [isPristine, setIsPristine] = useState(true)
  const delayDuration = isTouchScreen ? 0 : delayDurations[delay]
  const isUncontrolledTooltip = externalOpen === undefined

  if (isUncontrolledTooltip) {
    /**
     * `onClose` is called by MUI when close is requested, for example on click away.
     * Since we are controlling tooltip here, we have to do actual close on our own.
     */

    const openTooltip = () => {
      if (!disableListeners) {
        setInternalOpen(true)
        setIsPristine(false)
      }
    }

    const closeTooltip = () => {
      setInternalOpen(false)
    }

    const handleClose = (event: ChangeEvent<{}>) => {
      onClose?.(event)
      closeTooltip()
    }

    const handleClick = (event: ChangeEvent<{}>) => {
      children.props.onClick?.(event)

      if (internalOpen) {
        closeTooltip()

        return
      }
      if (isPristine) {
        openTooltip()
      }
    }

    const handleOnMouseOver = (event: MouseEvent) => {
      event.preventDefault()
      if (!isTouchScreen && !internalOpen && isPristine) {
        openTooltip()
      }
    }

    const handleOnMouseLeave = (event: MouseEvent) => {
      event.preventDefault()
      setIsPristine(true)
    }

    return {
      isOpen: internalOpen,
      handleOpen: onOpen,
      handleClose,
      delayDuration,
      children: cloneElement(children, {
        onClick: handleClick,
        onMouseOver: handleOnMouseOver,
        onMouseLeave: handleOnMouseLeave
      })
    }
  }

  return {
    isOpen: externalOpen,
    handleOpen: onOpen,
    handleClose: onClose,
    delayDuration,
    children
  }
}

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Trigger element for tooltip */
  children: ReactNode
  /** Content to be rendered inside tooltip */
  content?: ReactNode
  /** Whether tooltip should display arrow */
  arrow?: boolean
  /** Select color variant to use */
  variant?: VariantType
  /** Where should the tooltip be positioned */
  placement?: PlacementType
  /** Called when tooltip is closed */
  onClose?: (event: ChangeEvent<{}>) => void
  /** Called when tooltip is opened */
  onOpen?: (event: ChangeEvent<{}>) => void
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
}

const useStyles = makeStyles<Theme, Props>(styles, { name: 'PicassoTooltip' })

export const Tooltip: FunctionComponent<Props> = props => {
  const {
    content,
    children: originalChildren,
    placement,
    interactive,
    className,
    style,
    arrow,
    open,
    onClose,
    onOpen,
    variant,
    disableListeners,
    preventOverflow,
    disablePortal,
    delay = 'short',
    compact,
    maxWidth,
    classes: externalClasses,
    ...rest
  } = props

  const classes = mergeClasses(useStyles(props), externalClasses)
  const [arrowRef, setArrowRef] = useState<HTMLSpanElement | null>(null)
  const container = usePicassoRoot()

  const {
    children,
    isOpen,
    handleOpen,
    handleClose,
    delayDuration
  } = useTooltipHandlers({
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
      {arrow && !compact && (
        <span className={classes.arrow} ref={setArrowRef} />
      )}
    </>
  )

  return (
    <MUITooltip
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      PopperProps={{
        container,
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
}

Tooltip.defaultProps = {
  arrow: true,
  preventOverflow: true,
  placement: 'top',
  variant: 'dark',
  disablePortal: false,
  maxWidth: 'default',
  delay: 'short'
}

export default Tooltip
