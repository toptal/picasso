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
import { usePicassoRoot, BaseProps, omit } from '@toptal/picasso-shared'

import styles from './styles'

type VariantType = 'light' | 'dark'

export type PlacementType = 'bottom' | 'left' | 'right' | 'top'

type MaxWidthType = 'none' | 'default'

type DelayType = 'short' | 'long'

const delayDurations: { [k in DelayType]: number } = {
  short: 200,
  long: 500
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

  const title = (
    <>
      {content}
      {arrow && !compact && (
        <span className={classes.arrow} ref={setArrowRef} />
      )}
    </>
  )

  const delayDuration = delayDurations[delay]
  const tooltipProps = omit(rest, 'maxWidth')

  return (
    <MUITooltip
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...tooltipProps}
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
      onClose={onClose}
      onOpen={onOpen}
      open={open}
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
  preventOverflow: false,
  placement: 'top',
  variant: 'dark',
  disablePortal: false,
  maxWidth: 'default'
}

export default Tooltip
