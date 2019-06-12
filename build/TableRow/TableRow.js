"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const TableRow_1 = __importDefault(require("@material-ui/core/TableRow"));
const styles_2 = __importDefault(require("./styles"));
exports.TableRow = ({ classes, className, style, children, hover, selected, onClick }) => (react_1.default.createElement(TableRow_1.default, { classes: classes, className: className, style: style, hover: hover, selected: selected, onClick: onClick }, children));
exports.TableRow.defaultProps = {
    hover: false,
    selected: false
};
exports.TableRow.displayName = 'TableRow';
exports.default = styles_1.withStyles(styles_2.default)(exports.TableRow);
//# sourceMappingURL=TableRow.js.map