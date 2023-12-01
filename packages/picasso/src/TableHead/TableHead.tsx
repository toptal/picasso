/* eslint-disable import/no-extraneous-dependencies */
import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { TableHead as MUITableHead } from '@material-ui/core'
import type { BaseProps } from '@toptal/picasso-shared'
import { TableSectionContext, TableSection } from '@toptal/picasso-table'

import styles from './styles'

export interface Props
  extends BaseProps,
    HTMLAttributes<HTMLTableSectionElement> {
  /** The content of the component, normally `Table.Row` */
  children: ReactNode
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoTableHead' })

export const TableHead = forwardRef<HTMLTableSectionElement, Props>(
  function TableHead(props, ref) {
    const { className, style, children, ...rest } = props
    const classes = useStyles()

    return (
      <TableSectionContext.Provider value={TableSection.HEAD}>
        <MUITableHead
          {...rest}
          ref={ref}
          classes={classes}
          className={className}
          style={style}
        >
          {children}
        </MUITableHead>
      </TableSectionContext.Provider>
    )
  }
)

TableHead.defaultProps = {}

TableHead.displayName = 'TableHead'

export default TableHead
