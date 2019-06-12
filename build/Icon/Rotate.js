"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgRotate = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("g", { fillRule: 'nonzero' },
            react_1.default.createElement("path", { d: 'M2.444 13.622V8.29h-.888v6.222h11.982v-.889zM12.632 8.289h.89V2.956H2.461v.888h10.17z' }),
            react_1.default.createElement("path", { d: 'M10.922 15.791l.617.64 2.64-2.542-2.64-2.542-.617.64 1.976 1.902zM4.616 1.32L3.999.68 1.36 3.222 4 5.765l.617-.64-1.975-1.903z' }))));
};
SvgRotate.displayName = 'SvgRotate';
exports.default = styles_1.withStyles(styles_2.default)(SvgRotate);
//# sourceMappingURL=Rotate.js.map