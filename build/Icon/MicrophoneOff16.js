"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const BASE_SIZE = 16;
const SvgMicrophoneOff16 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgMicrophoneOff16';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M5.497 12.624l.79-.79A4.504 4.504 0 0 0 12 7.5h1a5.5 5.5 0 0 1-5 5.478V15h3v1H4v-1h3v-2.022a5.468 5.468 0 0 1-1.503-.354zm-2.406-1.836A5.476 5.476 0 0 1 2 7.5h1c0 .956.298 1.843.807 2.572l-.716.716zm7.862-7.862L10 3.879V3.5a2.5 2.5 0 0 0-5 0v4c0 .401.094.78.262 1.116l-.734.734A3.484 3.484 0 0 1 4 7.5v-4a3.5 3.5 0 0 1 6.953-.574zM11 7.12V7.5a3.5 3.5 0 0 1-3.86 3.482l1.09-1.09a2.506 2.506 0 0 0 1.662-1.663L11 7.121zm-9.5 8.086L.793 14.5 14.5.793l.707.707L1.5 15.207z', id: 'microphoneOff16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'microphoneOff16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#microphoneOff16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#microphoneOff16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#microphoneOff16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
};
SvgMicrophoneOff16.displayName = 'SvgMicrophoneOff16';
exports.default = styles_1.withStyles(styles_2.default)(SvgMicrophoneOff16);
//# sourceMappingURL=MicrophoneOff16.js.map