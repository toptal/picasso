"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgProfile = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("g", { fillRule: 'nonzero' },
            react_1.default.createElement("path", { d: 'M10.001 12.182a2.726 2.726 0 0 1 2.645-2.077h2.135a2.72 2.72 0 0 1 2.62 1.996.25.25 0 1 0 .482-.134 3.22 3.22 0 0 0-3.102-2.362h-2.135a3.226 3.226 0 0 0-3.13 2.456.25.25 0 0 0 .485.12zM13.652 3.856a2.37 2.37 0 0 1 2.36 2.377 2.37 2.37 0 0 1-2.36 2.376 2.37 2.37 0 0 1-2.358-2.376 2.37 2.37 0 0 1 2.358-2.377zm0 .5a1.87 1.87 0 0 0-1.858 1.877 1.87 1.87 0 0 0 1.858 1.876 1.87 1.87 0 0 0 1.86-1.876 1.87 1.87 0 0 0-1.86-1.877z' }),
            react_1.default.createElement("path", { d: 'M5.195 1.236a.25.25 0 0 1 .25-.25h16.503a.25.25 0 0 1 .25.25v20.528a.25.25 0 0 1-.25.25H5.445a.25.25 0 0 1-.25-.25V1.236zm.5.25v20.028h16.003V1.486H5.695zM1.635 19.764V3.236H2.82a.25.25 0 1 0 0-.5H1.385a.25.25 0 0 0-.25.25v17.028c0 .138.112.25.25.25H2.82a.25.25 0 1 0 0-.5H1.635z' }),
            react_1.default.createElement("path", { d: 'M9.759 15.836h7.875a.25.25 0 1 0 0-.5H9.759a.25.25 0 1 0 0 .5zM9.759 17.586h7.875a.25.25 0 1 0 0-.5H9.759a.25.25 0 1 0 0 .5zM9.759 19.336h3.885a.25.25 0 1 0 0-.5H9.759a.25.25 0 1 0 0 .5z' }))));
};
SvgProfile.displayName = 'SvgProfile';
exports.default = styles_1.withStyles(styles_2.default)(SvgProfile);
//# sourceMappingURL=Profile.js.map