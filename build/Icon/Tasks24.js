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
const SvgTasks24 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgTasks24';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M5.5 5.793l5-5 .707.707-5 5-.707.707L2.793 4.5l.707-.707 2 2zM5 1v1H1v7h7V7h1v3H0V1h5zM0 13h9v9H0v-9zm1 1v7h7v-7H1zm11-9h12v1H12V5zm0 12h12v1H12v-1z', id: 'tasks24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'tasks24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#tasks24_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#tasks24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#tasks24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
};
SvgTasks24.displayName = 'SvgTasks24';
exports.default = styles_1.withStyles(styles_2.default)(SvgTasks24);
//# sourceMappingURL=Tasks24.js.map