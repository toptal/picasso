import React, {
  forwardRef,
  ReactNode,
  MouseEvent,
  HTMLAttributes,
  useContext
} from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUITableRow from '@material-ui/core/TableRow'
import { BaseProps } from '@toptal/picasso-shared'

import styles from './styles'
import { TableContext } from '../Table'

export interface Props extends BaseProps, HTMLAttributes<HTMLTableRowElement> {
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
  function TableRow (props, ref) {
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
    const {
      stripeEven: stripeEvenClass,
      bordered: borderedClass,
      ...muiClasses
    } = useStyles()
    const { variant } = useContext(TableContext)
    const isBordered = variant === 'bordered' || variant === 'striped'

    return (
      <MUITableRow
        {...rest}
        ref={ref}
        classes={muiClasses}
        className={cx(className, {
          [stripeEvenClass]: stripeEven,
          [borderedClass]: isBordered
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
