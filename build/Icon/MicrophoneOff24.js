"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const BASE_SIZE = 24;
const SvgMicrophoneOff24 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgMicrophoneOff24';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M7.364 18.757l.724-.724A6.5 6.5 0 0 0 18 12.5h1a7.5 7.5 0 0 1-7 7.484V23h5v1H6v-1h5v-3.016a7.458 7.458 0 0 1-3.636-1.227zm-2.121-2.12A7.465 7.465 0 0 1 4 12.5h1c0 1.251.354 2.42.967 3.412l-.724.724zM16 5.878l-1 1V4.5a3.5 3.5 0 0 0-7 0v8c0 .413.071.809.203 1.176l-.764.764A4.482 4.482 0 0 1 7 12.5v-8a4.5 4.5 0 0 1 9 0v1.379zm0 4.242V12.5a4.5 4.5 0 0 1-6.44 4.061l.764-.764A3.5 3.5 0 0 0 15 12.5v-1.379l1-1zM2.5 22.207l-.707-.707L21.5 1.793l.707.707L2.5 22.207z', id: 'microphoneOff24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'microphoneOff24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#microphoneOff24_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#microphoneOff24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#microphoneOff24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
};
SvgMicrophoneOff24.displayName = 'SvgMicrophoneOff24';
exports.default = styles_1.withStyles(styles_2.default)(SvgMicrophoneOff24);
//# sourceMappingURL=MicrophoneOff24.js.map