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
const SvgLength16 = react_1.forwardRef(function SvgLength16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M1 1v14H0V1h1zm15 0v14h-1V1h1zm-5.5 3.29l3 3 .707.707-3.707 3.707-.707-.707 2.999-3-3-3 .708-.707zm-5 0l.707.707-3 3 3 3-.707.707-3.707-3.707.707-.707 3-3z', id: 'length16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'length16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#length16_svg__a' })),
            react_1.default.createElement("use", { xlinkHref: '#length16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#length16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgLength16.displayName = 'SvgLength16';
exports.default = styles_1.withStyles(styles_2.default)(SvgLength16);
//# sourceMappingURL=Length16.js.map