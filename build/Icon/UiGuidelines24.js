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
const SvgUiGuidelines24 = react_1.forwardRef(function SvgUiGuidelines24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M23 2h-9v20h9V2zm1 0v21H13V1h11v1zM0 4h10v1H0V4zm0 5h10v1H0V9zm0 5h10v1H0v-1zm0 5h10v1H0v-1z', id: 'uiGuidelines24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'uiGuidelines24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#uiGuidelines24_svg__a' })),
            react_1.default.createElement("use", { xlinkHref: '#uiGuidelines24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#uiGuidelines24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgUiGuidelines24.displayName = 'SvgUiGuidelines24';
exports.default = styles_1.withStyles(styles_2.default)(SvgUiGuidelines24);
//# sourceMappingURL=UiGuidelines24.js.map