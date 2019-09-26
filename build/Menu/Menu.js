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
import React, { forwardRef, useState, useContext } from 'react';
import MUIMenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import { BackMinor16 } from '../Icon';
import styles from './styles';
import Typography from '../Typography';
import MenuItem from '../MenuItem';
import MenuContext from './menuContext';
// eslint-disable-next-line react/display-name
export const Menu = forwardRef(function Menu(_a, ref) {
    var { children, className, classes, style, allowNestedNavigation } = _a, rest = __rest(_a, ["children", "className", "classes", "style", "allowNestedNavigation"]);
    const { backButtonIcon } = classes, restClasses = __rest(classes, ["backButtonIcon"]);
    const { pop } = useContext(MenuContext);
    const hasParentMenu = !!pop;
    const handleBackClick = (event) => {
        event.stopPropagation();
        pop();
    };
    const menu = (React.createElement(MUIMenuList
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, className: className, style: style, classes: restClasses }),
        hasParentMenu && allowNestedNavigation && (React.createElement(MenuItem, { onClick: handleBackClick, key: 'back' },
            React.createElement(Typography, { size: 'small', color: 'dark-grey', variant: 'body' },
                React.createElement(BackMinor16, { className: backButtonIcon }),
                "Back"))),
        children));
    const [menus, setMenus] = useState([menu]);
    if (hasParentMenu) {
        return menu;
    }
    const menuContext = {
        push: menu => setMenus([...menus, menu]),
        pop: () => setMenus(menus.slice(0, -1))
    };
    return (React.createElement(MenuContext.Provider, { value: menuContext }, menus.length === 1 ? menu : menus[menus.length - 1]));
});
Menu.defaultProps = {
    allowNestedNavigation: true
};
Menu.displayName = 'Menu';
Menu.Item = MenuItem;
export default withStyles(styles)(Menu);
//# sourceMappingURL=Menu.js.map