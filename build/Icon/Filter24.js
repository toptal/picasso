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
const SvgFilter24 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgFilter24';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M17 6v2h-1V3h1v2h7v1h-7zM0 5h14v1H0V5zm13 13v2h-1v-5h1v2h11v1H13zM0 17h10v1H0v-1zm7-5H0v-1h7V9h1v5H7v-2zm17-1v1H10v-1h14z', id: 'filter24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'filter24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#filter24_svg__a' })),
            react_1.default.createElement("use", { xlinkHref: '#filter24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#filter24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
};
SvgFilter24.displayName = 'SvgFilter24';
exports.default = styles_1.withStyles(styles_2.default)(SvgFilter24);
//# sourceMappingURL=Filter24.js.map