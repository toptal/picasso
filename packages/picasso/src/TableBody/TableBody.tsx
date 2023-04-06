import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef, useContext } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { TableBody as MUITableBody } from '@material-ui/core'
import type { BaseProps } from '@toptal/picasso-shared'

import styles from './styles'
import { TableSectionContext, TableSection, TableContext } from '../Table'

export interface Props
  extends BaseProps,
    HTMLAttributes<HTMLTableSectionElement> {
  /** The content of the component, normally `Table.Row` */
  children: ReactNode
}

const stripeRows = (children: React.ReactNode) => {
  let stripeIndex = -1

  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child
    }

    stripeIndex++
    if (stripeIndex % 2 !== 0) {
      return React.cloneElement(child, { stripeEven: true })
    }

    return child
  })
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoTableBody' })

export const TableBody = forwardRef<HTMLTableSectionElement, Props>(
  function TableBody(props, ref) {
    const { className, style, children, ...rest } = props
    const classes = useStyles()
    const { variant } = useContext(TableContext)

    return (
      <TableSectionContext.Provider value={TableSection.BODY}>
        <MUITableBody
          {...rest}
          ref={ref}
          classes={classes}
          className={className}
          style={style}
        >
          {variant === 'striped' ? stripeRows(children) : children}
        </MUITableBody>
      </TableSectionContext.Provider>
    )
  }
)

TableBody.defaultProps = {}

TableBody.displayName = 'TableBody'

export default TableBody
