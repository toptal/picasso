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
const SvgSort16 = react_1.forwardRef(function SvgSort16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M5 5v8.292l2.5-2.5.707.708L4.5 15.207l-.707-.707-3-3 .707-.707 2.5 2.5V5h1zM11.5.793L15.207 4.5l-.707.707-2.5-2.5V11h-1V2.707l-2.5 2.5-.707-.707 3-3L11.5.793z', id: 'sort16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'sort16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#sort16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#sort16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#sort16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgSort16.displayName = 'SvgSort16';
exports.default = styles_1.withStyles(styles_2.default)(SvgSort16);
//# sourceMappingURL=Sort16.js.map