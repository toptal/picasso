"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const FormControlLabel_1 = __importDefault(require("@material-ui/core/FormControlLabel"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const FormControlLabel = ({ control, label, classes, className, style }) => (react_1.default.createElement(FormControlLabel_1.default, { control: control, label: label, classes: classes, className: className, style: style }));
exports.default = styles_1.withStyles(styles_2.default)(FormControlLabel);
//# sourceMappingURL=FormControlLabel.js.map