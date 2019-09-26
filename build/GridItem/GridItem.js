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
import MUIGrid from '@material-ui/core/Grid';
import styles from './styles';
export const GridItem = forwardRef(function GridItem(_a, ref) {
    var { children, small, medium, large, classes, className, style } = _a, rest = __rest(_a, ["children", "small", "medium", "large", "classes", "className", "style"]);
    return (React.createElement(MUIGrid
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, item: true, lg: large, md: medium, xs: small, classes: classes, className: className, style: style }), children));
});
GridItem.defaultProps = {};
GridItem.displayName = 'GridItem';
export default withStyles(styles)(GridItem);
//# sourceMappingURL=GridItem.js.map