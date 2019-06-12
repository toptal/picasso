"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const Stepper_1 = __importDefault(require("@material-ui/core/Stepper"));
const Step_1 = __importDefault(require("../Step"));
const StepLabel_1 = __importDefault(require("../StepLabel"));
require("../StepIcon");
const StepConnector_1 = __importDefault(require("../StepConnector"));
const styles_2 = __importDefault(require("./styles"));
exports.Stepper = props => {
    const { active, steps, fullWidth, hideLabels, classes, className, style } = props;
    return (react_1.default.createElement(Stepper_1.default, { activeStep: active, connector: react_1.default.createElement(StepConnector_1.default, null), className: classnames_1.default({
            [classes.fullWidth]: fullWidth
        }, className), style: style }, steps.map(label => (react_1.default.createElement(Step_1.default, { key: label },
        react_1.default.createElement(StepLabel_1.default, { hideLabel: hideLabels }, label))))));
};
exports.Stepper.defaultProps = {
    active: 0,
    fullWidth: false,
    hideLabels: false,
    steps: []
};
exports.Stepper.displayName = 'Stepper';
exports.default = styles_1.withStyles(styles_2.default)(exports.Stepper);
//# sourceMappingURL=Stepper.js.map