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
const BASE_SIZE = 24;
const SvgPin24 = react_1.forwardRef(function SvgPin24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M12 24C6 17.314 3 12.314 3 9a9 9 0 1 1 18 0c0 3.314-3 8.314-9 15zM4 9c0 2.855 2.656 7.406 8 13.494C17.344 16.406 20 11.855 20 9A8 8 0 1 0 4 9zm8 3a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-2-3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z', id: 'pin24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'pin24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#pin24_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#pin24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#pin24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgPin24.displayName = 'SvgPin24';
exports.default = styles_1.withStyles(styles_2.default)(SvgPin24);
//# sourceMappingURL=Pin24.js.map