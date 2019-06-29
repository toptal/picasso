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
const SvgSkills16 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgSkills16';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M3.5 5.793l.646-.647.708.708L3.5 7.207.793 4.5 4.5.793l2.354 2.353-.708.708L4.5 2.207 2.207 4.5 3.5 5.793zm8 8l2.293-2.293-1.647-1.646.708-.708 2.353 2.354-3.707 3.707L8.793 12.5l1.353-1.354.708.708-.647.646 1.293 1.293zm-2-9.586l-7.5 7.5V14h2.293l7.5-7.5L9.5 4.207zm.707-.707L12.5 5.793 13.793 4.5 11.5 2.207 10.207 3.5zM1 11.293L11.5.793 15.207 4.5 4.707 15H1v-3.707z', id: 'skills16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'skills16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#skills16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#skills16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#skills16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
};
SvgSkills16.displayName = 'SvgSkills16';
exports.default = styles_1.withStyles(styles_2.default)(SvgSkills16);
//# sourceMappingURL=Skills16.js.map