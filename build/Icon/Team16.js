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
const SvgTeam16 = react_1.forwardRef(function SvgTeam16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M2.691 10L5 5.382V0h6v5.38L13.31 10H16v6h-6v-3H6v3H0v-6h2.691zm1.118 0H6v2h4v-2h2.191l-2-4H5.81l-2 4zM5 13v-2H1v4h4v-2zm6-1v3h4v-4h-4v1zM6 5h4V1H6v4z', id: 'team16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'team16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#team16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#team16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#team16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgTeam16.displayName = 'SvgTeam16';
exports.default = styles_1.withStyles(styles_2.default)(SvgTeam16);
//# sourceMappingURL=Team16.js.map