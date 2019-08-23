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
const SvgJobChange16 = react_1.forwardRef(function SvgJobChange16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M6 7v1H1v3h5v1H0V3h4V1h4v2h4v2h-1V4H1v3h5zM5 3h2V2H5v1zm6.5 7.793l2-2 .707.707-2 2-.707.707L9.793 10.5l.707-.707 1 1zm0 4.207a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z', id: 'jobChange16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'jobChange16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#jobChange16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#jobChange16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#jobChange16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgJobChange16.displayName = 'SvgJobChange16';
exports.default = styles_1.withStyles(styles_2.default)(SvgJobChange16);
//# sourceMappingURL=JobChange16.js.map