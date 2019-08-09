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
const SvgArrowDropDown24 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgArrowDropDown24';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M11.372 16.215l-6.744-8.43C4.285 7.355 4.448 7 5 7h13.998c.556 0 .72.351.373.785l-6.744 8.43c-.343.43-.91.434-1.256 0z', id: 'arrowDropDown24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'arrowDropDown24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#arrowDropDown24_svg__a' })),
            react_1.default.createElement("use", { xlinkHref: '#arrowDropDown24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#arrowDropDown24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
};
SvgArrowDropDown24.displayName = 'SvgArrowDropDown24';
exports.default = styles_1.withStyles(styles_2.default)(SvgArrowDropDown24);
//# sourceMappingURL=ArrowDropDown24.js.map