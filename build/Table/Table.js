var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { forwardRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MUITable from '@material-ui/core/Table';
import TableCell from '../TableCell';
import TableBody from '../TableBody';
import TableRow from '../TableRow';
import TableHead from '../TableHead';
import TableFooter from '../TableFooter';
import TableExpandableRow from '../TableExpandableRow';
import styles from './styles';
// eslint-disable-next-line react/display-name
export const Table = forwardRef(function Table(_a, ref) {
    var { classes, className, style, children } = _a, rest = __rest(_a, ["classes", "className", "style", "children"]);
    return (React.createElement(MUITable
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, classes: classes, className: className, style: style }), children));
});
Table.defaultProps = {};
Table.displayName = 'Table';
Table.Body = TableBody;
Table.Cell = TableCell;
Table.Body = TableBody;
Table.Head = TableHead;
Table.Row = TableRow;
Table.ExpandableRow = TableExpandableRow;
Table.Footer = TableFooter;
export default withStyles(styles)(Table);
//# sourceMappingURL=Table.js.map