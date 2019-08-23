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
const SvgInstagram16 = react_1.forwardRef(function SvgInstagram16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M8 0C5.827 0 5.555.01 4.702.048 3.85.088 3.27.222 2.76.42a3.918 3.918 0 0 0-1.417.923c-.445.444-.72.89-.923 1.417-.198.51-.333 1.09-.372 1.942C.008 5.555 0 5.827 0 8s.01 2.445.048 3.298c.04.851.174 1.432.372 1.942.204.525.478.973.923 1.417.444.444.89.72 1.417.923.51.197 1.09.333 1.942.372.853.04 1.125.048 3.298.048s2.445-.01 3.298-.048c.851-.04 1.432-.175 1.942-.372a3.932 3.932 0 0 0 1.417-.923c.444-.444.72-.89.923-1.417.197-.51.333-1.09.372-1.942.04-.853.048-1.125.048-3.298s-.01-2.445-.048-3.298c-.04-.851-.175-1.433-.372-1.942a3.926 3.926 0 0 0-.923-1.417A3.898 3.898 0 0 0 13.24.42c-.51-.198-1.09-.333-1.942-.372C10.445.008 10.173 0 8 0zm0 1.44c2.135 0 2.39.01 3.233.047.78.037 1.204.166 1.485.277.375.145.64.318.921.597.28.28.453.546.598.921.109.281.24.705.275 1.485.038.844.047 1.097.047 3.233s-.01 2.39-.05 3.233c-.04.78-.17 1.204-.28 1.485-.15.375-.32.64-.6.921-.279.28-.549.453-.92.598-.28.109-.71.24-1.49.275-.849.038-1.099.047-3.239.047-2.14 0-2.39-.01-3.24-.05-.78-.04-1.21-.17-1.49-.28-.38-.15-.64-.32-.92-.6a2.43 2.43 0 0 1-.6-.92c-.11-.28-.239-.71-.28-1.49-.03-.84-.04-1.099-.04-3.229s.01-2.39.04-3.24c.041-.78.17-1.21.28-1.49.14-.38.32-.64.6-.92.28-.28.54-.46.92-.6.28-.11.7-.24 1.48-.28.85-.03 1.1-.04 3.24-.04l.03.02zm0 2.452a4.108 4.108 0 1 0 0 8.215 4.108 4.108 0 0 0 0-8.215zm0 6.775a2.666 2.666 0 1 1 0-5.334 2.666 2.666 0 1 1 0 5.334zm5.23-6.937a.96.96 0 1 1-1.92-.001.96.96 0 0 1 1.92.001z', id: 'instagram16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'instagram16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#instagram16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#instagram16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#instagram16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgInstagram16.displayName = 'SvgInstagram16';
exports.default = styles_1.withStyles(styles_2.default)(SvgInstagram16);
//# sourceMappingURL=Instagram16.js.map