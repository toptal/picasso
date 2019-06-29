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
const SvgTasks16 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgTasks16';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M3.5 3.793l3-3 .707.707-3 3-.707.707L1.793 3.5l.707-.707 1 1zM3 1v1H1v4h4V5h1v2H0V1h3zM0 9h6v6H0V9zm1 1v4h4v-4H1zm7-7h8v1H8V3zm0 8h8v1H8v-1z', id: 'tasks16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'tasks16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#tasks16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#tasks16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#tasks16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
};
SvgTasks16.displayName = 'SvgTasks16';
exports.default = styles_1.withStyles(styles_2.default)(SvgTasks16);
//# sourceMappingURL=Tasks16.js.map