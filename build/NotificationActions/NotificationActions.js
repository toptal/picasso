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
import Container from '../Container';
import styles from './styles';
export const NotificationActions = forwardRef(function NotificationActions(_a, ref) {
    var { children, classes, className, style } = _a, rest = __rest(_a, ["children", "classes", "className", "style"]);
    return (React.createElement(Container
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { classes: classes, className: className, style: style, top: 'xsmall', flex: true, ref: ref }), children));
});
NotificationActions.defaultProps = {};
NotificationActions.displayName = 'NotificationActions';
export default withStyles(styles)(NotificationActions);
//# sourceMappingURL=NotificationActions.js.map