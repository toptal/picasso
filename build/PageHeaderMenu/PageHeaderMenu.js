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
import React, { forwardRef, Fragment } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { useBreakpoint } from '../utils';
import UserBadge from '../UserBadge';
import Avatar from '../Avatar';
import Dropdown from '../Dropdown';
import Typography from '../Typography';
import styles from './styles';
export const PageHeaderMenu = forwardRef(function PageHeaderMenu(_a, ref) {
    var { name, meta, avatar, classes, className, style, children } = _a, rest = __rest(_a, ["name", "meta", "avatar", "classes", "className", "style", "children"]);
    const isCompactLayout = useBreakpoint(['small', 'medium']);
    const metaContent = typeof meta === 'string' ? (React.createElement(Typography, { className: classes.truncateText, invert: true, size: 'small' }, meta)) : (meta);
    const content = isCompactLayout ? (React.createElement(Fragment, null,
        React.createElement(UserBadge, { center: true, size: 'xsmall', classes: {
                root: classes.contentUserBadge,
                avatar: classes.avatar,
                name: cx(classes.name, classes.truncateText)
            }, name: name, avatar: avatar }, meta && metaContent),
        children)) : (children);
    const trigger = isCompactLayout ? (React.createElement(Avatar, { size: 'xsmall', classes: {
            root: classes.avatar,
            xsmall: classes.xsmall
        }, src: avatar })) : (React.createElement(UserBadge, { invert: true, center: true, size: 'xsmall', classes: {
            avatar: classes.avatar,
            name: cx(classes.name, classes.truncateText)
        }, name: name, avatar: avatar }, meta && metaContent));
    return (React.createElement(Dropdown
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, className: cx(classes.root, className), classes: { content: classes.content }, style: style, content: content, offset: { top: isCompactLayout ? 0.8 : 'xsmall' } }),
        trigger,
        React.createElement(Dropdown.Arrow, { className: classes.arrow })));
});
PageHeaderMenu.defaultProps = {};
PageHeaderMenu.displayName = 'PageHeaderMenu';
export default withStyles(styles)(PageHeaderMenu);
//# sourceMappingURL=PageHeaderMenu.js.map