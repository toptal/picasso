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
const SvgAfternoon16 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgAfternoon16';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M7.5 11a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0-1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM7 0h1v3H7V0zm5.45 1.843l.707.707-2.121 2.122-.708-.708 2.122-2.12zM15 7v1h-3V7h3zm-1.843 5.45l-.707.707-2.122-2.121.708-.708 2.12 2.122zM8 15H7v-3h1v3zm-5.45-1.843l-.707-.707 2.121-2.122.708.708-2.122 2.12zM0 8V7h3v1H0zm1.843-5.45l.707-.707 2.122 2.121-.708.708-2.12-2.122z', id: 'afternoon16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'afternoon16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#afternoon16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#afternoon16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#afternoon16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
};
SvgAfternoon16.displayName = 'SvgAfternoon16';
exports.default = styles_1.withStyles(styles_2.default)(SvgAfternoon16);
//# sourceMappingURL=Afternoon16.js.map