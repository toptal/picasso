import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUITableHead from '@material-ui/core/TableHead'
import { StandardProps, mergeClasses } from '@toptal/picasso-shared'

import styles from './styles'
import { TableSectionContext, TableSection } from '../Table'

export interface Props
  extends StandardProps,
    HTMLAttributes<HTMLTableSectionElement> {
  /** The content of the component, normally `Table.Row` */
  children: ReactNode
}

const useStyles = makeStyles<Theme, Props>(styles, { name: 'PicassoTableHead' })

export const TableHead = forwardRef<HTMLTableSectionElement, Props>(
  function TableHead(props, ref) {
    const {
      classes: externalClasses,
      className,
      style,
      children,
      ...rest
    } = props
    const classes = mergeClasses(useStyles(props), externalClasses)

    return (
      <TableSectionContext.Provider value={TableSection.HEAD}>
        <MUITableHead
          // eslint-disable-next-line react/jsx-props-no-spreading
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
