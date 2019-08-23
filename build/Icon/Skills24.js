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
const SvgSkills24 = react_1.forwardRef(function SvgSkills24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M14.5 5.207L2 17.707V22h4.293l12.5-12.5L14.5 5.207zm.707-.707L19.5 8.793 21.793 6.5 17.5 2.207 15.207 4.5zM3.5 7.793l2-2 .707.707-2 2L5.5 9.793l.646-.647.708.708L5.5 11.207.793 6.5 6.5.793l4.354 4.353-.708.708L6.5 2.207 2.207 6.5 3.5 7.793zm12 12l2-2 .707.707-2 2 1.293 1.293 4.293-4.293-3.647-3.646.708-.708 4.353 4.354-5.707 5.707-4.707-4.707 1.353-1.354.708.708-.647.646 1.293 1.293zM1 17.293L17.5.793 23.207 6.5 6.707 23H1v-5.707z', id: 'skills24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'skills24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#skills24_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#skills24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#skills24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgSkills24.displayName = 'SvgSkills24';
exports.default = styles_1.withStyles(styles_2.default)(SvgSkills24);
//# sourceMappingURL=Skills24.js.map