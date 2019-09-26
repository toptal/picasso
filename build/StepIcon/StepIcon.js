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
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { CheckMinor24 as TickIcon } from '../Icon';
import styles from './styles';
export const StepIcon = (_a) => {
    var { active, completed, classes } = _a, rest = __rest(_a, ["active", "completed", "classes"]);
    return (React.createElement("div", Object.assign({}, rest, { className: cx(classes.root, {
            [classes.active]: active,
            [classes.completed]: completed
        }) }), completed && React.createElement(TickIcon, null)));
};
StepIcon.displayName = 'StepIcon';
export default withStyles(styles)(StepIcon);
//# sourceMappingURL=StepIcon.js.map