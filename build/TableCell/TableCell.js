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
import MUITableCell from '@material-ui/core/TableCell';
import styles from './styles';
export const TableCell = forwardRef(function TableCell(_a, ref) {
    var { align, classes, className, style, children, colSpan } = _a, rest = __rest(_a, ["align", "classes", "className", "style", "children", "colSpan"]);
    return (React.createElement(MUITableCell
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, align: align, classes: classes, className: className, style: style, colSpan: colSpan }), children));
});
TableCell.defaultProps = {
    align: 'inherit'
};
TableCell.displayName = 'TableCell';
export default withStyles(styles)(TableCell);
//# sourceMappingURL=TableCell.js.map