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
const SvgFilter16 = react_1.forwardRef(function SvgFilter16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M12 3v1h-1V1h1v1h4v1h-4zM0 2h9v1H0V2zm9 11v1H8v-3h1v1h7v1H9zm-9-1h6v1H0v-1zm4-4H0V7h4V6h1v3H4V8zm12-1v1H7V7h9z', id: 'filter16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'filter16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#filter16_svg__a' })),
            react_1.default.createElement("use", { xlinkHref: '#filter16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#filter16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgFilter16.displayName = 'SvgFilter16';
exports.default = styles_1.withStyles(styles_2.default)(SvgFilter16);
//# sourceMappingURL=Filter16.js.map