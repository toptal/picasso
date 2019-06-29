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
const SvgUploadDocument24 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgUploadDocument24';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M19 13h-1V2H2v20h11v1H1V1h18v12zM4 7h12v1H4V7zm0 3h12v1H4v-1zm0 3h5v1H4v-1zm15 3.707V23h-1v-6.293l-2.5 2.5-.707-.707 3.707-3.707.707.707 3 3-.707.707-2.5-2.5z', id: 'uploadDocument24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'uploadDocument24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#uploadDocument24_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#uploadDocument24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#uploadDocument24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
};
SvgUploadDocument24.displayName = 'SvgUploadDocument24';
exports.default = styles_1.withStyles(styles_2.default)(SvgUploadDocument24);
//# sourceMappingURL=UploadDocument24.js.map