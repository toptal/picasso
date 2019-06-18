"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgCrosshair = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 1.414, className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("g", { fillRule: 'nonzero' },
            react_1.default.createElement("path", { d: 'M8 14.88A6.88 6.88 0 1 0 8 1.12a6.88 6.88 0 1 0 0 13.76zm0-.8A6.08 6.08 0 1 1 8 1.92a6.08 6.08 0 0 1 0 12.16z' }),
            react_1.default.createElement("path", { d: 'M8 10.32a2.32 2.32 0 1 0 0-4.64 2.32 2.32 0 0 0 0 4.64zm0-.8a1.52 1.52 0 1 1 .001-3.041A1.52 1.52 0 0 1 8 9.52zM7.6 0h.8v1.52h-.8V0zm0 14.48h.8V16h-.8v-1.52zM16 7.6v.8h-1.52v-.8H16zm-14.48 0v.8H0v-.8h1.52z' }))));
};
SvgCrosshair.displayName = 'SvgCrosshair';
exports.default = styles_1.withStyles(styles_2.default)(SvgCrosshair);
//# sourceMappingURL=Crosshair.js.map