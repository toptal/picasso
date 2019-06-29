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
const SvgVideoOff16 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgVideoOff16';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M12.869 5.252L16 4v8l-4-1.6V13H5.121l1-1H11V7.121l1.869-1.869zM.879 13H0V3h10.879l-1 1H1v8h.879l-1 1zM12 6.677v2.646l3 1.2V5.477l-3 1.2zm-10.5 8.53L.793 14.5 14.5.793l.707.707L1.5 15.207z', id: 'videoOff16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'videoOff16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#videoOff16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#videoOff16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#videoOff16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
};
SvgVideoOff16.displayName = 'SvgVideoOff16';
exports.default = styles_1.withStyles(styles_2.default)(SvgVideoOff16);
//# sourceMappingURL=VideoOff16.js.map