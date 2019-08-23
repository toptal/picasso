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
const SvgMorning16 = react_1.forwardRef(function SvgMorning16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M4.337 12a3.5 3.5 0 1 1 6.326 0H9.5a2.5 2.5 0 1 0-4 0H4.337zM7 3h1v3H7V3zm5.45 1.843l.707.707-2.121 2.122-.708-.708 2.122-2.12zM15 10v1h-3v-1h3zM0 11v-1h3v1H0zm1.843-5.45l.707-.707 2.122 2.121-.708.708-2.12-2.122z', id: 'morning16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'morning16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#morning16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#morning16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#morning16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgMorning16.displayName = 'SvgMorning16';
exports.default = styles_1.withStyles(styles_2.default)(SvgMorning16);
//# sourceMappingURL=Morning16.js.map