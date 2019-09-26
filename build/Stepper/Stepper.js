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
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MUIStepper from '@material-ui/core/Stepper';
import Step from '../Step';
import StepLabel from '../StepLabel';
import '../StepIcon';
import StepConnector from '../StepConnector';
import styles from './styles';
export const Stepper = forwardRef(function Stepper(_a, ref) {
    var { active, steps, fullWidth, hideLabels, classes, className, style } = _a, rest = __rest(_a, ["active", "steps", "fullWidth", "hideLabels", "classes", "className", "style"]);
    return (React.createElement(MUIStepper
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, activeStep: active, connector: React.createElement(StepConnector, null), className: cx({
            [classes.fullWidth]: fullWidth
        }, className), style: style }), steps.map(label => (React.createElement(Step, { key: label },
        React.createElement(StepLabel, { hideLabel: hideLabels }, label))))));
});
Stepper.defaultProps = {
    active: 0,
    fullWidth: false,
    hideLabels: false,
    steps: []
};
Stepper.displayName = 'Stepper';
export default withStyles(styles)(Stepper);
//# sourceMappingURL=Stepper.js.map