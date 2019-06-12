"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const InputLabel_1 = __importDefault(require("@material-ui/core/InputLabel"));
const styles_2 = __importDefault(require("./styles"));
const InputLabel = ({ variant, htmlFor, classes, className, style, children }) => (react_1.default.createElement(InputLabel_1.default, { variant: variant, htmlFor: htmlFor, classes: classes, className: className, style: style }, children));
exports.default = styles_1.withStyles(styles_2.default)(InputLabel);
//# sourceMappingURL=InputLabel.js.map