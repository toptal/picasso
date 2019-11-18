var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {}
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p]
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]]
      }
    return t
  }
import React, { forwardRef, Fragment } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import MUICollapse from '@material-ui/core/Collapse'
import TableRow from '../TableRow'
import TableCell from '../TableCell'
import styles from './styles'
const MAX_COL_SPAN = 100
const useStyles = makeStyles(styles)
export const TableExpandableRow = forwardRef(function TableExpandableRow(
  props,
  ref
) {
  const classes = useStyles(props)
  const { children, content, expanded, stripeEven, className, style } = props,
    rest = __rest(props, [
      'children',
      'content',
      'expanded',
      'stripeEven',
      'className',
      'style'
    ])
  const row = React.createElement(
    TableRow,
    // eslint-disable-next-line react/jsx-props-no-spreading
    Object.assign({}, rest, {
      ref: ref,
      className: className,
      style: style,
      stripeEven: stripeEven
    }),
    children
  )
  return React.createElement(
    Fragment,
    null,
    row,
    expanded &&
      React.createElement(
        TableRow,
        {
          className: cx(className, {
            [classes.stripeEven]: stripeEven
          }),
          style: style
        },
        React.createElement(
          TableCell,
          { colSpan: MAX_COL_SPAN },
          React.createElement(MUICollapse, { appear: true, in: true }, content)
        )
      )
  )
})
TableExpandableRow.defaultProps = {
  expanded: false,
  stripeEven: false
}
TableExpandableRow.displayName = 'TableExpandableRow'
export default TableExpandableRow
//# sourceMappingURL=TableExpandableRow.js.map
