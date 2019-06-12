"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const MenuList_1 = __importDefault(require("@material-ui/core/MenuList"));
const styles_1 = require("@material-ui/core/styles");
const MenuItem_1 = __importDefault(require("../MenuItem"));
const styles_2 = __importDefault(require("./styles"));
exports.Menu = ({ children, className, classes, style }) => {
    return (react_1.default.createElement(MenuList_1.default, { className: className, style: style, classes: classes }, children));
};
exports.Menu.displayName = 'Menu';
exports.Menu.Item = MenuItem_1.default;
exports.default = styles_1.withStyles(styles_2.default)(exports.Menu);
//# sourceMappingURL=Menu.js.map