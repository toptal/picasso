import React, {
  ReactElement,
  HTMLAttributes,
  forwardRef,
  FunctionComponent
} from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import { makeStyles, Theme } from '@material-ui/core/styles'

import TableCell from '../TableCell'
import TableRow from '../TableRow'
import TableBody from '../TableBody'
import styles from './styles'

const MAX_COL_SPAN = 100

export interface Props
  extends BaseProps,
    HTMLAttributes<HTMLTableSectionElement> {
  colSpan?: number
  icon?: ReactElement
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoTableSectionHead'
})

export const TableSectionHead: FunctionComponent<Props> = forwardRef<
  HTMLTableSectionElement,
  Props
>(function TableSectionHead (props, ref) {
  const { colSpan, icon, children, style } = props

  const classes = useStyles()

  return (
    <TableBody ref={ref}>
      <TableRow className={classes.sectionHeaderRow} style={style}>
        <TableCell className={classes.sectionHeaderCell} colSpan={colSpan}>
          {icon && <span className={classes.iconWrapper}>{icon}</span>}
          {children}
        </TableCell>
      </TableRow>
    </TableBody>
  )
})

TableSectionHead.defaultProps = {
  colSpan: MAX_COL_SPAN
}

TableSectionHead.displayName = 'TableSectionHead'

export default TableSectionHead
