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
const Button_1 = __importDefault(require("../../Button"));
const Dropdown_1 = __importDefault(require("../../Dropdown"));
const Icon_1 = require("../../Icon");
const utils_1 = require("../../utils");
const SidebarMenu_1 = __importDefault(require("../SidebarMenu"));
const SidebarItem_1 = __importDefault(require("../SidebarItem"));
const SidebarLogo_1 = __importDefault(require("../SidebarLogo"));
const styles_2 = __importDefault(require("./styles"));
const SmallScreenSidebarWrapper = ({ classes, children }) => {
    const [showSidebar, setShowSidebar] = react_1.useState(false);
    const handleShowSidebar = () => setShowSidebar(true);
    const handleHideSidebar = () => setShowSidebar(false);
    return (react_1.default.createElement(Dropdown_1.default, { content: children, className: classes.responsiveWrapper, offset: { top: 'xsmall' }, onOpen: handleShowSidebar, onClose: handleHideSidebar },
        react_1.default.createElement(Button_1.default, { icon: showSidebar ? react_1.default.createElement(Icon_1.Close16, null) : react_1.default.createElement(Icon_1.Overview16, null), circular: true, variant: 'flat-white' })));
};
exports.SidebarContext = react_1.default.createContext({});
// eslint-disable-next-line react/display-name
exports.Sidebar = react_1.forwardRef(function Sidebar({ children, variant, className, style, classes }, ref) {
    const isSmallScreen = utils_1.useBreakpoint('small');
    const sidebar = (react_1.default.createElement(Container_1.default, { ref: ref, flex: true, direction: 'column', style: style, className: classnames_1.default(classes.root, className, classes[variant]) },
        react_1.default.createElement("div", { className: classes.spacer }),
        react_1.default.createElement(exports.SidebarContext.Provider, { value: { variant } }, children)));
    return isSmallScreen ? (react_1.default.createElement(SmallScreenSidebarWrapper, { classes: classes }, sidebar)) : (sidebar);
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