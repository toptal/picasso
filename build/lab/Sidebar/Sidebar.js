"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const classnames_1 = __importDefault(require("classnames"));
const Container_1 = __importDefault(require("../../Container"));
const SidebarMenu_1 = __importDefault(require("../SidebarMenu"));
const SidebarItem_1 = __importDefault(require("../SidebarItem"));
const styles_2 = __importDefault(require("./styles"));
exports.Sidebar = ({ children, className, style, classes }) => (react_1.default.createElement(Container_1.default, { flex: true, direction: 'column', style: style, className: classnames_1.default(classes.root, className) },
    react_1.default.createElement("div", { className: classes.spacer }),
    children));
exports.Sidebar.defaultProps = {};
exports.Sidebar.displayName = 'Sidebar';
exports.Sidebar.Menu = SidebarMenu_1.default;
exports.Sidebar.Item = SidebarItem_1.default;
exports.default = styles_1.withStyles(styles_2.default)(exports.Sidebar);
//# sourceMappingURL=Sidebar.js.map