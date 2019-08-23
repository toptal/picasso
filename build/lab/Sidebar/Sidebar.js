"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const styles_1 = require("@material-ui/core/styles");
const classnames_1 = __importDefault(require("classnames"));
const Container_1 = __importDefault(require("../../Container"));
const SidebarMenu_1 = __importDefault(require("../SidebarMenu"));
const SidebarItem_1 = __importDefault(require("../SidebarItem"));
const SidebarLogo_1 = __importDefault(require("../SidebarLogo"));
const styles_2 = __importDefault(require("./styles"));
exports.SidebarContext = react_1.default.createContext({});
// eslint-disable-next-line react/display-name
exports.Sidebar = react_1.forwardRef(function Sidebar({ children, variant, className, style, classes }, ref) {
    return (react_1.default.createElement(Container_1.default, { ref: ref, flex: true, direction: 'column', style: style, className: classnames_1.default(classes.root, className, classes[variant]) },
        react_1.default.createElement("div", { className: classes.spacer }),
        react_1.default.createElement(exports.SidebarContext.Provider, { value: { variant } }, children)));
});
exports.Sidebar.defaultProps = {
    variant: 'light'
};
exports.Sidebar.displayName = 'Sidebar';
exports.Sidebar.Menu = SidebarMenu_1.default;
exports.Sidebar.Item = SidebarItem_1.default;
exports.Sidebar.Logo = SidebarLogo_1.default;
exports.default = styles_1.withStyles(styles_2.default)(exports.Sidebar);
//# sourceMappingURL=Sidebar.js.map