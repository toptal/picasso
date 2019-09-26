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
import MUIInputAdornment from '@material-ui/core/InputAdornment';
import cx from 'classnames';
import styles from './styles';
const InputAdornment = (_a) => {
    var { classes, className, style, children, position, disabled } = _a, rest = __rest(_a, ["classes", "className", "style", "children", "position", "disabled"]);
    return (React.createElement(MUIInputAdornment
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { classes: {
            root: cx(classes.root, {
                [classes.rootDisabled]: disabled
            })
        }, className: className, style: style, position: position }), children));
};
export default withStyles(styles)(InputAdornment);
//# sourceMappingURL=InputAdornment.js.map