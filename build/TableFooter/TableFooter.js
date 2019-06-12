"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const TableFooter_1 = __importDefault(require("@material-ui/core/TableFooter"));
const react_1 = __importDefault(require("react"));
const styles_2 = __importDefault(require("./styles"));
exports.TableFooter = ({ classes, className, style, children }) => (react_1.default.createElement(TableFooter_1.default, { classes: classes, className: className, style: style }, children));
exports.TableFooter.defaultProps = {};
exports.TableFooter.displayName = 'TableFooter';
exports.default = styles_1.withStyles(styles_2.default)(exports.TableFooter);
//# sourceMappingURL=TableFooter.js.map