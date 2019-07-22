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
const SvgPerformance16 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgPerformance16';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M13 14h2v1H1v-1h2V8h1v6h2V6h1v8h2V4h1v10h2V2h1v12z', id: 'performance16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'performance16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#performance16_svg__a' })),
            react_1.default.createElement("use", { xlinkHref: '#performance16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#performance16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
};
SvgPerformance16.displayName = 'SvgPerformance16';
exports.default = styles_1.withStyles(styles_2.default)(SvgPerformance16);
//# sourceMappingURL=Performance16.js.map