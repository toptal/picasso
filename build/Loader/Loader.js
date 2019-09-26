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
import { capitalize } from '@material-ui/core/utils/helpers';
import cx from 'classnames';
import CircularProgress from '../CircularProgress';
import styles from './styles';
var SIZES;
(function (SIZES) {
    SIZES[SIZES["small"] = 16] = "small";
    SIZES[SIZES["medium"] = 32] = "medium";
    SIZES[SIZES["large"] = 64] = "large";
})(SIZES || (SIZES = {}));
export const Loader = forwardRef(function Loader(_a, ref) {
    var { children, classes, size, inline, className, value, variant } = _a, rest = __rest(_a, ["children", "classes", "size", "inline", "className", "value", "variant"]);
    return (React.createElement("div", Object.assign({}, rest, { ref: ref, className: cx(classes.wrapper, className, {
            [classes.inline]: inline
        }) }),
        React.createElement(CircularProgress, { classes: {
                root: classes[`spinner${capitalize(variant)}`]
            }, size: SIZES[size], value: value, variant: value ? 'static' : 'indeterminate' }),
        children && React.createElement("div", { className: classes.label }, children)));
});
Loader.defaultProps = {
    inline: false,
    size: 'medium',
    variant: 'default'
};
Loader.displayName = 'Loader';
export default withStyles(styles)(Loader);
//# sourceMappingURL=Loader.js.map