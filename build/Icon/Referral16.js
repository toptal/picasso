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
const SvgReferral16 = (props) => {
    const { classes, className, style = {}, color, scale, size } = props;
    if (size) {
        window.console.warn(`'size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = `${BASE_SIZE * Math.ceil(scale || 1)}px`;
    const svgStyle = Object.assign({ minWidth: scaledSize, minHeight: scaledSize }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M14.5 6.793l.707.707L8.5 14.207l-.707-.707 6-6-6-6L8.5.793l6 6zm-7 0l.707.707L1.5 14.207.793 13.5l6-6-6-6L1.5.793l6 6z', id: 'referral16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'referral16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#referral16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#referral16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#referral16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
};
SvgReferral16.displayName = 'SvgReferral16';
exports.default = styles_1.withStyles(styles_2.default)(SvgReferral16);
//# sourceMappingURL=Referral16.js.map