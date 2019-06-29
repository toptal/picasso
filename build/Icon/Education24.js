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
const SvgEducation24 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgEducation24';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M16.996 19.794L19 23h-5l1.996-3.194V9.794L11.32 7.193l.486-.874 5.19 2.887v10.588zm1-3.236V15.44L19 14.938V9.056l-1.004.502v-.94l-.168-.094 3.055-1.527-8.859-4.438L3.12 6.998 12 11.438l2.578-1.289.418.233v.676L12 12.556l-7-3.5v5.882l7 3.5 2.996-1.498v1.118L12 19.556l-8-4v-7L.88 6.996l11.146-5.555 11.091 5.557L20 8.556v7l-2.004 1.002zM15.804 22h1.392l-.696-1.113L15.804 22z', id: 'education24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'education24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#education24_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#education24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#education24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
};
SvgEducation24.displayName = 'SvgEducation24';
exports.default = styles_1.withStyles(styles_2.default)(SvgEducation24);
//# sourceMappingURL=Education24.js.map