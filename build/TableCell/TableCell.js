"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const TableCell_1 = __importDefault(require("@material-ui/core/TableCell"));
const styles_2 = __importDefault(require("./styles"));
exports.TableCell = ({ align, classes, className, style, children, colSpan }) => (react_1.default.createElement(TableCell_1.default, { align: align, classes: classes, className: className, style: style, colSpan: colSpan }, children));
exports.TableCell.defaultProps = {
    align: 'inherit'
};
exports.TableCell.displayName = 'TableCell';
exports.default = styles_1.withStyles(styles_2.default)(exports.TableCell);
//# sourceMappingURL=TableCell.js.map