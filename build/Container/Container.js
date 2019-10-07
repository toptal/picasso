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
import { withStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import { spacingToEm } from '../Picasso';
import styles from './styles';
/**
 * Container component used for spacing 2 elements
 */
export const Container = forwardRef(function Container(_a, ref) {
    var { children, className, top, bottom, left, right, padded, inline, flex, direction, alignItems, justifyContent, style, bordered = false, variant, classes, as: Component = inline ? 'span' : 'div' } = _a, rest = __rest(_a, ["children", "className", "top", "bottom", "left", "right", "padded", "inline", "flex", "direction", "alignItems", "justifyContent", "style", "bordered", "variant", "classes", "as"]);
    const margins = Object.assign(Object.assign(Object.assign(Object.assign({}, (top && { marginTop: spacingToEm(top) })), (bottom && { marginBottom: spacingToEm(bottom) })), (left && { marginLeft: spacingToEm(left) })), (right && { marginRight: spacingToEm(right) }));
    return (React.createElement(Component
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, className: cx(classes[`${variant}Variant`], {
            [classes[`${padded}Padding`]]: typeof padded === 'string',
            [classes.bordered]: bordered,
            [classes.flex]: flex,
            [classes.inline]: inline,
            [classes.column]: direction === 'column'
        }, className), style: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, margins), (alignItems && { alignItems })), (justifyContent && { justifyContent })), (typeof padded === 'number' && { padding: spacingToEm(padded) })), style) }), children));
});
Container.displayName = 'Container';
Container.defaultProps = {
    as: 'div',
    inline: false
};
export default withStyles(styles)(Container);
//# sourceMappingURL=Container.js.map