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
const SvgThumbsUp24 = react_1.forwardRef(function SvgThumbsUp24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M12.443 1.077l1.063.358a2.544 2.544 0 0 1 1.643 3.025l-.944 3.808 2.592-.475c2.398-.44 4.696 1.167 5.132 3.592a4.51 4.51 0 0 1 0 1.596l-.924 5.134C20.497 20.944 18.06 23 15.215 23H12.77c-2.448.001-3.9-.495-6.356-1.487H2.47A1.48 1.48 0 0 1 1 20.025v-8.923a1.48 1.48 0 0 1 1.471-1.487h3.605L10.7 1.75a1.464 1.464 0 0 1 1.742-.673zm-.88 1.18L7 10.014V20.67l.141.057C9.661 21.73 10.813 22 12.771 22h2.444c2.358 0 4.383-1.708 4.806-4.062l.924-5.134a3.51 3.51 0 0 0 0-1.242c-.339-1.882-2.116-3.126-3.968-2.786l-4.115.755.372-1.503.944-3.809a1.544 1.544 0 0 0-.991-1.837l-1.063-.358a.47.47 0 0 0-.561.232zM6 20.511v-9.898H2.471a.48.48 0 0 0-.471.488v8.923a.48.48 0 0 0 .471.488L6 20.512z', id: 'thumbsUp24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'thumbsUp24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#thumbsUp24_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#thumbsUp24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#thumbsUp24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgThumbsUp24.displayName = 'SvgThumbsUp24';
exports.default = styles_1.withStyles(styles_2.default)(SvgThumbsUp24);
//# sourceMappingURL=ThumbsUp24.js.map