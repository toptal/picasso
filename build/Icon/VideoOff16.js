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
const SvgVideoOff16 = react_1.forwardRef(function SvgVideoOff16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M12.869 5.252L16 4v8l-4-1.6V13H5.121l1-1H11V7.121l1.869-1.869zM.879 13H0V3h10.879l-1 1H1v8h.879l-1 1zM12 6.677v2.646l3 1.2V5.477l-3 1.2zm-10.5 8.53L.793 14.5 14.5.793l.707.707L1.5 15.207z', id: 'videoOff16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'videoOff16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#videoOff16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#videoOff16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#videoOff16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgVideoOff16.displayName = 'SvgVideoOff16';
exports.default = styles_1.withStyles(styles_2.default)(SvgVideoOff16);
//# sourceMappingURL=VideoOff16.js.map