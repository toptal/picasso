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
const SvgLinkedin16 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgLinkedin16';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M13.631 13.635h-2.369V9.922c0-.885-.018-2.025-1.235-2.025-1.235 0-1.424.964-1.424 1.96v3.778H6.234V6H8.51v1.04h.03c.319-.6 1.092-1.233 2.247-1.233 2.401 0 2.845 1.58 2.845 3.637v4.19zM3.558 4.955A1.375 1.375 0 0 1 2.183 3.58a1.376 1.376 0 1 1 1.375 1.377zm1.188 8.68H2.37V6h2.376v7.635zM14.816 0H1.182C.528 0 0 .516 0 1.153v13.694C0 15.485.528 16 1.18 16h13.635c.652 0 1.185-.515 1.185-1.153V1.153C16 .516 15.467 0 14.815 0h.002z', id: 'linkedin16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'linkedin16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#linkedin16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#linkedin16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#linkedin16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
};
SvgLinkedin16.displayName = 'SvgLinkedin16';
exports.default = styles_1.withStyles(styles_2.default)(SvgLinkedin16);
//# sourceMappingURL=Linkedin16.js.map