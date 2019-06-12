"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const Paper_1 = __importDefault(require("@material-ui/core/Paper"));
const styles_2 = __importDefault(require("./styles"));
exports.Paper = ({ classes, className, style, children }) => (react_1.default.createElement(Paper_1.default, { classes: classes, className: className, style: style, elevation: 1, square: true }, children));
exports.Paper.displayName = 'Paper';
exports.default = styles_1.withStyles(styles_2.default)(exports.Paper);
//# sourceMappingURL=Paper.js.map