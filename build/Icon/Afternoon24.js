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
const SvgAfternoon24 = react_1.forwardRef(function SvgAfternoon24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M11.5 17a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0-1a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM11 0h1v4h-1V0zm8.278 3.015l.707.707-2.828 2.828-.707-.707 2.828-2.828zM23 11v1h-4v-1h4zm-3.015 8.278l-.707.707-2.828-2.828.707-.707 2.828 2.828zM12 23h-1v-4h1v4zm-8.278-3.015l-.707-.707 2.828-2.828.707.707-2.828 2.828zM0 12v-1h4v1H0zm3.015-8.278l.707-.707L6.55 5.843l-.707.707-2.828-2.828z', id: 'afternoon24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'afternoon24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#afternoon24_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#afternoon24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#afternoon24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgAfternoon24.displayName = 'SvgAfternoon24';
exports.default = styles_1.withStyles(styles_2.default)(SvgAfternoon24);
//# sourceMappingURL=Afternoon24.js.map