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
import MUIInputLabel from '@material-ui/core/InputLabel';
import styles from './styles';
const InputLabel = (_a) => {
    var { variant, htmlFor, classes, className, style, children } = _a, rest = __rest(_a, ["variant", "htmlFor", "classes", "className", "style", "children"]);
    return (React.createElement(MUIInputLabel
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { variant: variant, htmlFor: htmlFor, classes: classes, className: className, style: style }), children));
};
export default withStyles(styles)(InputLabel);
//# sourceMappingURL=InputLabel.js.map