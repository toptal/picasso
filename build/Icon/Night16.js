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
const SvgNight16 = react_1.forwardRef(function SvgNight16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M14 9V8h1v1h1v1h-1v1h-1v-1h-1V9h1zm-2-7V0h1v2h2v1h-2v2h-1V3h-2V2h2zM5.346 6.667c0 3.79 2.96 6.878 6.654 6.996A6.803 6.803 0 0 1 6.874 16C3.077 16 0 12.866 0 9s3.077-7 6.874-7c.073 0 .146.001.22.004a7.047 7.047 0 0 0-1.748 4.663zm-1 0c0-1.19.257-2.34.736-3.383C2.716 4.057 1 6.322 1 9c0 3.318 2.634 6 5.874 6a5.758 5.758 0 0 0 2.84-.747c-3.127-1.065-5.368-4.067-5.368-7.586z', id: 'night16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'night16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#night16_svg__a' })),
            react_1.default.createElement("use", { xlinkHref: '#night16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#night16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgNight16.displayName = 'SvgNight16';
exports.default = styles_1.withStyles(styles_2.default)(SvgNight16);
//# sourceMappingURL=Night16.js.map