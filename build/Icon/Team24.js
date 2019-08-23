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
const SvgTeam24 = react_1.forwardRef(function SvgTeam24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M3.95 16L8 7.388V0h8v7.388L20.056 16H24v8h-8v-4H8v4H0v-8h3.95zm1.105 0H8v3h8v-3H18.951l-3.768-8H8.817l-3.762 8zM7 20v-3H1v6h6v-3zm10-1v4h6v-6h-6v2zM9 7h6V1H9v6z', id: 'team24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'team24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#team24_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#team24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#team24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgTeam24.displayName = 'SvgTeam24';
exports.default = styles_1.withStyles(styles_2.default)(SvgTeam24);
//# sourceMappingURL=Team24.js.map