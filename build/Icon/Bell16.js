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
const SvgBell16 = react_1.forwardRef(function SvgBell16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M7 1.022V0h1v1.022A5.5 5.5 0 0 1 13 6.5v3.505c0 .72.276.995 1 .995v1H1v-1c.724 0 1-.275 1-.995V6.5a5.5 5.5 0 0 1 5-5.478zM5 13.5V13h1v.5a1.5 1.5 0 0 0 3 0V13h1v.5a2.5 2.5 0 1 1-5 0zm7-3.495V6.5a4.5 4.5 0 1 0-9 0v3.505c0 .383-.066.716-.192.995h9.384a2.397 2.397 0 0 1-.192-.995z', id: 'bell16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'bell16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#bell16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#bell16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#bell16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgBell16.displayName = 'SvgBell16';
exports.default = styles_1.withStyles(styles_2.default)(SvgBell16);
//# sourceMappingURL=Bell16.js.map