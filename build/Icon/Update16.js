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
const SvgUpdate16 = react_1.forwardRef(function SvgUpdate16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M3.5 12.753V14.5h-1v-4h4v1H3.816A5.435 5.435 0 0 0 8 13.455 5.455 5.455 0 0 0 13.455 8h1.09A6.545 6.545 0 0 1 3.5 12.753zm9-9.506V1.5h1v4h-4v-1h2.684A5.435 5.435 0 0 0 8 2.545 5.455 5.455 0 0 0 2.545 8h-1.09A6.545 6.545 0 0 1 12.5 3.247z', id: 'update16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'update16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#update16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#update16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#update16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgUpdate16.displayName = 'SvgUpdate16';
exports.default = styles_1.withStyles(styles_2.default)(SvgUpdate16);
//# sourceMappingURL=Update16.js.map