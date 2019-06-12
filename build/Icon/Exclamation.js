"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgExclamation = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("g", { fillRule: 'nonzero' },
            react_1.default.createElement("path", { d: 'M7.294 4v5.176a.941.941 0 1 0 1.882 0V4a.941.941 0 0 0-1.882 0zM8.235 12.941a.941.941 0 1 0 0-1.882.941.941 0 0 0 0 1.882z' }),
            react_1.default.createElement("path", { d: 'M7.765 15.53a7.765 7.765 0 1 0 0-15.53 7.765 7.765 0 0 0 0 15.53zm0-.471a7.294 7.294 0 1 1 0-14.588 7.294 7.294 0 0 1 0 14.588z' }))));
};
SvgExclamation.displayName = 'SvgExclamation';
exports.default = styles_1.withStyles(styles_2.default)(SvgExclamation);
//# sourceMappingURL=Exclamation.js.map