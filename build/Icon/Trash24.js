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
const SvgTrash24 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgTrash24';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M9 3V0h6v3h8v1H1V3h8zm1 0h4V1h-4v2zm10 20V5h1v19H3V5h1v18h16zM9 10h1v8H9v-8zm5 0h1v8h-1v-8z', id: 'trash24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'trash24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#trash24_svg__a' })),
            react_1.default.createElement("use", { xlinkHref: '#trash24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#trash24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
};
SvgTrash24.displayName = 'SvgTrash24';
exports.default = styles_1.withStyles(styles_2.default)(SvgTrash24);
//# sourceMappingURL=Trash24.js.map