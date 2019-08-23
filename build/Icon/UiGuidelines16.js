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
const SvgUiGuidelines16 = react_1.forwardRef(function SvgUiGuidelines16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M15 2h-5v12h5V2zm1 0v13H9V1h7v1zM0 3h7v1H0V3zm0 3h7v1H0V6zm0 3h7v1H0V9zm0 3h7v1H0v-1z', id: 'uiGuidelines16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'uiGuidelines16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#uiGuidelines16_svg__a' })),
            react_1.default.createElement("use", { xlinkHref: '#uiGuidelines16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#uiGuidelines16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgUiGuidelines16.displayName = 'SvgUiGuidelines16';
exports.default = styles_1.withStyles(styles_2.default)(SvgUiGuidelines16);
//# sourceMappingURL=UiGuidelines16.js.map