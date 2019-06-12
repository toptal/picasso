"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgTime = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("g", { fillRule: 'nonzero' },
            react_1.default.createElement("path", { d: 'M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm0-.532A7.465 7.465 0 0 1 .538 8 7.465 7.465 0 0 1 8 .532 7.465 7.465 0 0 1 15.462 8 7.465 7.465 0 0 1 8 15.468z' }),
            react_1.default.createElement("path", { d: 'M7.86 7.938l3.58-3.62a.267.267 0 1 0-.38-.376l-3.58 3.62a.267.267 0 1 0 .38.376z' }))));
};
SvgTime.displayName = 'SvgTime';
exports.default = styles_1.withStyles(styles_2.default)(SvgTime);
//# sourceMappingURL=Time.js.map