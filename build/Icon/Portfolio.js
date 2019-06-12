"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgPortfolio = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("g", { fillRule: 'nonzero' },
            react_1.default.createElement("path", { d: 'M1.958 2.225a.25.25 0 0 1 .25-.25h7.484a.25.25 0 0 1 .25.25v7.483a.25.25 0 0 1-.25.25H2.208a.25.25 0 0 1-.25-.25V2.225zm.5.25v6.983h6.984V2.475H2.458zM1.958 14.292a.25.25 0 0 1 .25-.25h7.484a.25.25 0 0 1 .25.25v7.483a.25.25 0 0 1-.25.25H2.208a.25.25 0 0 1-.25-.25v-7.483zm.5 7.233h6.984v-6.983H2.458v6.983zM14.058 14.292a.25.25 0 0 1 .25-.25h7.484a.25.25 0 0 1 .25.25v7.483a.25.25 0 0 1-.25.25h-7.484a.25.25 0 0 1-.25-.25v-7.483zm.5 7.233h6.984v-6.983h-6.984v6.983zM14.058 2.225a.25.25 0 0 1 .25-.25h7.484a.25.25 0 0 1 .25.25v7.483a.25.25 0 0 1-.25.25h-7.484a.25.25 0 0 1-.25-.25V2.225zm.5.25v6.983h6.984V2.475h-6.984z' }))));
};
SvgPortfolio.displayName = 'SvgPortfolio';
exports.default = styles_1.withStyles(styles_2.default)(SvgPortfolio);
//# sourceMappingURL=Portfolio.js.map