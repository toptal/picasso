import React, { Fragment, useState, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUITooltip from '@material-ui/core/Tooltip'
import cx from 'classnames'

import { Classes } from '../styles/types'
import styles from './styles'

type VariantType = 'light' | 'dark'

type TriggerType = 'hover' | 'click'

type PlacementType = 'bottom' | 'left' | 'right' | 'top'

interface Props {
  classes: Classes
  /** Trigger element for tooltip */
  children: React.ReactNode
  /** Content to be rendered inside tooltip */
  content?: React.ReactNode
  /** Whether tooltip should display arrow */
  arrow?: boolean
  /** Select color variant to use */
  variant?: VariantType
  /** Where should the tooltip be positioned */
  placement?: PlacementType
  /** Called when tooltip is closed */
  onClose?: (event: React.ChangeEvent<{}>) => void
  /** Called when tooltip is opened */
  onOpen?: (event: React.ChangeEvent<{}>) => void
  /** Whether user can interact with tooltip content */
  interactive?: boolean
  /** Programatically control tooltip's visibility */
  open?: boolean
  trigger?: TriggerType
}

const getPopperProps = (arrow: boolean, arrowRef: null | HTMLElement) => ({
  popperOptions: {
    modifiers: {
      arrow: {
        enabled: arrow,
        element: arrowRef
      }
    }
  }
})
const getClasses = (classes: Classes, variant: VariantType) => {
  const isLight = variant === 'light'

  return {
    popper: isLight ? classes.arrowPopperLight : classes.arrowPopper,
    tooltip: cx(classes.tooltip, {
      [classes.light]: isLight
    })
  }
}

export const Tooltip: React.FunctionComponent<Props> = props => {
  const {
    content,
    children,
    placement,
    interactive,
    classes,
    arrow,
    open,
    onClose,
    onOpen,
    variant,
    trigger
  } = props

  const [arrowRef, setArrowRef] = useState(null)
  const title = (
    <Fragment>
      {content}
      {arrow && (
        <span
          className={classes.arrow}
          // @ts-ignore
          ref={setArrowRef}
        />
      )}
    </Fragment>
  )

  return (
    <MUITooltip
      PopperProps={getPopperProps(arrow!, arrowRef)}
      classes={getClasses(classes, variant!)}
      disableHoverListener={trigger === 'click'}
      interactive={interactive}
      onClose={onClose}
      onOpen={onOpen}
      open={open}
      placement={placement}
      title={title}
    >
      {children as React.ReactElement}
    </MUITooltip>
  )
}

Tooltip.defaultProps = {
  arrow: true,
  placement: 'top',
  trigger: 'hover',
  variant: 'dark'
}

export default withStyles(styles)(Tooltip)
