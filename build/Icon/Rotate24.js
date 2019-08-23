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
const SvgRotate24 = react_1.forwardRef(function SvgRotate24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M2.707 5H23v7h-1V6H2.707l3.5 3.5-.707.707-4-4L.793 5.5 5.5.793l.707.707-3.5 3.5zm18.586 14H1v-7h1v6h19.293l-3.5-3.5.707-.707 4 4 .707.707-4.707 4.707-.707-.707 3.5-3.5z', id: 'rotate24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'rotate24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#rotate24_svg__a' })),
            react_1.default.createElement("use", { xlinkHref: '#rotate24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#rotate24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgRotate24.displayName = 'SvgRotate24';
exports.default = styles_1.withStyles(styles_2.default)(SvgRotate24);
//# sourceMappingURL=Rotate24.js.map