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
import MUIStepLabel from '@material-ui/core/StepLabel';
import StepIcon from '../StepIcon';
import styles from './styles';
export const StepLabel = (_a) => {
    var { active, classes, className, children, completed, hideLabel, style } = _a, rest = __rest(_a, ["active", "classes", "className", "children", "completed", "hideLabel", "style"]);
    return (React.createElement(MUIStepLabel
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { active: active, classes: {
            labelContainer: cx({
                [classes.root]: !hideLabel || active
            }),
            label: cx({ [classes.hidden]: hideLabel })
        }, className: className, completed: completed, icon: React.createElement(StepIcon, { active: active, completed: completed }), style: style }),
        React.createElement("span", { className: classes.label }, children)));
};
StepLabel.defaultProps = {
    hideLabel: false
};
StepLabel.displayName = 'StepLabel';
export default withStyles(styles)(StepLabel);
//# sourceMappingURL=StepLabel.js.map