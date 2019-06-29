"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const BASE_SIZE = 24;
const SvgPortfolioFinance24 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgPortfolioFinance24';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M1.106 15.447L12 20.882l10.894-5.435L24 16l-12 6-12-6 1.106-.553zm0-4L12 16.882l10.894-5.435L24 12l-12 6-12-6 1.106-.553zM0 8l12-6 12 6-12 6L0 8zm12 4.882L21.764 8 12 3.118 2.236 8 12 12.882z', id: 'portfolioFinance24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'portfolioFinance24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#portfolioFinance24_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#portfolioFinance24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#portfolioFinance24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
};
SvgPortfolioFinance24.displayName = 'SvgPortfolioFinance24';
exports.default = styles_1.withStyles(styles_2.default)(SvgPortfolioFinance24);
//# sourceMappingURL=PortfolioFinance24.js.map