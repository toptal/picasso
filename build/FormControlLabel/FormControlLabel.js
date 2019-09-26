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
import MUIFormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const FormControlLabel = (_a) => {
    var { control, label, classes, className, style } = _a, rest = __rest(_a, ["control", "label", "classes", "className", "style"]);
    return (React.createElement(MUIFormControlLabel
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { control: control, label: label, classes: classes, className: className, style: style })));
};
export default withStyles(styles)(FormControlLabel);
//# sourceMappingURL=FormControlLabel.js.map