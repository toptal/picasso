"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const InputAdornment_1 = __importDefault(require("@material-ui/core/InputAdornment"));
const styles_2 = __importDefault(require("./styles"));
const InputAdornment = ({ classes, className, style, children, position }) => {
    return (react_1.default.createElement(InputAdornment_1.default, { classes: classes, className: className, style: style, position: position }, children));
};
exports.default = styles_1.withStyles(styles_2.default)(InputAdornment);
//# sourceMappingURL=InputAdornment.js.map