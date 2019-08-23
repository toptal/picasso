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
const SvgFacebook16 = react_1.forwardRef(function SvgFacebook16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M15.117 0H.883A.883.883 0 0 0 0 .883v14.234c0 .488.395.883.883.883h7.662V9.804H6.46V7.39h2.086V5.607c0-2.066 1.263-3.19 3.106-3.19.884 0 1.643.064 1.864.094v2.16h-1.28c-1 0-1.195.48-1.195 1.18v1.541h2.39l-.31 2.42h-2.08V16h4.077a.882.882 0 0 0 .883-.883V.883A.882.882 0 0 0 15.117 0', id: 'facebook16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'facebook16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#facebook16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#facebook16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#facebook16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgFacebook16.displayName = 'SvgFacebook16';
exports.default = styles_1.withStyles(styles_2.default)(SvgFacebook16);
//# sourceMappingURL=Facebook16.js.map