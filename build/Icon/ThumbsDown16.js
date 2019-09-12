"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const BASE_SIZE = 16;
const SvgThumbsDown16 = react_1.forwardRef(function SvgThumbsDown16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M7.003 1c1.664 0 3.33.333 5 1h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2.45L8.41 15.288a1 1 0 0 1-1.185.453l-.722-.241a1.707 1.707 0 0 1-1.116-2.034l.641-2.56-1.761.319A3 3 0 0 1 .778 7.737l.628-3.453A4 4 0 0 1 5.342 1h1.661zM12 9h2.003V3H12L12 9zM7.003 2H5.342A3 3 0 0 0 2.39 4.463l-.628 3.452a2 2 0 0 0 2.326 2.326l3.287-.596-.377 1.503-.641 2.56a.707.707 0 0 0 .462.843l.723.241.008-.015L10.984 9H11V2.693A12.144 12.144 0 0 0 7.003 2z', id: 'thumbsDown16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'thumbsDown16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#thumbsDown16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#thumbsDown16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#thumbsDown16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgThumbsDown16.displayName = 'SvgThumbsDown16';
exports.default = styles_1.withStyles(styles_2.default)(SvgThumbsDown16);
//# sourceMappingURL=ThumbsDown16.js.map