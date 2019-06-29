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
const SvgGlobe16 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgGlobe16';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M1.019 8a6.505 6.505 0 0 0 4.508 5.695C4.665 12.432 4.08 10.366 4.007 8H1.02zm0-1h2.989c.072-2.366.657-4.432 1.519-5.695A6.505 6.505 0 0 0 1.019 7zM13.98 7a6.505 6.505 0 0 0-4.508-5.695c.862 1.263 1.447 3.329 1.52 5.695h2.988zm0 1h-2.989c-.072 2.366-.657 4.432-1.519 5.695A6.505 6.505 0 0 0 13.981 8zM5.008 8c.114 3.412 1.373 6 2.492 6s2.378-2.588 2.492-6H5.008zm0-1h4.984C9.878 3.588 8.619 1 7.5 1S5.122 3.588 5.008 7zM7.5 15a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z', id: 'globe16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'globe16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#globe16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#globe16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#globe16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
};
SvgGlobe16.displayName = 'SvgGlobe16';
exports.default = styles_1.withStyles(styles_2.default)(SvgGlobe16);
//# sourceMappingURL=Globe16.js.map