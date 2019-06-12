"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
const styles_2 = __importDefault(require("./styles"));
const CircularProgress = ({ classes, className, style, size, value, variant }) => (react_1.default.createElement(CircularProgress_1.default, { classes: classes, className: className, style: style, size: size, value: value, variant: variant }));
exports.default = styles_1.withStyles(styles_2.default)(CircularProgress);
//# sourceMappingURL=CircularProgress.js.map