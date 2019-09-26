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
import MUITab from '@material-ui/core/Tab';
import styles from './styles';
export const Tab = forwardRef(function Tab(_a, ref) {
    var { disabled, value, label, selected, onChange, onClick } = _a, rest = __rest(_a, ["disabled", "value", "label", "selected", "onChange", "onClick"]);
    return (React.createElement(MUITab
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, disabled: disabled, label: label, value: value, selected: selected, onChange: onChange, onClick: onClick })));
});
Tab.defaultProps = {};
Tab.displayName = 'Tab';
export default withStyles(styles)(Tab);
//# sourceMappingURL=Tab.js.map