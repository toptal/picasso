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
import { withStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import React, { forwardRef, memo } from 'react';
import styles from './styles';
/** Currency List: https://www.currency-iso.org/en/home/tables/table-a1.html */
export const Amount = memo(
// eslint-disable-next-line react/display-name
forwardRef(function Amount(_a, ref) {
    var { amount, className, classes, currency } = _a, rest = __rest(_a, ["amount", "className", "classes", "currency"]);
    const formattedAmount = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency
    }).format(amount);
    return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    React.createElement("span", Object.assign({}, rest, { ref: ref, className: cx(classes.root, className) }), formattedAmount));
}));
Amount.defaultProps = {
    currency: 'USD'
};
Amount.displayName = 'Amount';
export default withStyles(styles)(Amount);
//# sourceMappingURL=Amount.js.map