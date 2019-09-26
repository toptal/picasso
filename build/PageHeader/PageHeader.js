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
import React, { useContext, useLayoutEffect, forwardRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import { Logo, Container, Typography } from '../';
import { PageContext } from '../Page';
import { usePageHeader } from '../Picasso';
import { useBreakpoint } from '../utils';
import styles from './styles';
export const PageHeader = forwardRef(function PageHeader(_a, ref) {
    var { classes, className, style, title, logoLink, rightContent, actionItems, variant } = _a, rest = __rest(_a, ["classes", "className", "style", "title", "logoLink", "rightContent", "actionItems", "variant"]);
    const isSmallScreen = useBreakpoint('small');
    const { setHasPageHeader } = usePageHeader();
    useLayoutEffect(() => {
        setHasPageHeader(true);
        return function cleanup() {
            setHasPageHeader(false);
        };
    }, []);
    const { fullWidth } = useContext(PageContext);
    const logo = (React.createElement(Logo, { variant: 'white', emblem: isSmallScreen, className: classes.logo }));
    const titleComponent = title && (React.createElement(Container, { left: 'small', flex: true, alignItems: 'center' },
        React.createElement("div", { className: classes.divider }),
        React.createElement(Container, { left: 'small' },
            React.createElement(Typography, { invert: true, weight: 'light' }, title))));
    return (React.createElement("header", Object.assign({}, rest, { ref: ref, className: cx('mui-fixed', classes.root, classes[variant], className), style: style }),
        React.createElement("div", { className: cx({ [classes.fullWidth]: fullWidth }, classes.content) },
            React.createElement("div", { className: classes.left },
                React.createElement(Container, { className: classes.logoContainer, flex: true, alignItems: 'center' }, logoLink ? React.cloneElement(logoLink, {}, logo) : logo),
                !isSmallScreen && titleComponent),
            React.createElement("div", { className: classes.right },
                !isSmallScreen && actionItems,
                rightContent))));
});
PageHeader.defaultProps = {
    variant: 'light'
};
PageHeader.displayName = 'PageHeader';
export default withStyles(styles)(PageHeader);
//# sourceMappingURL=PageHeader.js.map