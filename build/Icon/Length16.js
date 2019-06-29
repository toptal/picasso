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
const SvgLength16 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgLength16';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M3.207 8.5l3 3-.707.707-3-3-.707-.707L5.5 4.793l.707.707-3 3zM13.5 7.793l.707.707-3.707 3.707-.707-.707 3-3-3-3 .707-.707 3 3zM0 2h1v13H0V2zm15 0h1v13h-1V2z', id: 'length16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'length16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#length16_svg__a' })),
            react_1.default.createElement("use", { xlinkHref: '#length16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#length16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
};
SvgLength16.displayName = 'SvgLength16';
exports.default = styles_1.withStyles(styles_2.default)(SvgLength16);
//# sourceMappingURL=Length16.js.map