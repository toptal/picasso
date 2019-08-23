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
const SvgCertificate16 = react_1.forwardRef(function SvgCertificate16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M14 10.663a3.486 3.486 0 0 1-1.5.337c-.537 0-1.045-.12-1.5-.337v3.165l1.5-.45 1.5.45v-3.165zm1-.714v5.223l-2.5-.75-2.5.75V9.949a3.5 3.5 0 1 1 5 0zM1 16H0V0h13v3h-1V1H1v14h8v1H1zm11.5-6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z', id: 'certificate16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'certificate16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#certificate16_svg__a' })),
            react_1.default.createElement("use", { xlinkHref: '#certificate16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#certificate16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgCertificate16.displayName = 'SvgCertificate16';
exports.default = styles_1.withStyles(styles_2.default)(SvgCertificate16);
//# sourceMappingURL=Certificate16.js.map