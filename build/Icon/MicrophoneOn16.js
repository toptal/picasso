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
const SvgMicrophoneOn16 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgMicrophoneOn16';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M7 15v-2.022A5.5 5.5 0 0 1 2 7.5h1a4.5 4.5 0 0 0 9 0h1a5.5 5.5 0 0 1-5 5.478V15h3v1H4v-1h3zm.5-15A3.5 3.5 0 0 1 11 3.5v4a3.5 3.5 0 0 1-7 0v-4A3.5 3.5 0 0 1 7.5 0zm0 1A2.5 2.5 0 0 0 5 3.5v4a2.5 2.5 0 0 0 5 0v-4A2.5 2.5 0 0 0 7.5 1z', id: 'microphoneOn16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'microphoneOn16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#microphoneOn16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#microphoneOn16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#microphoneOn16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
};
SvgMicrophoneOn16.displayName = 'SvgMicrophoneOn16';
exports.default = styles_1.withStyles(styles_2.default)(SvgMicrophoneOn16);
//# sourceMappingURL=MicrophoneOn16.js.map