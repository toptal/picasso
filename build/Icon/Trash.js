"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgTrash = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("g", { fillRule: 'nonzero' },
            react_1.default.createElement("path", { d: 'M6.394.693h4.212a.333.333 0 1 0 0-.666H6.394a.333.333 0 1 0 0 .666zM7.26 12.307V6.36a.333.333 0 1 0-.666 0v5.947a.333.333 0 0 0 .666 0zM10.406 12.307V6.36a.333.333 0 1 0-.666 0v5.947a.333.333 0 0 0 .666 0zM2.494 3.36h12.012a.333.333 0 0 0 0-.667H2.494a.333.333 0 0 0 0 .667z' }),
            react_1.default.createElement("path", { d: 'M12.873 15.307H4.127V3.027a.333.333 0 1 0-.666 0V15.64c0 .184.149.333.333.333h9.412c.184 0 .333-.149.333-.333V3.027a.333.333 0 1 0-.666 0v12.28z' }))));
};
SvgTrash.displayName = 'SvgTrash';
exports.default = styles_1.withStyles(styles_2.default)(SvgTrash);
//# sourceMappingURL=Trash.js.map