import React, {
  useState,
  FunctionComponent,
  ReactNode,
  ReactElement,
  ChangeEvent,
  HTMLAttributes,
  cloneElement,
  useRef,
  useEffect
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUITooltip, { TooltipProps } from '@material-ui/core/Tooltip'
import cx from 'classnames'
import { usePicassoRoot, BaseProps } from '@toptal/picasso-shared'

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
  children: ReactElement<ChildrenProps>
  disableListeners?: boolean
  delay: DelayType
}

type ChildrenProps = {
  onClick?(event: ChangeEvent<{}>): void
  onMouseOver?(event: MouseEvent): void
  onMouseLeave?(event: MouseEvent): void
}

interface UseTooltipStateOptions {
  externalOpen?: boolean
  delayDuration: number
}

const useTooltipState = ({
  externalOpen,
  delayDuration
}: UseTooltipStateOptions) => {
  const isTooltipControlled = typeof externalOpen !== 'undefined'
  const [isOpen, setIsOpen] = useState(
    isTooltipControlled ? externalOpen : false
  )
  const [isPristine, setIsPristine] = useState(true)
  const delayTimeout = useRef<number | undefined>()

  const openTooltip = () => {
    clearTimeout(delayTimeout.current)
    delayTimeout.current = window.setTimeout(() => {
      setIsOpen(true)
    }, delayDuration)
  }
  const closeTooltip = () => {
    clearTimeout(delayTimeout.current)
    setIsOpen(false)
  }

  useEffect(() => {
    if (isTooltipControlled) {
      const next = externalOpen ? openTooltip : closeTooltip

      next()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalOpen])

  useEffect(() => {
    return () => clearTimeout(delayTimeout.current)
  }, [])

  return {
    isOpen,
    isControlled: isTooltipControlled,
    isPristine,
    openTooltip,
    closeTooltip,
    setIsPristine
  }
}

const useTooltipHandlers = ({
  open: externalOpen,
  onClose,
  onOpen,
  disableListeners,
  children,
  delay
}: UseTooltipHandlersOptions) => {
  const isTouchDevice = !isPointerDevice()
  const delayDuration = isTouchDevice ? 0 : delayDurations[delay]

  const {
    isOpen,
    isControlled,
    isPristine,
    openTooltip,
    closeTooltip,
    setIsPristine
  } = useTooltipState({
    externalOpen,
    delayDuration
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
  const handleClick = (event: ChangeEvent<{}>) => {
    children.props.onClick?.(event)
    if (isOpen) {
      closeTooltip()
    } else if (isPristine && !disableListeners) {
      openTooltip()
      setIsPristine(false)
    }
  }
  const handleOnMouseOver = (event: MouseEvent) => {
    event.preventDefault()
    if (!isTouchDevice && !isOpen && isPristine) {
      openTooltip()
    }
  }
  const handleOnMouseLeave = (event: MouseEvent) => {
    event.preventDefault()
    setIsPristine(true)
  }

  return {
    isOpen,
    handleOpen: onOpen,
    handleClose,
    children: cloneElement(children, {
      onClick: handleClick,
      onMouseOver: handleOnMouseOver,
      onMouseLeave: handleOnMouseLeave
    })
  }
}

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
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
    ...rest
  } = props

  const classes = useStyles(props)
  const [arrowRef, setArrowRef] = useState<HTMLSpanElement | null>(null)
  const container = usePicassoRoot()

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
