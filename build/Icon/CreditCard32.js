"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const BASE_SIZE = 32;
const SvgCreditCard32 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgCreditCard32';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 32 32', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M31 10V7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v3h30zm0 1H1v14a1 1 0 0 0 1 1h28a1 1 0 0 0 1-1V11zM2 5h28a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm2 11h10v1H4v-1zm0 4h5v1H4v-1zm19-4h5v1h-5v-1z', id: 'creditCard32_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'creditCard32_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#creditCard32_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#creditCard32_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#creditCard32_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h32v32H0z' })))));
};
SvgCreditCard32.displayName = 'SvgCreditCard32';
exports.default = styles_1.withStyles(styles_2.default)(SvgCreditCard32);
//# sourceMappingURL=CreditCard32.js.map