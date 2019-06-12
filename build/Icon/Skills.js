"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgSkills = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("g", { fillRule: 'nonzero' },
            react_1.default.createElement("path", { d: 'M18.948 22.4l-4.81-4.802a.25.25 0 1 0-.353.354l4.987 4.977a.25.25 0 0 0 .353 0l3.804-3.804a.25.25 0 0 0 0-.353l-4.977-4.987a.25.25 0 1 0-.354.353l4.801 4.81-3.45 3.451zM1.6 5.052L5.053 1.6l4.81 4.8a.25.25 0 0 0 .353-.353L5.228 1.071a.25.25 0 0 0-.353 0L1.07 4.875a.25.25 0 0 0 0 .353l4.977 4.987a.25.25 0 0 0 .354-.353L1.6 5.052z' }),
            react_1.default.createElement("path", { d: 'M4.367 8.18l1.906-1.907a.25.25 0 0 0-.353-.353L4.013 7.827a.25.25 0 0 0 .354.353zM6.402 10.215l.953-.953a.25.25 0 0 0-.353-.354l-.954.954a.25.25 0 0 0 .354.353zM16.173 19.978l1.907-1.897a.25.25 0 1 0-.353-.355l-1.907 1.898a.25.25 0 1 0 .353.354zM14.138 17.952l.954-.954a.25.25 0 1 0-.354-.353l-.953.953a.25.25 0 1 0 .353.354zM2.83 17.115v3.804c0 .138.113.25.25.25h3.805l.177-.073L21.096 7.062a.25.25 0 0 0 0-.354l-3.804-3.804a.25.25 0 0 0-.354 0L2.904 16.938l-.073.177zm14.285-13.68l3.45 3.45L6.782 20.669h-3.45v-3.45L17.115 3.434z' }),
            react_1.default.createElement("path", { d: 'M5.155 19.19l12.2-12.202a.25.25 0 0 0-.353-.353l-12.2 12.2a.25.25 0 0 0 .353.354z' }))));
};
SvgSkills.displayName = 'SvgSkills';
exports.default = styles_1.withStyles(styles_2.default)(SvgSkills);
//# sourceMappingURL=Skills.js.map