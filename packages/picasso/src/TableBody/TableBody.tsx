import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUITableBody from '@material-ui/core/TableBody'
import { mergeClasses, StandardProps } from '@toptal/picasso-shared'

import styles from './styles'
import { TableSectionContext, TableSection } from '../Table'

export interface Props
  extends StandardProps,
    HTMLAttributes<HTMLTableSectionElement> {
  /** The content of the component, normally `Table.Row` */
  children: ReactNode
}

const decorateRows = (children: React.ReactNode) => {
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

const useStyles = makeStyles<Theme, Props>(styles, { name: 'PicassoTableBody' })

export const TableBody = forwardRef<HTMLTableSectionElement, Props>(
  function TableBody(props, ref) {
    const {
      classes: externalClasses,
      className,
      style,
      children,
      ...rest
    } = props
    const classes = mergeClasses(useStyles(props), externalClasses)

    return (
      <TableSectionContext.Provider value={TableSection.BODY}>
        <MUITableBody
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
          ref={ref}
          classes={classes}
          className={className}
          style={style}
        >
          {decorateRows(children)}
        </MUITableBody>
      </TableSectionContext.Provider>
    )
  }
)

TableBody.defaultProps = {}

TableBody.displayName = 'TableBody'

export default TableBody
