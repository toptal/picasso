"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgSearch = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("path", { d: 'M10.582 9.874l4.625 4.626-.707.707-4.626-4.625a6 6 0 1 1 .707-.707zM6 11A5 5 0 1 0 6 1a5 5 0 0 0 0 10z' })));
};
SvgSearch.displayName = 'SvgSearch';
exports.default = styles_1.withStyles(styles_2.default)(SvgSearch);
//# sourceMappingURL=Search.js.map