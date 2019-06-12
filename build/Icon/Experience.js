"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgExperience = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("g", { fillRule: 'nonzero' },
            react_1.default.createElement("path", { d: 'M9.056 21.226h12.746a.25.25 0 1 0 0-.5H9.056a.25.25 0 1 0 0 .5zM8.806 11.736a.25.25 0 0 1 .25-.25h12.746a.25.25 0 0 1 .25.25v6.472a.25.25 0 0 1-.25.25H9.056a.25.25 0 0 1-.25-.25v-6.472zm.5.25v5.972h12.246v-5.972H9.306zM17.464 9.086h-4.07a.25.25 0 1 0 0 .5h4.07a.25.25 0 1 0 0-.5zM15.694 4.066v2.87a.25.25 0 1 0 .5 0v-3.12a.25.25 0 0 0-.25-.25h-5.186a.25.25 0 0 0 0 .5h4.936zM3.448 12.814V4.066h4.935a.25.25 0 1 0 0-.5H3.198a.25.25 0 0 0-.25.25v9.248c0 .138.112.25.25.25H6.68a.25.25 0 1 0 0-.5H3.448z' }),
            react_1.default.createElement("path", { d: 'M8.133 2.216a.25.25 0 0 1 .25-.25h2.375a.25.25 0 0 1 .25.25v3.2a.25.25 0 0 1-.25.25H8.383a.25.25 0 0 1-.25-.25v-3.2zm.5 2.95h1.875v-2.7H8.633v2.7z' }))));
};
SvgExperience.displayName = 'SvgExperience';
exports.default = styles_1.withStyles(styles_2.default)(SvgExperience);
//# sourceMappingURL=Experience.js.map