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
const SvgMorning24 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgMorning24';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M6.207 18a5.5 5.5 0 1 1 10.586 0h-1.05a4.5 4.5 0 1 0-8.488 0H6.208zM11 5h1v4h-1V5zm8.278 3.015l.707.707-2.828 2.828-.707-.707 2.828-2.828zM23 16v1h-4v-1h4zM0 17v-1h4v1H0zm3.015-8.278l.707-.707 2.828 2.828-.707.707-2.828-2.828z', id: 'morning24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'morning24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#morning24_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#morning24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#morning24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
};
SvgMorning24.displayName = 'SvgMorning24';
exports.default = styles_1.withStyles(styles_2.default)(SvgMorning24);
//# sourceMappingURL=Morning24.js.map