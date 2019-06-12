"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgInstagram = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("path", { d: 'M14.02 11.64a2.95 2.94 0 0 1-2.88 3.01h-6.9a2.95 2.94 0 0 1-2.87-3.01v-7.2a2.95 2.94 0 0 1 2.88-3.02h6.89a2.95 2.94 0 0 1 2.88 3.01v7.2zM11.14 0h-6.9A4.36 4.34 0 0 0 0 4.44v7.2c0 2.45 1.9 4.44 4.25 4.44h6.89a4.35 4.35 0 0 0 4.24-4.44v-7.2c0-2.45-1.9-4.44-4.24-4.44z' }),
            react_1.default.createElement("path", { d: 'M7.7 11.43a3.03 3.02 0 0 1-3.03-3A3.03 3.02 0 0 1 7.69 5.4a3.03 3.02 0 0 1 3.03 3.02 3.03 3.02 0 0 1-3.03 3.01m0-7.6a4.62 4.6 0 0 0-4.61 4.6A4.62 4.6 0 0 0 7.69 13a4.62 4.6 0 0 0 4.62-4.59 4.62 4.6 0 0 0-4.62-4.6m3.46-1.52a1.15 1.15 0 1 0 1.16 1.15 1.15 1.15 0 0 0-1.16-1.15' }))));
};
SvgInstagram.displayName = 'SvgInstagram';
exports.default = styles_1.withStyles(styles_2.default)(SvgInstagram);
//# sourceMappingURL=Instagram.js.map