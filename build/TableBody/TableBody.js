"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const TableBody_1 = __importDefault(require("@material-ui/core/TableBody"));
const styles_2 = __importDefault(require("./styles"));
exports.TableBody = ({ classes, className, style, children }) => (react_1.default.createElement(TableBody_1.default, { classes: classes, className: className, style: style }, children));
exports.TableBody.defaultProps = {};
exports.TableBody.displayName = 'TableBody';
exports.default = styles_1.withStyles(styles_2.default)(exports.TableBody);
//# sourceMappingURL=TableBody.js.map