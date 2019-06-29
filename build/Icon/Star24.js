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
const SvgStar24 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgStar24';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M12 18.5l-6.466 3.4 1.235-7.2-5.23-5.1 7.228-1.05L12 2l3.233 6.55 7.229 1.05-5.231 5.1 1.235 7.2L12 18.5zm0-1.13l5.138 2.701-.982-5.72 4.157-4.052-5.744-.835L12 4.26 9.431 9.464l-5.744.835 4.157 4.051-.982 5.721 5.138-2.7z', id: 'star24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'star24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#star24_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#star24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#star24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
};
SvgStar24.displayName = 'SvgStar24';
exports.default = styles_1.withStyles(styles_2.default)(SvgStar24);
//# sourceMappingURL=Star24.js.map