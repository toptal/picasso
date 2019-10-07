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
import cx from 'classnames';
import { BackMinor16 } from '../Icon';
import styles from './styles';
import Typography from '../Typography';
import MenuItem from '../MenuItem';
import MenuContext from './menuContext';
// eslint-disable-next-line react/display-name
export const Menu = forwardRef(function Menu(_a, ref) {
    var { children, className, classes, style, allowNestedNavigation } = _a, rest = __rest(_a, ["children", "className", "classes", "style", "allowNestedNavigation"]);
    const { backButtonIcon, hideMenu } = classes, restClasses = __rest(classes, ["backButtonIcon", "hideMenu"]);
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
    const [menus, setMenus] = useState({});
    const menusKeys = Object.keys(menus);
    const getLastKey = () => menusKeys[menusKeys.length - 1];
    if (hasParentMenu) {
        return menu;
    }
    const menuContext = {
        push: (key, menu) => setMenus(Object.assign(Object.assign({}, menus), { [key]: menu })),
        pop: () => {
            const key = getLastKey();
            if (!key) {
                return;
            }
            const newMenus = Object.assign({}, menus);
            delete newMenus[key];
            setMenus(newMenus);
        },
        refresh: (key, menu) => {
            if (!menus[key]) {
                return;
            }
            setMenus(Object.assign(Object.assign({}, menus), { [key]: menu }));
        }
    };
    const currentVisibleMenuKey = getLastKey();
    const isRootMenuHidden = Boolean(currentVisibleMenuKey);
    return (React.createElement(MenuContext.Provider, { value: menuContext },
        React.cloneElement(menu, {
            className: cx(menu.props.className, { [hideMenu]: isRootMenuHidden })
        }),
        menusKeys.map((menuKey) => React.cloneElement(menus[menuKey], {
            className: cx(menus[menuKey].props.className, {
                [hideMenu]: menuKey !== currentVisibleMenuKey
            })
        }))));
});
Menu.defaultProps = {
    allowNestedNavigation: true
};
Menu.displayName = 'Menu';
Menu.Item = MenuItem;
export default withStyles(styles)(Menu);
//# sourceMappingURL=Menu.js.map