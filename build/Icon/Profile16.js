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
const SvgProfile16 = react_1.forwardRef(function SvgProfile16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M5.639 9.408a5 5 0 1 1 4.723 0A7.003 7.003 0 0 1 15 16h-1a6 6 0 1 0-12 0H1a7.003 7.003 0 0 1 4.639-6.592zM8 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', id: 'profile16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'profile16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#profile16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#profile16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#profile16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgProfile16.displayName = 'SvgProfile16';
exports.default = styles_1.withStyles(styles_2.default)(SvgProfile16);
//# sourceMappingURL=Profile16.js.map