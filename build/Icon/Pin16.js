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
const SvgPin16 = react_1.forwardRef(function SvgPin16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M8 16C4 11.542 2 8.21 2 6a6 6 0 1 1 12 0c0 2.21-2 5.542-6 10zM3 6c0 1.754 1.657 4.633 5 8.489 3.343-3.856 5-6.735 5-8.489A5 5 0 0 0 3 6zm5 2a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM7 6a1 1 0 1 0 2 0 1 1 0 0 0-2 0z', id: 'pin16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'pin16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#pin16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#pin16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#pin16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgPin16.displayName = 'SvgPin16';
exports.default = styles_1.withStyles(styles_2.default)(SvgPin16);
//# sourceMappingURL=Pin16.js.map