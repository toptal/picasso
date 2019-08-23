"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const BASE_SIZE = 16;
const SvgEducation16 = react_1.forwardRef(function SvgEducation16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M10.996 12.794L13 16H8l1.996-3.194V6.783L7.314 5.169l.515-.857 3.167 1.905v6.577zM12 11.572v-1.116l1-.496V6.058l-1 .5V5.44l1.883-.941-5.866-2.94-5.898 2.94L8 7.442l1-.5v1.118l-1 .5-5-2.5v3.9l5 2.48 1-.496v1.117l-1 .495-6-2.975V5.558l-2.12-1.06L8.019.441l8.099 4.058L14 5.56v5.021l-2 .992zM9.804 15h1.392l-.696-1.113L9.804 15z', id: 'education16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'education16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#education16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#education16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#education16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgEducation16.displayName = 'SvgEducation16';
exports.default = styles_1.withStyles(styles_2.default)(SvgEducation16);
//# sourceMappingURL=Education16.js.map