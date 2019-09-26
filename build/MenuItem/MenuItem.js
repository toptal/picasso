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
import React, { forwardRef, useContext } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MUIMenuItem from '@material-ui/core/MenuItem';
import { ChevronMinor16 } from '../Icon';
import MenuContext from '../Menu/menuContext';
import styles from './styles';
export const MenuItem = forwardRef(function MenuItem(_a, ref) {
    var { as, children, classes, className, disabled, disableGutters, menu, onClick, selected, style, value, variant } = _a, rest = __rest(_a, ["as", "children", "classes", "className", "disabled", "disableGutters", "menu", "onClick", "selected", "style", "value", "variant"]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { stringContent, light, dark } = classes, restClasses = __rest(classes, ["stringContent", "light", "dark"]);
    const { push } = useContext(MenuContext);
    if (typeof children === 'string') {
        children = (React.createElement("span", { className: stringContent, style: style }, children));
    }
    const handleClick = (event) => {
        if (menu) {
            event.stopPropagation();
            push(menu);
        }
        if (onClick) {
            onClick(event);
        }
    };
    return (React.createElement(MUIMenuItem
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, component: as, classes: restClasses, className: cx(classes[variant], className), disabled: disabled, disableGutters: disableGutters, onClick: handleClick, style: style, value: value, selected: selected }),
        children,
        menu && React.createElement(ChevronMinor16, null)));
});
MenuItem.defaultProps = {
    as: 'li',
    onClick: () => { },
    variant: 'light'
};
MenuItem.displayName = 'MenuItem';
export default withStyles(styles)(MenuItem);
//# sourceMappingURL=MenuItem.js.map