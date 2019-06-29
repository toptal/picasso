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
const SvgExclamation24 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgExclamation24';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M11.5 22C5.701 22 1 17.299 1 11.5S5.701 1 11.5 1 22 5.701 22 11.5 17.299 22 11.5 22zm0-1a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19zM11 6h1v8h-1V6zm0 10h1v1h-1v-1z', id: 'exclamation24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'exclamation24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#exclamation24_svg__a' })),
            react_1.default.createElement("use", { xlinkHref: '#exclamation24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#exclamation24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
};
SvgExclamation24.displayName = 'SvgExclamation24';
exports.default = styles_1.withStyles(styles_2.default)(SvgExclamation24);
//# sourceMappingURL=Exclamation24.js.map