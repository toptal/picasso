"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgClose = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("path", { d: 'M4.65 4L4 4.65 7.35 8 4 11.35l.65.65L8 8.65 11.35 12l.65-.65L8.65 8 12 4.65 11.35 4 8 7.35z' })));
};
SvgClose.displayName = 'SvgClose';
exports.default = styles_1.withStyles(styles_2.default)(SvgClose);
//# sourceMappingURL=Close.js.map