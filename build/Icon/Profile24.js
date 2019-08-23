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
const BASE_SIZE = 24;
const SvgProfile24 = react_1.forwardRef(function SvgProfile24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M9.235 14.433A7.002 7.002 0 0 1 12 1a7 7 0 0 1 2.765 13.433A9.004 9.004 0 0 1 21 23h-1a8 8 0 1 0-16 0H3c0-4.006 2.617-7.4 6.235-8.567zM12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12z', id: 'profile24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'profile24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#profile24_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#profile24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#profile24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgProfile24.displayName = 'SvgProfile24';
exports.default = styles_1.withStyles(styles_2.default)(SvgProfile24);
//# sourceMappingURL=Profile24.js.map