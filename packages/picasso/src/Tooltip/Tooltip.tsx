import React, {
  useState,
  FunctionComponent,
  ReactNode,
  ReactElement,
  ChangeEvent,
  HTMLAttributes
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUITooltip from '@material-ui/core/Tooltip'
import cx from 'classnames'
import { usePicassoRoot, BaseProps } from '@toptal/picasso-shared'

import { isPointerDevice } from '../utils'
import styles from './styles'

type VariantType = 'light' | 'dark'

export type PlacementType = 'bottom' | 'left' | 'right' | 'top'

type DelayType = 'short' | 'long'

const delayDurations: { [k in DelayType]: number } = {
  short: 200,
  long: 500
}

interface UseTooltipHandlersOptions {
  open?: boolean
  onOpen?(event: ChangeEvent<{}>): void
  onClose?(event: ChangeEvent<{}>): void
  delay?: DelayType
}

const useTooltipHandlers = ({
  open: externalOpen,
  onClose,
  onOpen,
  delay
}: UseTooltipHandlersOptions) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const delayDuration = delay && isPointerDevice() ? delayDurations[delay] : 0
  const isHoverTriggeredTooltip = externalOpen === undefined

  if (isHoverTriggeredTooltip) {
    const handleOpen = (event: ChangeEvent<{}>) => {
      onOpen?.(event)
      setInternalOpen(true)
    }

    const handleClose = (event: ChangeEvent<{}>) => {
      onClose?.(event)
      setInternalOpen(false)
    }

    return {
      isOpen: internalOpen,
      handleOpen,
      handleClose,
      handleClick: () => setInternalOpen(true),
      delayDuration
    }
  }

  return {
    isOpen: externalOpen,
    handleOpen: onOpen,
    handleClose: onClose,
    delayDuration
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
}

const useStyles = makeStyles<Theme, Props>(styles, { name: 'PicassoTooltip' })

export const Tooltip: FunctionComponent<Props> = props => {
  const {
    content,
    children,
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
    ...rest
  } = props

  const classes = useStyles(props)
  const [arrowRef, setArrowRef] = useState<HTMLSpanElement | null>(null)
  const container = usePicassoRoot()

  const {
    isOpen,
    handleOpen,
    handleClose,
    handleClick,
    delayDuration
  } = useTooltipHandlers({
    open,
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
              boundariesElement: 'scrollParent'
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
          [classes.compact]: compact
        })
      }}
      className={className}
      style={style}
      interactive={interactive}
      onClose={handleClose}
      onOpen={handleOpen}
      onClick={handleClick}
      open={isOpen}
      placement={placement}
      title={title}
      disableHoverListener={disableListeners}
      disableFocusListener={disableListeners}
      disableTouchListener={disableListeners}
      enterDelay={delayDuration}
      enterNextDelay={delayDuration}
      enterTouchDelay={0}
    >
      {children as ReactElement}
    </MUITooltip>
  )
}

Tooltip.defaultProps = {
  arrow: true,
  preventOverflow: false,
  placement: 'top',
  variant: 'dark',
  disablePortal: false
}

export default Tooltip
