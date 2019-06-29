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
const SvgUploadDocument16 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgUploadDocument16';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M1 15h7v1H0V0h13v8h-1V1H1v14zm12-3.293V16h-1v-4.293l-1.5 1.5-.707-.707L12.5 9.793l.707.707 2 2-.707.707-1.5-1.5zM3 4h7v1H3V4zm0 2h7v1H3V6zm0 2h3v1H3V8z', id: 'uploadDocument16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'uploadDocument16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#uploadDocument16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#uploadDocument16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#uploadDocument16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
};
SvgUploadDocument16.displayName = 'SvgUploadDocument16';
exports.default = styles_1.withStyles(styles_2.default)(SvgUploadDocument16);
//# sourceMappingURL=UploadDocument16.js.map