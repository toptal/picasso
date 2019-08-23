"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const Stepper_1 = __importDefault(require("@material-ui/core/Stepper"));
const Step_1 = __importDefault(require("../Step"));
const StepLabel_1 = __importDefault(require("../StepLabel"));
require("../StepIcon");
const StepConnector_1 = __importDefault(require("../StepConnector"));
const styles_2 = __importDefault(require("./styles"));
exports.Stepper = react_1.forwardRef(function Stepper(_a, ref) {
    var { active, steps, fullWidth, hideLabels, classes, className, style } = _a, rest = __rest(_a, ["active", "steps", "fullWidth", "hideLabels", "classes", "className", "style"]);
    return (react_1.default.createElement(Stepper_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, activeStep: active, connector: react_1.default.createElement(StepConnector_1.default, null), className: classnames_1.default({
            [classes.fullWidth]: fullWidth
        }, className), style: style }), steps.map(label => (react_1.default.createElement(Step_1.default, { key: label },
        react_1.default.createElement(StepLabel_1.default, { hideLabel: hideLabels }, label))))));
});
exports.Stepper.defaultProps = {
    active: 0,
    fullWidth: false,
    hideLabels: false,
    steps: []
};
exports.Stepper.displayName = 'Stepper';
exports.default = styles_1.withStyles(styles_2.default)(exports.Stepper);
//# sourceMappingURL=Stepper.js.map