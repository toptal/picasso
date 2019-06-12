"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgCerificate = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("g", { fillRule: 'nonzero' },
            react_1.default.createElement("path", { d: 'M4.25 19.25v-16h12V5a.25.25 0 1 0 .5 0V2.75h-13v17H12a.25.25 0 1 0 0-.5H4.25z' }),
            react_1.default.createElement("path", { d: 'M16.5 15.75a4.25 4.25 0 1 0 0-8.5 4.25 4.25 0 0 0 0 8.5zm0-.5a3.75 3.75 0 1 1 0-7.5 3.75 3.75 0 0 1 0 7.5z' }),
            react_1.default.createElement("path", { d: 'M18.379 19.719a.25.25 0 0 0 .371-.219V15a.25.25 0 1 0-.5 0v4.075l-1.629-.905a.25.25 0 0 0-.242 0l-1.629.905V15a.25.25 0 1 0-.5 0v4.5c0 .19.205.311.371.219l1.879-1.044 1.879 1.044z' }))));
};
SvgCerificate.displayName = 'SvgCerificate';
exports.default = styles_1.withStyles(styles_2.default)(SvgCerificate);
//# sourceMappingURL=Cerificate.js.map