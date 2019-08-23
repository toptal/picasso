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
const SvgEvening16 = react_1.forwardRef(function SvgEvening16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M14 12v-1h1v1h1v1h-1v1h-1v-1h-1v-1h1zM7 9V8h1v1h1v1H8v1H7v-1H6V9h1zm5-4V3h1v2h2v1h-2v2h-1V6h-2V5h2zM2 13v-2h1v2h2v1H3v2H2v-2H0v-1h2zM5 2h2v1H5v2H4V3H2V2h2V0h1v2z', id: 'evening16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'evening16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#evening16_svg__a' })),
            react_1.default.createElement("use", { xlinkHref: '#evening16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#evening16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgEvening16.displayName = 'SvgEvening16';
exports.default = styles_1.withStyles(styles_2.default)(SvgEvening16);
//# sourceMappingURL=Evening16.js.map