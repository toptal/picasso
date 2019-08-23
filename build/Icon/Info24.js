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
const SvgInfo24 = react_1.forwardRef(function SvgInfo24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M11.5 22C5.701 22 1 17.299 1 11.5S5.701 1 11.5 1 22 5.701 22 11.5 17.299 22 11.5 22zm0-1a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19zM11 9h1v8h-1V9zm0-3h1v1h-1V6z', id: 'info24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'info24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#info24_svg__a' })),
            react_1.default.createElement("use", { xlinkHref: '#info24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#info24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgInfo24.displayName = 'SvgInfo24';
exports.default = styles_1.withStyles(styles_2.default)(SvgInfo24);
//# sourceMappingURL=Info24.js.map