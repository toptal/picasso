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
import MUIList from '@material-ui/core/List';
import styles from './styles';
const List = (_a) => {
    var { classes, className, style } = _a, rest = __rest(_a, ["classes", "className", "style"]);
    return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    React.createElement(MUIList, Object.assign({}, rest, { classes: classes, className: className, style: style })));
};
export default withStyles(styles)(List);
//# sourceMappingURL=List.js.map