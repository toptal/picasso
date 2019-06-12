"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgDone = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("g", { fillRule: 'nonzero' },
            react_1.default.createElement("path", { d: 'M11 14.146l-2.823-2.823-.354.354L11 14.854l5.677-5.677-.354-.354z' }),
            react_1.default.createElement("path", { d: 'M12 21.25a9.25 9.25 0 1 0 0-18.5 9.25 9.25 0 0 0 0 18.5zm0-.5a8.75 8.75 0 1 1 0-17.5 8.75 8.75 0 0 1 0 17.5z' }))));
};
SvgDone.displayName = 'SvgDone';
exports.default = styles_1.withStyles(styles_2.default)(SvgDone);
//# sourceMappingURL=Done.js.map