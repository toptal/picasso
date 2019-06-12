"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgLocation = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 16 16', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("g", { fillRule: 'nonzero' },
            react_1.default.createElement("path", { d: 'M14.122 6.061c0 .95-.463 2.122-1.302 3.475a23.93 23.93 0 0 1-1.662 2.317 39.108 39.108 0 0 1-2.933 3.252.235.235 0 0 1-.328 0 38.14 38.14 0 0 1-.918-.943 39.286 39.286 0 0 1-2.014-2.313 24.071 24.071 0 0 1-1.653-2.302C2.467 8.187 2 7.013 2 6.06A6.06 6.06 0 0 1 8.061 0a6.06 6.06 0 0 1 6.061 6.061zm-5.978 8.46a38.645 38.645 0 0 0 2.646-2.963 23.473 23.473 0 0 0 1.63-2.27c.797-1.285 1.232-2.384 1.232-3.227a5.589 5.589 0 0 0-5.59-5.59A5.589 5.589 0 0 0 2.47 6.06c0 .843.438 1.946 1.24 3.237.446.717.994 1.475 1.62 2.257a38.823 38.823 0 0 0 2.73 3.05l.083-.083z' }),
            react_1.default.createElement("path", { d: 'M8.061 7.52a1.694 1.694 0 1 0 0-3.388 1.694 1.694 0 0 0 0 3.388zm0-.47a1.224 1.224 0 1 1 0-2.448 1.224 1.224 0 0 1 0 2.447z' }))));
};
SvgLocation.displayName = 'SvgLocation';
exports.default = styles_1.withStyles(styles_2.default)(SvgLocation);
//# sourceMappingURL=Location.js.map