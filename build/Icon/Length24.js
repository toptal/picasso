"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const BASE_SIZE = 24;
const SvgLength24 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgLength24';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M3.207 12.5l5 5-.707.707-5-5-.707-.707L7.5 6.793l.707.707-5 5zm18.293-.707l.707.707-5.707 5.707-.707-.707 5-5-5-5 .707-.707 5 5zM0 3h1v19H0V3zm23 0h1v19h-1V3z', id: 'length24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'length24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#length24_svg__a' })),
            react_1.default.createElement("use", { xlinkHref: '#length24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#length24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
};
SvgLength24.displayName = 'SvgLength24';
exports.default = styles_1.withStyles(styles_2.default)(SvgLength24);
//# sourceMappingURL=Length24.js.map