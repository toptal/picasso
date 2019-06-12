"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgDropdownArrows = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("g", null,
            react_1.default.createElement("path", { d: 'M8.429 2.715l2.117 3.528a.5.5 0 0 1-.43.757H5.884a.5.5 0 0 1-.429-.757l2.117-3.528a.5.5 0 0 1 .858 0zM8.429 13.285l2.117-3.528a.5.5 0 0 0-.43-.757H5.884a.5.5 0 0 0-.429.757l2.117 3.528a.5.5 0 0 0 .858 0z' }))));
};
SvgDropdownArrows.displayName = 'SvgDropdownArrows';
exports.default = styles_1.withStyles(styles_2.default)(SvgDropdownArrows);
//# sourceMappingURL=DropdownArrows.js.map