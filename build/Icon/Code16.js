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
const SvgCode16 = react_1.forwardRef(function SvgCode16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M1.63 8l3.074 4.103-.8.6L.38 8l3.525-4.7.8.6L1.63 8zm9.674 4.103L14.38 8l-3.075-4.1.8-.6L15.63 8l-3.524 4.702-.8-.6zM6.874 15.1l-.974-.225L9.125.9l.975.225L6.875 15.1z', id: 'code16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'code16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#code16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#code16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#code16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgCode16.displayName = 'SvgCode16';
exports.default = styles_1.withStyles(styles_2.default)(SvgCode16);
//# sourceMappingURL=Code16.js.map