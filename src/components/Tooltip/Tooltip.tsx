import React, {
  Fragment,
  useState,
  FunctionComponent,
  ReactNode,
  ReactElement,
  ChangeEvent,
  HTMLAttributes
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUITooltip from '@material-ui/core/Tooltip'
import cx from 'classnames'

import { StandardProps, usePicassoRoot } from '../Picasso'
import styles from './styles'

type VariantType = 'light' | 'dark'

type PlacementType = 'bottom' | 'left' | 'right' | 'top'

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
}

export const Tooltip: FunctionComponent<Props> = ({
  content,
  children,
  placement,
  interactive,
  classes,
  className,
  style,
  arrow,
  open,
  onClose,
  onOpen,
  variant,
  disableListeners,
  ...rest
}) => {
  const [arrowRef, setArrowRef] = useState<HTMLSpanElement | null>(null)
  const container = usePicassoRoot()

  const title = (
    <Fragment>
      {content}
      {arrow && <span className={classes.arrow} ref={setArrowRef} />}
    </Fragment>
  )

  return (
    <MUITooltip
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      PopperProps={{
        container,
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: Boolean(arrowRef),
              element: arrowRef
            }
          }
        }
      }}
      classes={{
        popper:
          variant === 'light' ? classes.arrowPopperLight : classes.arrowPopper,
        tooltip: cx(classes.tooltip, {
          [classes.light]: variant === 'light'
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
      disableTouchListener={disableListeners}
    >
      {children as ReactElement}
    </MUITooltip>
  )
}

Tooltip.defaultProps = {
  arrow: true,
  placement: 'top',
  variant: 'dark'
}

export default withStyles(styles)(Tooltip)
