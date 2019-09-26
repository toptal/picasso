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
import Avatar from '../Avatar';
import Typography from '../Typography';
import Container from '../Container';
import styles from './styles';
export const UserBadge = forwardRef(function UserBadge(_a, ref) {
    var { avatar, name, size, title, invert, center, children, classes, className, style } = _a, rest = __rest(_a, ["avatar", "name", "size", "title", "invert", "center", "children", "classes", "className", "style"]);
    const UserBadgeAvatar = React.isValidElement(avatar) ? (avatar) : (React.createElement(Avatar, { className: classes.avatar, name: name, size: size, src: avatar }));
    // if 'auto' then center if children are null
    const shouldCenter = center === true || (center === 'auto' && !children);
    const alignItems = shouldCenter ? 'center' : 'flex-start';
    const userTitle = title && (React.createElement(Typography, { inline: true, invert: invert, className: classes.title, size: 'medium' }, title));
    return (React.createElement(Container
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, flex: true, alignItems: alignItems, className: cx(classes.root, className), style: style }),
        UserBadgeAvatar,
        React.createElement(Container, { flex: true, direction: 'column', left: 'small' },
            React.createElement(Container, null,
                React.createElement(Typography, { className: classes.name, inline: true, variant: 'heading', size: 'small', invert: invert }, name),
                userTitle),
            children)));
});
UserBadge.defaultProps = {
    center: 'auto',
    invert: false,
    size: 'xsmall'
};
UserBadge.displayName = 'UserBadge';
export default withStyles(styles)(UserBadge);
//# sourceMappingURL=UserBadge.js.map