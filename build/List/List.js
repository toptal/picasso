"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const List_1 = __importDefault(require("@material-ui/core/List"));
const styles_2 = __importDefault(require("./styles"));
const List = ({ classes, className, style }) => (react_1.default.createElement(List_1.default, { classes: classes, className: className, style: style }));
exports.default = styles_1.withStyles(styles_2.default)(List);
//# sourceMappingURL=List.js.map