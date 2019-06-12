"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgClock = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("g", { fillRule: 'nonzero' },
            react_1.default.createElement("path", { d: 'M12 21.25a9.25 9.25 0 1 0 0-18.5 9.25 9.25 0 0 0 0 18.5zm0-.5a8.75 8.75 0 1 1 0-17.5 8.75 8.75 0 0 1 0 17.5z' }),
            react_1.default.createElement("path", { d: 'M12.25 13.25v-5h-.5v5.5h4.5v-.5z' }))));
};
SvgClock.displayName = 'SvgClock';
exports.default = styles_1.withStyles(styles_2.default)(SvgClock);
//# sourceMappingURL=Clock.js.map