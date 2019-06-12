"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgEducation = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("g", { fillRule: 'nonzero' },
            react_1.default.createElement("path", { d: 'M12.139 13.276a.25.25 0 0 1-.244 0l-9.55-5.333a.25.25 0 0 1 0-.436l9.55-5.342a.25.25 0 0 1 .244 0l9.517 5.342a.25.25 0 0 1 0 .436l-9.517 5.333zm8.883-5.551L12.016 2.67 2.98 7.725l9.037 5.047 9.006-5.047zM20.2 15.333v-3.258a.25.25 0 1 0-.5 0v3.258a.25.25 0 1 0 .5 0zM4.267 12.075a.25.25 0 0 0-.5 0v3.258c0 .091.049.175.129.22l8.008 4.432a.25.25 0 0 0 .242-.437l-7.88-4.362v-3.111z' }),
            react_1.default.createElement("path", { d: 'M16.625 18.325a.25.25 0 1 0 .5 0v-7.917a.25.25 0 0 0-.126-.217l-4.858-2.775a.25.25 0 0 0-.248.434l4.732 2.703v7.772z' }),
            react_1.default.createElement("path", { d: 'M16.652 18.212l-1.675 3.291a.25.25 0 0 0 .223.364h3.35a.25.25 0 0 0 .223-.364l-1.675-3.291a.25.25 0 0 0-.446 0zm1.49 3.155h-2.534l1.267-2.49 1.267 2.49z' }))));
};
SvgEducation.displayName = 'SvgEducation';
exports.default = styles_1.withStyles(styles_2.default)(SvgEducation);
//# sourceMappingURL=Education.js.map