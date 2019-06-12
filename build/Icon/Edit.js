"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgEdit = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("path", { d: 'M.75 12.014V15c0 .138.112.25.25.25h2.986l.176-.073L15.177 4.162a.25.25 0 0 0 0-.353L12.19.823a.25.25 0 0 0-.353 0L.823 11.838l-.073.176zm.5.104L12.014 1.354l2.632 2.632L3.882 14.75H1.25v-2.632z', fillRule: 'nonzero' })));
};
SvgEdit.displayName = 'SvgEdit';
exports.default = styles_1.withStyles(styles_2.default)(SvgEdit);
//# sourceMappingURL=Edit.js.map