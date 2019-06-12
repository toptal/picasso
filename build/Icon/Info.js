"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgInfo = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("path", { fillRule: 'evenodd', d: 'M24 12c0 6.625-5.375 12-12 12S0 18.625 0 12 5.375 0 12 0s12 5.375 12 12zm-8 7.5V17c0-.281-.219-.5-.5-.5H14v-8c0-.281-.219-.5-.5-.5h-5c-.281 0-.5.219-.5.5V11c0 .281.219.5.5.5H10v5H8.5c-.281 0-.5.219-.5.5v2.5c0 .281.219.5.5.5h7c.281 0 .5-.219.5-.5zm-2-14V3c0-.281-.219-.5-.5-.5h-3c-.281 0-.5.219-.5.5v2.5c0 .281.219.5.5.5h3c.281 0 .5-.219.5-.5z' })));
};
SvgInfo.displayName = 'SvgInfo';
exports.default = styles_1.withStyles(styles_2.default)(SvgInfo);
//# sourceMappingURL=Info.js.map