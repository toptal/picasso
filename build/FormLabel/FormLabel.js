"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const classnames_1 = __importDefault(require("classnames"));
const styles_2 = __importDefault(require("./styles"));
exports.FormLabel = ({ children, required, disabled, htmlFor, classes, className, style, inline, as: Component = 'label' }) => {
    const isInline = inline || Component === 'span';
    return (react_1.default.createElement(Component, { htmlFor: htmlFor, className: classnames_1.default(classes.root, {
            [classes.disabled]: disabled,
            [classes.inline]: isInline
        }, className), style: style },
        required && react_1.default.createElement("span", { className: classes.asterisk }, "*"),
        react_1.default.createElement("span", { className: classes.text }, children)));
};
exports.FormLabel.defaultProps = {
    as: 'label',
    inline: false
};
exports.FormLabel.displayName = 'FormLabel';
exports.default = styles_1.withStyles(styles_2.default)(exports.FormLabel);
//# sourceMappingURL=FormLabel.js.map