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
import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Loader from '../Loader';
import Container from '../Container';
import Group from '../ButtonGroup';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const getVariantType = (variant) => {
    const [type] = variant.split('-');
    return type;
};
export const Button = forwardRef(function Button(_a, ref) {
    var { icon, iconPosition, loading, children, classes, className, style, fullWidth, variant, size, focused, hovered, disabled, active, onClick, circular, title, value, type, as } = _a, rest = __rest(_a, ["icon", "iconPosition", "loading", "children", "classes", "className", "style", "fullWidth", "variant", "size", "focused", "hovered", "disabled", "active", "onClick", "circular", "title", "value", "type", "as"]);
    const { icon: iconClass, iconLeft: iconLeftClass, iconRight: iconRightClass, iconSmall: iconSmallClass, root: rootClass, hidden: hiddenClass, loader: loaderClass, content: contentClass } = classes;
    let finalChildren = [children];
    if (icon) {
        const iconComponent = React.cloneElement(icon, {
            className: cx(iconClass, icon.props.className, {
                [iconLeftClass]: children && iconPosition === 'left',
                [iconRightClass]: children && iconPosition === 'right',
                [iconSmallClass]: size === 'small'
            }),
            key: 'button-icon',
            base: size === 'small' ? '12' : undefined
        });
        if (iconPosition === 'left') {
            finalChildren.unshift(iconComponent);
        }
        else {
            finalChildren.push(iconComponent);
        }
    }
    const variantType = getVariantType(variant);
    const variantClassName = disabled
        ? classes[`${variantType}Disabled`]
        : classes[kebabToCamelCase(variant)];
    const sizeClassName = classes[size];
    const rootClassName = cx({
        [classes.fullWidth]: fullWidth,
        [classes.active]: active,
        [classes.focused]: focused,
        [classes.hovered]: hovered,
        [classes.circular]: circular
    }, sizeClassName, variantClassName, rootClass);
    return (React.createElement(ButtonBase
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, classes: {
            root: rootClassName
        }, onClick: onClick, className: className, style: style, disabled: disabled, title: title, value: value, type: type, component: as }),
        React.createElement(Container, { as: 'span', inline: true, flex: true, direction: 'row', alignItems: 'center', className: cx({ [hiddenClass]: loading }, contentClass) }, finalChildren),
        loading && (React.createElement(Loader, { variant: 'inherit', className: loaderClass, inline: true, size: 'small' }))));
});
Button.defaultProps = {
    active: false,
    as: 'button',
    children: null,
    circular: false,
    disabled: false,
    focused: false,
    fullWidth: false,
    hovered: false,
    iconPosition: 'left',
    loading: false,
    onClick: () => { },
    size: 'medium',
    type: 'button',
    variant: 'primary-blue'
};
Button.displayName = 'Button';
Button.Group = Group;
export default withStyles(styles)(Button);
//# sourceMappingURL=Button.js.map