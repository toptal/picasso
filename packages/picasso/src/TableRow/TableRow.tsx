import React, { forwardRef, ReactNode, MouseEvent, HTMLAttributes } from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUITableRow from '@material-ui/core/TableRow'
import { StandardProps } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props
  extends StandardProps,
    HTMLAttributes<HTMLTableRowElement> {
  /** Should be valid `<tr>` children such as `Table.Cell`. */
  children: ReactNode
  /** If true, the table row will shade on hover */
  hover?: boolean
  /** If true, the table row will have the selected shading */
  selected?: boolean
  /** Callback invoked when user clicks on table row */
  onClick?: (event: MouseEvent<HTMLTableRowElement>) => void
  /** Set a stripe even background for the row */
  stripeEven?: boolean
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoTableRow' })

export const TableRow = forwardRef<HTMLTableRowElement, Props>(
  function TableRow(props, ref) {
    const {
      className,
      style,
      children,
      hover,
      selected,
      stripeEven,
      onClick,
      ...rest
    } = props
    const classes = useStyles()
    const { stripeEven: stripeEvenClass, ...restClasses } = classes

    return (
      <MUITableRow
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        classes={restClasses}
        className={cx(className, {
          [stripeEvenClass]: stripeEven
        })}
        style={style}
        hover={hover}
        selected={selected}
        onClick={onClick}
      >
        {children}
      </MUITableRow>
    )
  }
)

TableRow.defaultProps = {
  hover: false,
  selected: false,
  stripeEven: false
}

TableRow.displayName = 'TableRow'

export default TableRow
