"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const BASE_SIZE = 16;
const SvgDropdownArrows16 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgDropdownArrows16';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("g", null,
            react_1.default.createElement("path", { d: 'M8.429 2.715l2.117 3.528a.5.5 0 0 1-.43.757H5.884a.5.5 0 0 1-.429-.757l2.117-3.528a.5.5 0 0 1 .858 0zM8.429 13.285l2.117-3.528a.5.5 0 0 0-.43-.757H5.884a.5.5 0 0 0-.429.757l2.117 3.528a.5.5 0 0 0 .858 0z' }))));
};
SvgDropdownArrows16.displayName = 'SvgDropdownArrows16';
exports.default = styles_1.withStyles(styles_2.default)(SvgDropdownArrows16);
//# sourceMappingURL=DropdownArrows16.js.map