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
const SvgAch16 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgAch16';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M12 7V6h2.5A1.5 1.5 0 0 1 16 7.5v6a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-6A1.5 1.5 0 0 1 1.5 6H3v1H1.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 0-.5-.5H12zm-3 3h5v1H9v-1zm-2 2h7v1H7v-1zm1.5-7.793L3 9.707V11h1.293l5.5-5.5L8.5 4.207zm.707-.707L10.5 4.793 11.793 3.5 10.5 2.207 9.207 3.5zM2 9.293l8.5-8.5L13.207 3.5l-8.5 8.5H2V9.293z', id: 'ach16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'ach16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#ach16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#ach16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#ach16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
};
SvgAch16.displayName = 'SvgAch16';
exports.default = styles_1.withStyles(styles_2.default)(SvgAch16);
//# sourceMappingURL=Ach16.js.map