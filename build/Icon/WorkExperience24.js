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
const SvgWorkExperience24 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgWorkExperience24';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M7 10v1H1v4h6v1H0V5h6V3h4v2h6v3h-1V6H1v4h6zm0-5h2V4H7v1zm1 4h16v10H8V9zm1 1v8h14v-8H9zm1 10h12v1H10v-1z', id: 'workExperience24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'workExperience24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#workExperience24_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#workExperience24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#workExperience24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
};
SvgWorkExperience24.displayName = 'SvgWorkExperience24';
exports.default = styles_1.withStyles(styles_2.default)(SvgWorkExperience24);
//# sourceMappingURL=WorkExperience24.js.map