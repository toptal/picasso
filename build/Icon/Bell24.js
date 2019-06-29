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
const SvgBell24 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgBell24';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M12 2.014a8.5 8.5 0 0 1 8 8.486V18a1 1 0 0 0 1 1v1H2v-1a1 1 0 0 0 1-1v-7.5a8.5 8.5 0 0 1 8-8.486V0h1v2.014zM19 18v-7.5a7.5 7.5 0 0 0-15 0V18c0 .364-.097.706-.268 1h15.536A1.99 1.99 0 0 1 19 18zM9 21.5V21h1v.5a1.5 1.5 0 0 0 3 0V21h1v.5a2.5 2.5 0 1 1-5 0z', id: 'bell24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'bell24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#bell24_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#bell24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#bell24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
};
SvgBell24.displayName = 'SvgBell24';
exports.default = styles_1.withStyles(styles_2.default)(SvgBell24);
//# sourceMappingURL=Bell24.js.map