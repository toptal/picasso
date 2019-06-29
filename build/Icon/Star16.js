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
const SvgStar16 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgStar16';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M8 11.5l-4.114 2.163.785-4.581-3.328-3.245 4.6-.669L8 1l2.057 4.168 4.6.669-3.328 3.245.785 4.581L8 11.5zm0-1.13l2.786 1.465-.532-3.103 2.254-2.197-3.115-.453L8 3.26 6.607 6.082l-3.115.453 2.254 2.197-.532 3.103L8 10.37z', id: 'star16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'star16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#star16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#star16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#star16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
};
SvgStar16.displayName = 'SvgStar16';
exports.default = styles_1.withStyles(styles_2.default)(SvgStar16);
//# sourceMappingURL=Star16.js.map