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
import MUITableBody from '@material-ui/core/TableBody';
import TableExpandableRow from '../TableExpandableRow';
import TableRow from '../TableRow';
import styles from './styles';
const decorateRows = (children) => {
    let stripeIndex = -1;
    // eslint-disable-next-line complexity
    return React.Children.map(children, child => {
        if (!React.isValidElement(child)) {
            return child;
        }
        const isTableRow = child.type === TableRow || child.type === TableExpandableRow;
        if (!isTableRow) {
            return child;
        }
        stripeIndex++;
        if (stripeIndex % 2 !== 0) {
            return React.cloneElement(child, { stripeEven: true });
        }
        return child;
    });
};
export const TableBody = forwardRef(function TableBody(_a, ref) {
    var { classes, className, style, children } = _a, rest = __rest(_a, ["classes", "className", "style", "children"]);
    return (React.createElement(MUITableBody
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, classes: classes, className: className, style: style }), decorateRows(children)));
});
TableBody.defaultProps = {};
TableBody.displayName = 'TableBody';
export default withStyles(styles)(TableBody);
//# sourceMappingURL=TableBody.js.map