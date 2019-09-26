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
import PageHeader from '../PageHeader';
import PageHeaderMenu from '../PageHeaderMenu';
import PageFooter from '../PageFooter';
import PageContent from '../PageContent';
import PageSidebar from '../lab/Sidebar';
import styles from './styles';
export const PageContext = React.createContext({});
// eslint-disable-next-line react/display-name
export const Page = forwardRef(function Page(_a, ref) {
    var { children, classes, className, style, fullWidth } = _a, rest = __rest(_a, ["children", "classes", "className", "style", "fullWidth"]);
    return (React.createElement("div", Object.assign({}, rest, { ref: ref, className: cx(classes.root, className), style: style }),
        React.createElement(PageContext.Provider, { value: { fullWidth } }, children)));
});
Page.defaultProps = {
    fullWidth: false
};
Page.displayName = 'Page';
Page.Header = PageHeader;
Page.HeaderMenu = PageHeaderMenu;
Page.Content = PageContent;
Page.Footer = PageFooter;
Page.Sidebar = PageSidebar;
export default withStyles(styles)(Page);
//# sourceMappingURL=Page.js.map