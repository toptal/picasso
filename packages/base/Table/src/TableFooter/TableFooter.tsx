import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { TableFooter as MUITableFooter } from '@material-ui/core'
import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'

import styles from './styles'
import { TableSection, TableSectionContext } from '../Table'

export interface Props
  extends BaseProps,
    HTMLAttributes<HTMLTableSectionElement> {
  /** Zero or more Table.Row elements. */
  children: ReactNode
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoTableFooter',
})

export const TableFooter = forwardRef<HTMLTableSectionElement, Props>(
  function TableFooter(props, ref) {
    const { className, style, children, ...rest } = props
    const classes = useStyles()

    return (
      <TableSectionContext.Provider value={TableSection.FOOTER}>
        <MUITableFooter
          {...rest}
          ref={ref}
          classes={classes}
          className={className}
          style={style}
        >
          {children}
        </MUITableFooter>
      </TableSectionContext.Provider>
    )
  }
)

TableFooter.defaultProps = {}

TableFooter.displayName = 'TableFooter'

export default TableFooter
