"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgPhone = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("path", { d: 'M13.848 14.85l1.386-1.387a.909.909 0 0 0 0-1.285l-2.33-2.325a.906.906 0 0 0-1.283 0l-1.155 1.156-.388-.283a23.598 23.598 0 0 1-5.303-5.302l-.283-.39 1.155-1.157a.909.909 0 0 0 0-1.285L3.317.266a.906.906 0 0 0-1.283 0L.648 1.655a2.212 2.212 0 0 0-.476 2.42A20.96 20.96 0 0 0 11.43 15.327c.83.349 1.784.16 2.418-.476zM.634 3.882a1.712 1.712 0 0 1 .368-1.874L2.388.62c.16-.16.417-.16.576 0l2.33 2.326c.16.16.16.418 0 .578L3.986 4.832a.25.25 0 0 0-.025.324l.409.561a24.095 24.095 0 0 0 5.413 5.414l.56.409a.25.25 0 0 0 .324-.026l1.306-1.308c.16-.16.417-.16.577 0l2.33 2.326c.159.16.159.418 0 .578l-1.386 1.387a1.706 1.706 0 0 1-1.871.37A20.461 20.461 0 0 1 .634 3.88z', fillRule: 'nonzero' })));
};
SvgPhone.displayName = 'SvgPhone';
exports.default = styles_1.withStyles(styles_2.default)(SvgPhone);
//# sourceMappingURL=Phone.js.map