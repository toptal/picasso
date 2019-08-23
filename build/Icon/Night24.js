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
const SvgNight24 = react_1.forwardRef(function SvgNight24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M20 13v-1h1v1h1v1h-1v1h-1v-1h-1v-1h1zm-2-7V4h1v2h2v1h-2v2h-1V7h-2V6h2zM9 9a9 9 0 0 0 8.712 8.995 9 9 0 1 1-6.425-14.991A8.966 8.966 0 0 0 9 9zm-6 3a8 8 0 0 0 12.426 6.666C11.143 17.529 8 13.624 8 9c0-1.709.43-3.352 1.227-4.803A8.003 8.003 0 0 0 3 12z', id: 'night24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'night24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#night24_svg__a' })),
            react_1.default.createElement("use", { xlinkHref: '#night24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#night24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgNight24.displayName = 'SvgNight24';
exports.default = styles_1.withStyles(styles_2.default)(SvgNight24);
//# sourceMappingURL=Night24.js.map