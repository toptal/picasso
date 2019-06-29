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
const SvgNewCandidate16 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgNewCandidate16';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M13 3V1h1v2h2v1h-2v2h-1V4h-2V3h2zM3.873 9.388a4 4 0 1 1 4.255 0A6.002 6.002 0 0 1 12 15h-1a5 5 0 0 0-10 0H0a6.002 6.002 0 0 1 3.873-5.612zM6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', id: 'newCandidate16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'newCandidate16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#newCandidate16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#newCandidate16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#newCandidate16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
};
SvgNewCandidate16.displayName = 'SvgNewCandidate16';
exports.default = styles_1.withStyles(styles_2.default)(SvgNewCandidate16);
//# sourceMappingURL=NewCandidate16.js.map