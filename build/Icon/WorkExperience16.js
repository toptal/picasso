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
const SvgWorkExperience16 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgWorkExperience16';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M4 6v1H1v3h3v1H0V2h4V0h4v2h4v3h-1V3H1v3h3zm1-4h2V1H5v1zm2 13h7v1H7v-1zM5 6h11v8H5V6zm1 1v6h9V7H6z', id: 'workExperience16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'workExperience16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#workExperience16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#workExperience16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#workExperience16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
};
SvgWorkExperience16.displayName = 'SvgWorkExperience16';
exports.default = styles_1.withStyles(styles_2.default)(SvgWorkExperience16);
//# sourceMappingURL=WorkExperience16.js.map