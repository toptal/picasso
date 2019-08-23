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
const SvgBankWire16 = react_1.forwardRef(function SvgBankWire16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M0 13h16v3H0v-3zm1 1v1h14v-1H1zM0 3l8-3 8 3v2H0V3zm1 .66V4h14v-.34L8 1.087 1 3.659zM3 6h1v6H3V6zm3 0h1v6H6V6zm3 0h1v6H9V6zm3 0h1v6h-1V6z', id: 'bankWire16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'bankWire16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#bankWire16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#bankWire16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#bankWire16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgBankWire16.displayName = 'SvgBankWire16';
exports.default = styles_1.withStyles(styles_2.default)(SvgBankWire16);
//# sourceMappingURL=BankWire16.js.map