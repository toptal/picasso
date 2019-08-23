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
const SvgMicrophoneOn24 = react_1.forwardRef(function SvgMicrophoneOn24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M11 23v-3.016A7.5 7.5 0 0 1 4 12.5h1a6.5 6.5 0 1 0 13 0h1a7.5 7.5 0 0 1-7 7.484V23h5v1H6v-1h5zm.5-23A4.5 4.5 0 0 1 16 4.5v8a4.5 4.5 0 1 1-9 0v-8A4.5 4.5 0 0 1 11.5 0zm0 1A3.5 3.5 0 0 0 8 4.5v8a3.5 3.5 0 0 0 7 0v-8A3.5 3.5 0 0 0 11.5 1z', id: 'microphoneOn24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'microphoneOn24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#microphoneOn24_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#microphoneOn24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#microphoneOn24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgMicrophoneOn24.displayName = 'SvgMicrophoneOn24';
exports.default = styles_1.withStyles(styles_2.default)(SvgMicrophoneOn24);
//# sourceMappingURL=MicrophoneOn24.js.map