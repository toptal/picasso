import React, { forwardRef, ReactNode, HTMLAttributes, useContext } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUITableBody from '@material-ui/core/TableBody'
import { BaseProps } from '@toptal/picasso-shared'

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
  function TableBody (props, ref) {
    const { className, style, children, ...rest } = props
    const classes = useStyles()
    const { striped } = useContext(TableContext)

    return (
      <TableSectionContext.Provider value={TableSection.BODY}>
        <MUITableBody
          {...rest}
          ref={ref}
          classes={classes}
          className={className}
          style={style}
        >
          {striped ? stripeRows(children) : children}
        </MUITableBody>
      </TableSectionContext.Provider>
    )
  }
)

TableBody.defaultProps = {}

TableBody.displayName = 'TableBody'

export default TableBody
