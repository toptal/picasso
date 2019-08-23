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
const SvgPortfolioFinance16 = react_1.forwardRef(function SvgPortfolioFinance16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M14.883 10.441L16 11l-8 4-8-4 1.117-.559L8 13.882l6.883-3.44zm0-3L16 8l-8 4-8-4 1.117-.559L8 10.882l6.883-3.44zM8 1l8 4-8 4-8-4 8-4zm0 1.118L2.236 5 8 7.882 13.764 5 8 2.118z', id: 'portfolioFinance16_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'portfolioFinance16_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#portfolioFinance16_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#portfolioFinance16_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#portfolioFinance16_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgPortfolioFinance16.displayName = 'SvgPortfolioFinance16';
exports.default = styles_1.withStyles(styles_2.default)(SvgPortfolioFinance16);
//# sourceMappingURL=PortfolioFinance16.js.map