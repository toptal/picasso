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
const SvgPortfolioDesigner24 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgPortfolioDesigner24';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M1 1h9v9H1V1zm1 1v7h7V2H2zm12-1h9v9h-9V1zm1 1v7h7V2h-7zM1 14h9v9H1v-9zm1 8h7v-7H2v7zm12-8h9v9h-9v-9zm1 8h7v-7h-7v7z', id: 'portfolioDesigner24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'portfolioDesigner24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#portfolioDesigner24_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#portfolioDesigner24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#portfolioDesigner24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
};
SvgPortfolioDesigner24.displayName = 'SvgPortfolioDesigner24';
exports.default = styles_1.withStyles(styles_2.default)(SvgPortfolioDesigner24);
//# sourceMappingURL=PortfolioDesigner24.js.map