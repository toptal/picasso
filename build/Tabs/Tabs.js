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
import MUITabs from '@material-ui/core/Tabs';
import Tab from '../Tab';
import styles from './styles';
// eslint-disable-next-line react/display-name
export const Tabs = forwardRef(function Tabs(_a, ref) {
    var { children, onChange, value } = _a, rest = __rest(_a, ["children", "onChange", "value"]);
    return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    React.createElement(MUITabs, Object.assign({}, rest, { ref: ref, onChange: onChange, value: value }), children));
});
Tabs.defaultProps = {};
Tabs.displayName = 'Tabs';
Tabs.Tab = Tab;
export default withStyles(styles)(Tabs);
//# sourceMappingURL=Tabs.js.map