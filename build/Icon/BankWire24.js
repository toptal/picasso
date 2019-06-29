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
const SvgBankWire24 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgBankWire24';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 32 32', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M2 26h28v4H2v-4zm1 1v2h26v-2H3zM2 8l14-6 14 6v3H2V8zm1 .66V10h26V8.66L16 3.087 3 8.659zM4 12h6v13H4V12zm1 1v11h4V13H5zm8-1h6v13h-6V12zm1 1v11h4V13h-4zm8-1h6v13h-6V12zm1 1v11h4V13h-4z', id: 'bankWire24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'bankWire24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#bankWire24_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#bankWire24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#bankWire24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h32v32H0z' })))));
};
SvgBankWire24.displayName = 'SvgBankWire24';
exports.default = styles_1.withStyles(styles_2.default)(SvgBankWire24);
//# sourceMappingURL=BankWire24.js.map