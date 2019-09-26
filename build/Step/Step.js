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
import MUIStep from '@material-ui/core/Step';
import styles from './styles';
export const Step = (_a) => {
    var { active, children, completed, index } = _a, rest = __rest(_a, ["active", "children", "completed", "index"]);
    return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    React.createElement(MUIStep, Object.assign({}, rest, { active: active, completed: completed, index: index }), children));
};
Step.displayName = 'Step';
export default withStyles(styles)(Step);
//# sourceMappingURL=Step.js.map