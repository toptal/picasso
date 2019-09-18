"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
const Typography_1 = __importDefault(require("../../Typography"));
const MenuItem_1 = __importDefault(require("../../MenuItem/MenuItem"));
const Accordion_1 = __importDefault(require("../../Accordion"));
const Icon_1 = require("../../Icon");
const Sidebar_1 = require("../Sidebar");
const styles_2 = __importDefault(require("./styles"));
exports.SidebarItem = react_1.forwardRef(function SidebarItem(_a, ref) {
    var { children, icon, selected, collapsible, menu, disabled, classes, className, style, onClick, as } = _a, rest = __rest(_a, ["children", "icon", "selected", "collapsible", "menu", "disabled", "classes", "className", "style", "onClick", "as"]);
    const hasIcon = Boolean(icon);
    const hasMenu = Boolean(menu);
    const { variant } = react_1.useContext(Sidebar_1.SidebarContext);
    const handleMenuItemClick = (event) => {
        if (!hasMenu) {
            onClick(event);
        }
    };
    const resolvedChildren = typeof children === 'string' ? (react_1.default.createElement(Typography_1.default, { className: classes.labelContent, color: 'inherit', size: 'medium', noWrap: true }, children)) : (children);
    const menuItem = (react_1.default.createElement(MenuItem_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { as: as, ref: ref, style: style, className: classnames_1.default(classes.root, classes.noWrap, classes[variant], { [classes.selected]: !hasMenu && selected }, className), onClick: handleMenuItemClick, selected: !hasMenu && selected, disabled: disabled, variant: variant }),
        react_1.default.createElement(Container_1.default, { className: classes.noWrap, inline: true, flex: true, alignItems: 'center' },
            icon,
            react_1.default.createElement(Container_1.default, { className: classnames_1.default(classes.label, classes.noWrap, {
                    [classes.withIcon]: hasIcon
                }), flex: true, alignItems: 'center' }, resolvedChildren))));
    if (hasMenu && collapsible) {
        const menuChildren = react_1.default.Children.toArray(menu.props.children);
        const defaultExpanded = menuChildren.find((menuChild) => menuChild.props.selected) !== undefined;
        return (react_1.default.createElement(Accordion_1.default, { onChange: event => event.stopPropagation(), classes: {
                summary: classes.summary,
                details: classes.details,
                content: classes.content
            }, content: menu, bordered: false, disabled: disabled, defaultExpanded: defaultExpanded, 
            // @ts-ignore
            expandIcon: react_1.default.createElement(Icon_1.ArrowDropDown16, { className: classnames_1.default(classes.expandIcon, classes[`${variant}ExpandIcon`], {
                    [classes.expandIconDisabled]: disabled
                }) }) }, menuItem));
    }
    return (react_1.default.createElement(react_1.Fragment, null,
        menuItem,
        hasMenu && react_1.default.createElement("div", { className: classes.nonCollapsibleMenu }, menu)));
});
exports.SidebarItem.defaultProps = {
    collapsible: false,
    onClick: () => { },
    selected: false
};
exports.SidebarItem.displayName = 'SidebarItem';
exports.default = styles_1.withStyles(styles_2.default)(exports.SidebarItem);
//# sourceMappingURL=SidebarItem.js.map