"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const classnames_1 = __importDefault(require("classnames"));
const FormHint_1 = __importDefault(require("../FormHint"));
const FormError_1 = __importDefault(require("../FormError"));
const styles_2 = __importDefault(require("./styles"));
exports.FormField = ({ classes, className, style, hint, children, error }) => (react_1.default.createElement("div", { className: classnames_1.default(classes.root, className), style: style },
    children,
    error && react_1.default.createElement(FormError_1.default, { className: classes.error }, error),
    hint && react_1.default.createElement(FormHint_1.default, { className: classes.hint }, hint)));
exports.FormField.defaultProps = {};
exports.FormField.displayName = 'FormField';
exports.default = styles_1.withStyles(styles_2.default)(exports.FormField);
//# sourceMappingURL=FormField.js.map