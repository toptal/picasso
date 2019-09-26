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
import UserBadge from '../UserBadge';
import Typography from '../Typography';
import Menu from '../Menu';
import Link from '../Link';
import Container from '../Container';
import { ChevronRight16 } from '../Icon';
import styles from './styles';
export const AccountSelect = forwardRef(function AccountSelect(_a, ref) {
    var { classes, className, accounts, onSelect, style } = _a, rest = __rest(_a, ["classes", "className", "accounts", "onSelect", "style"]);
    const { accountItem: accountItemClass, accountLink: accountLinkClass } = classes, menuClasses = __rest(classes, ["accountItem", "accountLink"]);
    return (React.createElement(Menu
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, classes: menuClasses, className: className, style: style }), accounts.map(account => (React.createElement(Menu.Item, { disableGutters: true, className: accountItemClass, key: `role-${account.id}` },
        React.createElement(Link, { className: accountLinkClass, href: account.href, onClick: () => onSelect(account), underline: 'none' },
            React.createElement(Container, { padded: 'medium', flex: true, direction: 'row', alignItems: 'center', justifyContent: 'space-between' },
                React.createElement(UserBadge, { name: account.name, avatar: account.avatar },
                    React.createElement(Typography, { size: 'small' }, account.position)),
                React.createElement(ChevronRight16, { color: 'dark-grey' }))))))));
});
AccountSelect.defaultProps = {
    onSelect: () => { }
};
AccountSelect.displayName = 'AccountSelect';
export default withStyles(styles)(AccountSelect);
//# sourceMappingURL=AccountSelect.js.map