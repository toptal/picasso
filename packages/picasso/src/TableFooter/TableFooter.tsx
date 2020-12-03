import { makeStyles, Theme } from '@material-ui/core/styles'
import MUITableFooter from '@material-ui/core/TableFooter'
import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { mergeClasses, StandardProps } from '@toptal/picasso-shared'

import styles from './styles'
import { TableSection, TableSectionContext } from '../Table'

export interface Props
  extends StandardProps,
    HTMLAttributes<HTMLTableSectionElement> {
  /** Zero or more Table.Row elements. */
  children: ReactNode
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoTableFooter'
})

export const TableFooter = forwardRef<HTMLTableSectionElement, Props>(
  function TableFooter(props, ref) {
    const {
      classes: externalClasses,
      className,
      style,
      children,
      ...rest
    } = props
    const classes = mergeClasses(useStyles(props), externalClasses)

    return (
      <TableSectionContext.Provider value={TableSection.FOOTER}>
        <MUITableFooter
          // eslint-disable-next-line react/jsx-props-no-spreading
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
