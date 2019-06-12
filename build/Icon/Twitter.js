"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const SvgTwitter = (props) => {
    const { classes, className, style, size, color } = props;
    const svgStyle = Object.assign({ fontSize: size && `${size}rem` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("path", { fillRule: 'evenodd', d: 'M23.995 4.314a9.949 9.949 0 0 1-2.826.778 4.94 4.94 0 0 0 2.165-2.726 9.779 9.779 0 0 1-3.126 1.195A4.915 4.915 0 0 0 16.614 2a4.923 4.923 0 0 0-4.921 4.927c0 .387.04.763.127 1.124A13.947 13.947 0 0 1 1.673 2.9a4.936 4.936 0 0 0 1.53 6.58 4.806 4.806 0 0 1-2.237-.616v.061a4.927 4.927 0 0 0 3.95 4.83 4.954 4.954 0 0 1-1.296.174c-.316 0-.626-.03-.926-.092a4.93 4.93 0 0 0 4.601 3.422 9.867 9.867 0 0 1-7.29 2.04 13.755 13.755 0 0 0 7.534 2.226c9.064 0 14.016-7.51 14.016-14.023a13.1 13.1 0 0 0-.015-.636 10.02 10.02 0 0 0 2.455-2.552z' })));
};
SvgTwitter.displayName = 'SvgTwitter';
exports.default = styles_1.withStyles(styles_2.default)(SvgTwitter);
//# sourceMappingURL=Twitter.js.map