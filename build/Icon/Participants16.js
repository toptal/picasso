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
const SvgParticipants16 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgParticipants16';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M10.875 10.4a2.5 2.5 0 1 1 3.25 0A3.5 3.5 0 0 1 16 13.5v.5h-1v-.5a2.5 2.5 0 0 0-4.268-1.768l-.707-.707c.252-.252.539-.462.85-.625zm-7.922-.963a4 4 0 1 1 4.095 0A5.001 5.001 0 0 1 10 14H9a4 4 0 1 0-8 0H0a5.001 5.001 0 0 1 2.953-4.563zM5 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.5 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z', id: 'participants16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'participants16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#participants16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#participants16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#participants16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
};
SvgParticipants16.displayName = 'SvgParticipants16';
exports.default = styles_1.withStyles(styles_2.default)(SvgParticipants16);
//# sourceMappingURL=Participants16.js.map