"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgAlarm = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("g", { fillRule: 'nonzero' },
            react_1.default.createElement("path", { d: 'M3.5 11.5a8.5 8.5 0 0 1 17 0V18a1 1 0 0 0 1 1v1h-19v-1a1 1 0 0 0 1-1v-6.5zm18 7.5c.667 0 .667 1 0 1a2 2 0 0 1-1.732-1H21.5zm-2-1v-6.5a7.5 7.5 0 0 0-15 0V18c0 .364-.097.706-.268 1h15.536a1.99 1.99 0 0 1-.268-1zm-17 2c-.667 0-.667-1 0-1h1.732A2 2 0 0 1 2.5 20z' }),
            react_1.default.createElement("path", { d: 'M11.5.501v3a.5.5 0 0 0 1 0v-3a.5.5 0 1 0-1 0zM13.96 21.4a2 2 0 0 1-3.92 0 .5.5 0 0 0-.98.2 3 3 0 0 0 5.88 0 .5.5 0 1 0-.98-.2z' }))));
};
SvgAlarm.displayName = 'SvgAlarm';
exports.default = styles_1.withStyles(styles_2.default)(SvgAlarm);
//# sourceMappingURL=Alarm.js.map