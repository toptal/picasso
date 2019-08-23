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
const SvgArrowDropUp16 = react_1.forwardRef(function SvgArrowDropUp16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M7.357 5.772c.355-.426.926-.432 1.286 0l3.714 4.456c.355.426.187.772-.352.772h-8.01c-.55 0-.712-.34-.352-.772l3.714-4.456z', id: 'arrowDropUp16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'arrowDropUp16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#arrowDropUp16_svg__a' })),
            react_1.default.createElement("use", { xlinkHref: '#arrowDropUp16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#arrowDropUp16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgArrowDropUp16.displayName = 'SvgArrowDropUp16';
exports.default = styles_1.withStyles(styles_2.default)(SvgArrowDropUp16);
//# sourceMappingURL=ArrowDropUp16.js.map