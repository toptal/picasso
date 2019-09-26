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
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MUICircularProgress from '@material-ui/core/CircularProgress';
import styles from './styles';
const CircularProgress = (_a) => {
    var { classes, className, style, size, value, variant } = _a, rest = __rest(_a, ["classes", "className", "style", "size", "value", "variant"]);
    return (React.createElement(MUICircularProgress
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { classes: classes, className: className, style: style, size: size, value: value, variant: variant })));
};
CircularProgress.displayName = 'CircularProgress';
export default withStyles(styles)(CircularProgress);
//# sourceMappingURL=CircularProgress.js.map