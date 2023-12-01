/* eslint-disable import/no-extraneous-dependencies */
import type { ReactNode, MouseEvent, HTMLAttributes } from 'react'
import React, { forwardRef, useContext } from 'react'
import cx from 'classnames'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { TableRow as MUITableRow } from '@material-ui/core'
import type { BaseProps } from '@toptal/picasso-shared'
import { TableContext } from '@toptal/picasso-table'

import styles from './styles'

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
          [borderedClass]: isBordered,
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
  stripeEven: false,
}

TableRow.displayName = 'TableRow'

export default TableRow
