"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgHelp = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("path", { d: 'M3.416 13.29A6.973 6.973 0 0 0 8 15a6.973 6.973 0 0 0 4.584-1.71l-1.42-1.419A4.98 4.98 0 0 1 8 13a4.98 4.98 0 0 1-3.164-1.129l-1.42 1.42zm-.707-.706l1.42-1.42A4.98 4.98 0 0 1 3 8c0-1.2.423-2.302 1.129-3.164l-1.42-1.42A6.973 6.973 0 0 0 1 8c0 1.753.644 3.356 1.71 4.584zm10.582 0A6.973 6.973 0 0 0 15 8a6.973 6.973 0 0 0-1.71-4.584l-1.419 1.42A4.98 4.98 0 0 1 13 8a4.98 4.98 0 0 1-1.129 3.164l1.42 1.42zm-.707-9.875A6.973 6.973 0 0 0 8 1a6.973 6.973 0 0 0-4.584 1.71l1.42 1.419A4.98 4.98 0 0 1 8 3c1.2 0 2.302.423 3.164 1.129l1.42-1.42zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm0-4a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' })));
};
SvgHelp.displayName = 'SvgHelp';
exports.default = styles_1.withStyles(styles_2.default)(SvgHelp);
//# sourceMappingURL=Help.js.map