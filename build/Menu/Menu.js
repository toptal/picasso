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
const MenuList_1 = __importDefault(require("@material-ui/core/MenuList"));
const styles_1 = require("@material-ui/core/styles");
const Icon_1 = require("../Icon");
const styles_2 = __importDefault(require("./styles"));
const Typography_1 = __importDefault(require("../Typography"));
const MenuItem_1 = __importDefault(require("../MenuItem"));
const menuContext_1 = __importDefault(require("./menuContext"));
// eslint-disable-next-line react/display-name
exports.Menu = react_1.forwardRef(function Menu(_a, ref) {
    var { children, className, classes, style, allowNestedNavigation } = _a, rest = __rest(_a, ["children", "className", "classes", "style", "allowNestedNavigation"]);
    const { backButtonIcon } = classes, restClasses = __rest(classes, ["backButtonIcon"]);
    const { pop } = react_1.useContext(menuContext_1.default);
    const hasParentMenu = !!pop;
    const handleBackClick = (event) => {
        event.stopPropagation();
        pop();
    };
    const menu = (react_1.default.createElement(MenuList_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, className: className, style: style, classes: restClasses }),
        hasParentMenu && allowNestedNavigation && (react_1.default.createElement(MenuItem_1.default, { onClick: handleBackClick, key: 'back' },
            react_1.default.createElement(Typography_1.default, { size: 'small', color: 'dark-grey', variant: 'body' },
                react_1.default.createElement(Icon_1.BackMinor16, { className: backButtonIcon }),
                "Back"))),
        children));
    const [menus, setMenus] = react_1.useState([menu]);
    if (hasParentMenu) {
        return menu;
    }
    const menuContext = {
        push: menu => setMenus([...menus, menu]),
        pop: () => setMenus(menus.slice(0, -1))
    };
    return (react_1.default.createElement(menuContext_1.default.Provider, { value: menuContext }, menus[menus.length - 1]));
});
exports.Menu.defaultProps = {
    allowNestedNavigation: true
};
exports.Menu.displayName = 'Menu';
exports.Menu.Item = MenuItem_1.default;
exports.default = styles_1.withStyles(styles_2.default)(exports.Menu);
//# sourceMappingURL=Menu.js.map