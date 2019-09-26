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
import React, { useContext, forwardRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import { PageContext } from '../Page';
import styles from './styles';
const currentYear = new Date().getFullYear();
export const PageFooter = forwardRef(function PageFooter(_a, ref) {
    var { classes, className, style, rightContent } = _a, rest = __rest(_a, ["classes", "className", "style", "rightContent"]);
    const { fullWidth } = useContext(PageContext);
    const contentClassnames = cx({
        [classes.fullWidth]: fullWidth
    }, classes.content);
    return (React.createElement("footer", Object.assign({}, rest, { ref: ref, className: cx(classes.root, className), style: style }),
        React.createElement("div", { className: contentClassnames },
            React.createElement("div", { className: classes.left }, `© Copyright 2010 – ${currentYear} Toptal, LLC`),
            React.createElement("div", { className: classes.right }, rightContent))));
});
PageFooter.defaultProps = {
    rightContent: null
};
PageFooter.displayName = 'PageFooter';
export default withStyles(styles)(PageFooter);
//# sourceMappingURL=PageFooter.js.map