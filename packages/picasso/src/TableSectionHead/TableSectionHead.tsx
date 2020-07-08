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

export interface Props
  extends BaseProps,
    HTMLAttributes<HTMLTableSectionElement> {
  icon?: ReactElement
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoTableSectionHead'
})

export const TableSectionHead: FunctionComponent<Props> = forwardRef<
  HTMLTableSectionElement,
  Props
>(function TableSectionHead(props, ref) {
  const { icon, children, style } = props

  const classes = useStyles(props)

  return (
    <TableBody ref={ref}>
      <TableRow className={classes.sectionHeaderRow} style={style}>
        <TableCell>
          {icon && <span className={classes.iconWrapper}>{icon}</span>}
          {children}
        </TableCell>
      </TableRow>
    </TableBody>
  )
})

TableSectionHead.displayName = 'TableSectionHead'

export default TableSectionHead
