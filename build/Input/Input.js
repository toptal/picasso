"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const Input_1 = __importDefault(require("@material-ui/core/Input"));
const styles_2 = __importDefault(require("./styles"));
const Input = ({ classes, className, style, disableUnderline, fullWidth, disabled, inputComponent, inputProps, value, onChange }) => {
    return (react_1.default.createElement(Input_1.default, { classes: classes, className: className, style: style, disableUnderline: disableUnderline, fullWidth: fullWidth, disabled: disabled, inputComponent: inputComponent, inputProps: inputProps, value: value, onChange: onChange }));
};
exports.default = styles_1.withStyles(styles_2.default)(Input);
//# sourceMappingURL=Input.js.map