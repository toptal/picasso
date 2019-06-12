"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
const styles_2 = __importDefault(require("./styles"));
const FormControl = ({ children, classes, className, error, disabled, style }) => (react_1.default.createElement(FormControl_1.default, { classes: classes, className: className, style: style, error: error, disabled: disabled }, children));
exports.default = styles_1.withStyles(styles_2.default)(FormControl);
//# sourceMappingURL=FormControl.js.map