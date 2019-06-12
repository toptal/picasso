"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgMessage = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("g", { fillRule: 'nonzero' },
            react_1.default.createElement("path", { d: 'M.25 12.28a.25.25 0 0 1-.25-.25V.25A.25.25 0 0 1 .25 0h15.42a.25.25 0 0 1 .25.25v15.5a.25.25 0 0 1-.397.203L10.45 12.28H.25zM15.42.5H.5v11.28h10.03l.147.047 4.743 3.433V.5z' }),
            react_1.default.createElement("path", { d: 'M3.25 5.38h9.42a.25.25 0 1 0 0-.5H3.25a.25.25 0 1 0 0 .5zM3.25 7.38h4.71a.25.25 0 1 0 0-.5H3.25a.25.25 0 1 0 0 .5z' }))));
};
SvgMessage.displayName = 'SvgMessage';
exports.default = styles_1.withStyles(styles_2.default)(SvgMessage);
//# sourceMappingURL=Message.js.map