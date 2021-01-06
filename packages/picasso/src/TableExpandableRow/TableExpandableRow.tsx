import React, {
  forwardRef,
  ReactNode,
  HTMLAttributes,
  useRef,
  useEffect
} from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUICollapse from '@material-ui/core/Collapse'
import { BaseProps } from '@toptal/picasso-shared'

import TableRow from '../TableRow'
import TableCell from '../TableCell'
import styles from './styles'

const MAX_COL_SPAN = 100

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoTableExpandableRow'
})

export interface Props extends BaseProps, HTMLAttributes<HTMLTableRowElement> {
  /** Should be valid `<tr>` children such as `Table.Cell`. */
  children: ReactNode
  /** Collapsible content of `TableExpandableRow` */
  content: ReactNode
  /** Whether the row is in collapsed or expanded state */
  expanded?: boolean
  /** Set a stripe even background for the row */
  stripeEven?: boolean
  /** Makes the row appear without transition when it is expanded the very first time */
  defaultExpanded?: boolean
}

export const TableExpandableRow = forwardRef<HTMLTableRowElement, Props>(
  function TableExpandableRow(props, ref) {
    const {
      children,
      content,
      expanded,
      defaultExpanded,
      stripeEven,
      className,
      style,
      ...rest
    } = props
    const classes = useStyles()

    const wasExpandedOnce = useRef(false)
    const shouldTransition = !defaultExpanded || wasExpandedOnce.current

    useEffect(() => {
      if (!wasExpandedOnce.current && expanded) {
        wasExpandedOnce.current = true
      }
    }, [expanded])

    const row = (
      <TableRow
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        className={className}
        style={style}
        stripeEven={stripeEven}
      >
        {children}
      </TableRow>
    )

    return (
      <>
        {row}
        {expanded && (
          <TableRow
            className={cx(className, {
              [classes.stripeEven]: stripeEven
            })}
            style={style}
          >
            <TableCell className={classes.noPadding} colSpan={MAX_COL_SPAN}>
              <MUICollapse appear={shouldTransition} in>
                {content}
              </MUICollapse>
            </TableCell>
          </TableRow>
        )}
      </>
    )
  }
)

TableExpandableRow.defaultProps = {
  expanded: false,
  stripeEven: false
}

TableExpandableRow.displayName = 'TableExpandableRow'

export default TableExpandableRow
