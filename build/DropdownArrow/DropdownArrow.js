"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const classnames_1 = __importDefault(require("classnames"));
const styles_2 = __importDefault(require("./styles"));
exports.DropdownArrow = ({ classes, className, style }) => {
    return react_1.default.createElement("span", { className: classnames_1.default(classes.root, className), style: style });
};
exports.DropdownArrow.displayName = 'DropdownArrow';
exports.default = styles_1.withStyles(styles_2.default)(exports.DropdownArrow);
//# sourceMappingURL=DropdownArrow.js.map