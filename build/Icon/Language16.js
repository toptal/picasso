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
const SvgLanguage16 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgLanguage16';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M6 12l-4 4v-4H0V0h16v12H6zm-3 1.586L5.586 11H15V1H1v10h2v2.586zM11.039 9H9.842l-.441-1.152H6.647L6.206 9H5.009l2.358-6.003h1.314L11.039 9zM9.104 6.921l-1.08-2.862-1.08 2.862h2.16z', id: 'language16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'language16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#language16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#language16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#language16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
};
SvgLanguage16.displayName = 'SvgLanguage16';
exports.default = styles_1.withStyles(styles_2.default)(SvgLanguage16);
//# sourceMappingURL=Language16.js.map