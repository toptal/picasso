"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgAlert = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("path", { d: 'M7.986 2.618a1 1 0 0 0-.984 1.014v5.832a1 1 0 1 0 2 0V3.632a1 1 0 0 0-1.016-1.014zm.012 8.346a1 1 0 0 0-.748.322c-.037.03-.094.022-.127.057a1.202 1.202 0 0 0-.326.87 1.226 1.226 0 0 0 1.205 1.169 1 1 0 0 0 .023 0c.323-.007.63-.142.852-.377a1.21 1.21 0 0 0 .326-.87c-.012-.359-.208-.647-.475-.863a1 1 0 0 0-.69-.306 1 1 0 0 0-.036-.002z' })));
};
SvgAlert.displayName = 'SvgAlert';
exports.default = styles_1.withStyles(styles_2.default)(SvgAlert);
//# sourceMappingURL=Alert.js.map