"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgChevronRight = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 7 13', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("path", { d: 'M7 6.5a.43.43 0 0 1-.12.3l-5.604 6.07a.367.367 0 0 1-.277.13.367.367 0 0 1-.277-.13l-.601-.652a.43.43 0 0 1-.121-.3.43.43 0 0 1 .12-.3L4.848 6.5.12 1.381a.43.43 0 0 1-.121-.3.43.43 0 0 1 .12-.3l.602-.65A.368.368 0 0 1 .999 0c.104 0 .196.044.277.13L6.879 6.2A.43.43 0 0 1 7 6.5z' })));
};
SvgChevronRight.displayName = 'SvgChevronRight';
exports.default = styles_1.withStyles(styles_2.default)(SvgChevronRight);
//# sourceMappingURL=ChevronRight.js.map