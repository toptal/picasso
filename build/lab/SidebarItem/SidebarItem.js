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
import React, { forwardRef, Fragment, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import Container from '../../Container';
import Typography from '../../Typography';
import MenuItem from '../../MenuItem/MenuItem';
import Accordion from '../../Accordion';
import { ArrowDropDown16 } from '../../Icon';
import { SidebarContext } from '../Sidebar';
import styles from './styles';
const useStyles = makeStyles(styles);
export const SidebarItem = forwardRef(function SidebarItem(props, ref) {
    const classes = useStyles(props);
    const { children, icon, selected, collapsible, menu, disabled, className, style, onClick, as } = props, rest = __rest(props, ["children", "icon", "selected", "collapsible", "menu", "disabled", "className", "style", "onClick", "as"]);
    const hasIcon = Boolean(icon);
    const hasMenu = Boolean(menu);
    const { variant } = useContext(SidebarContext);
    const handleMenuItemClick = (event) => {
        if (!hasMenu) {
            onClick(event);
        }
    };
    const resolvedChildren = typeof children === 'string' ? (React.createElement(Typography, { className: classes.labelContent, color: 'inherit', size: 'medium', noWrap: true }, children)) : (children);
    const menuItem = (React.createElement(MenuItem
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { as: as, ref: ref, style: style, className: cx(classes.root, classes.noWrap, classes[variant], { [classes.selected]: !hasMenu && selected }, className), onClick: handleMenuItemClick, selected: !hasMenu && selected, disabled: disabled, variant: variant }),
        React.createElement(Container, { className: classes.noWrap, inline: true, flex: true, alignItems: 'center' },
            icon,
            React.createElement(Container, { className: cx(classes.label, classes.noWrap, {
                    [classes.withIcon]: hasIcon
                }), flex: true, alignItems: 'center' }, resolvedChildren))));
    if (hasMenu && collapsible) {
        const menuChildren = React.Children.toArray(menu.props.children);
        const defaultExpanded = menuChildren.find((menuChild) => menuChild.props.selected) !== undefined;
        return (React.createElement(Accordion, { onChange: event => event.stopPropagation(), classes: {
                summary: classes.summary,
                details: classes.details,
                content: classes.content
            }, content: menu, bordered: false, disabled: disabled, defaultExpanded: defaultExpanded, expandIcon: React.createElement(ArrowDropDown16, { className: cx(classes.expandIcon, classes[`${variant}ExpandIcon`], {
                    [classes.expandIconDisabled]: disabled
                }) }) }, menuItem));
    }
    return (React.createElement(Fragment, null,
        menuItem,
        hasMenu && React.createElement("div", { className: classes.nonCollapsibleMenu }, menu)));
});
SidebarItem.defaultProps = {
    collapsible: false,
    onClick: () => { },
    selected: false
};
SidebarItem.displayName = 'SidebarItem';
export default SidebarItem;
//# sourceMappingURL=SidebarItem.js.map