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
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MUITableRow from '@material-ui/core/TableRow';
import styles from './styles';
export const TableRow = forwardRef(function TableRow(_a, ref) {
    var { classes, className, style, children, hover, selected, stripeEven, onClick } = _a, rest = __rest(_a, ["classes", "className", "style", "children", "hover", "selected", "stripeEven", "onClick"]);
    const { stripeEven: stripeEvenClass } = classes, restClasses = __rest(classes, ["stripeEven"]);
    return (React.createElement(MUITableRow
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, classes: restClasses, className: cx(className, {
            [stripeEvenClass]: stripeEven
        }), style: style, hover: hover, selected: selected, onClick: onClick }), children));
});
TableRow.defaultProps = {
    hover: false,
    selected: false,
    stripeEven: false
};
TableRow.displayName = 'TableRow';
export default withStyles(styles)(TableRow);
//# sourceMappingURL=TableRow.js.map