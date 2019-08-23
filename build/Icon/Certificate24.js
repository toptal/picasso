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
const SvgCertificate24 = react_1.forwardRef(function SvgCertificate24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M15 17.4v4.166l2.5-1.667 2.5 1.667V17.4c-.75.384-1.6.6-2.5.6-.9 0-1.75-.216-2.5-.6zm-1-.657a5.5 5.5 0 1 1 7 0v6.691l-3.5-2.333-3.5 2.333v-6.691zM2 23H1V1h17v5h-1V2H2v20h11v1H2zm15.5-6a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z', id: 'certificate24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'certificate24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#certificate24_svg__a' })),
            react_1.default.createElement("use", { xlinkHref: '#certificate24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#certificate24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgCertificate24.displayName = 'SvgCertificate24';
exports.default = styles_1.withStyles(styles_2.default)(SvgCertificate24);
//# sourceMappingURL=Certificate24.js.map