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
const SvgNewCandidate24 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgNewCandidate24';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M20 4V1h1v3h3v1h-3v3h-1V5h-3V4h3zM6.235 14.433A7.002 7.002 0 0 1 9 1a7 7 0 0 1 2.765 13.433A9.004 9.004 0 0 1 18 23h-1a8 8 0 1 0-16 0H0c0-4.006 2.617-7.4 6.235-8.567zM9 14A6 6 0 1 0 9 2a6 6 0 0 0 0 12z', id: 'newCandidate24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'newCandidate24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#newCandidate24_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#newCandidate24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#newCandidate24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
};
SvgNewCandidate24.displayName = 'SvgNewCandidate24';
exports.default = styles_1.withStyles(styles_2.default)(SvgNewCandidate24);
//# sourceMappingURL=NewCandidate24.js.map