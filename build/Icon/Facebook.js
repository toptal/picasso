"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgFacebook = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("path", { d: 'M8.49 15.95V8h2.48l.39-2.64H8.5V4.03c0-.7.2-1.35 1.14-1.35h1.86V.05H8.85c-2.22 0-2.83 1.55-2.83 3.7v1.6H4.5v2.64h1.53v7.96H8.5z', fillRule: 'evenodd' })));
};
SvgFacebook.displayName = 'SvgFacebook';
exports.default = styles_1.withStyles(styles_2.default)(SvgFacebook);
//# sourceMappingURL=Facebook.js.map