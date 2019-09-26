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
import styles from './styles';
import Container from '../../Container';
export const SidebarLogo = forwardRef(function SidebarLogo(_a, ref) {
    var { children, className, classes, style } = _a, rest = __rest(_a, ["children", "className", "classes", "style"]);
    return (React.createElement(Container
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, flex: true, bottom: 'small', left: 'medium', alignItems: 'center', className: className, style: style, classes: classes }), children));
});
SidebarLogo.defaultProps = {};
SidebarLogo.displayName = 'SidebarLogo';
export default withStyles(styles)(SidebarLogo);
//# sourceMappingURL=SidebarLogo.js.map