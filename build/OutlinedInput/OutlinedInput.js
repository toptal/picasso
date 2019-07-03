"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const OutlinedInput_1 = __importDefault(require("@material-ui/core/OutlinedInput"));
const styles_2 = __importDefault(require("./styles"));
const OutlinedInput = ({ classes, className, style, labelWidth, fullWidth, disabled, inputComponent, inputProps, inputRef, value, type, error, startAdornment, endAdornment, onChange }) => {
    return (react_1.default.createElement(OutlinedInput_1.default, { classes: classes, className: className, style: style, labelWidth: labelWidth, fullWidth: fullWidth, disabled: disabled, error: error, inputComponent: inputComponent, inputProps: inputProps, inputRef: inputRef, value: value, type: type, startAdornment: startAdornment, endAdornment: endAdornment, onChange: onChange }));
};
exports.default = styles_1.withStyles(styles_2.default)(OutlinedInput);
//# sourceMappingURL=OutlinedInput.js.map