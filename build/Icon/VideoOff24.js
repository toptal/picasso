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
const SvgVideoOff24 = react_1.forwardRef(function SvgVideoOff24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M7.121 19l1-1H17V9.121l1-1v.45L24 6v12l-6-2.571V19H7.121zM2.88 19H0V5h16.879l-1 1H1v12h2.879l-1 1zM18 9.66v4.68l5 2.143V7.517l-5 2.142zM2.5 22.206l-.707-.707L21.5 1.793l.707.707L2.5 22.207z', id: 'videoOff24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'videoOff24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#videoOff24_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#videoOff24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#videoOff24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgVideoOff24.displayName = 'SvgVideoOff24';
exports.default = styles_1.withStyles(styles_2.default)(SvgVideoOff24);
//# sourceMappingURL=VideoOff24.js.map