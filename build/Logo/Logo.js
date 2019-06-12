"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const Icon_1 = require("../Icon");
const styles_2 = __importDefault(require("./styles"));
exports.Logo = ({ classes, emblem, variant, style, className }) => {
    const rootClass = emblem ? classes.logoEmblem : classes.logo;
    const colorClass = classes[variant];
    const LogoComponent = emblem ? Icon_1.LogoEmblem : Icon_1.Logo;
    return (react_1.default.createElement(LogoComponent, { className: classnames_1.default(rootClass, colorClass, className), style: style }));
};
exports.Logo.defaultProps = {
    variant: 'default'
};
exports.default = styles_1.withStyles(styles_2.default)(exports.Logo);
//# sourceMappingURL=Logo.js.map