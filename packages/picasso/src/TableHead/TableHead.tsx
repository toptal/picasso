import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import MUITableHead from '@mui/material/TableHead'
import { BaseProps } from '@toptal/picasso-shared'

import styles from './styles'
import { TableSectionContext, TableSection } from '../Table'

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
