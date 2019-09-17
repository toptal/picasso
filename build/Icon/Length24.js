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
const SvgLength24 = react_1.forwardRef(function SvgLength24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M1 2v20H0V2h1zm23 0v20h-1V2h1zm-7.5 4.29l5 5 .707.707-.707.707-5 5-.707-.707 4.999-5-5-5 .708-.707zm-9 0l.707.707-5 5 5 5-.707.707-5.707-5.707.707-.707 5-5z', id: 'length24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'length24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#length24_svg__a' })),
            react_1.default.createElement("use", { xlinkHref: '#length24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#length24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgLength24.displayName = 'SvgLength24';
exports.default = styles_1.withStyles(styles_2.default)(SvgLength24);
//# sourceMappingURL=Length24.js.map