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
const SvgMorning24 = react_1.forwardRef(function SvgMorning24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M6.207 18a5.5 5.5 0 1 1 10.586 0h-1.05a4.5 4.5 0 1 0-8.488 0H6.208zM11 5h1v4h-1V5zm8.278 3.015l.707.707-2.828 2.828-.707-.707 2.828-2.828zM23 16v1h-4v-1h4zM0 17v-1h4v1H0zm3.015-8.278l.707-.707 2.828 2.828-.707.707-2.828-2.828z', id: 'morning24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'morning24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#morning24_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#morning24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#morning24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgMorning24.displayName = 'SvgMorning24';
exports.default = styles_1.withStyles(styles_2.default)(SvgMorning24);
//# sourceMappingURL=Morning24.js.map