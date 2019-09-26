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
export const PageContent = forwardRef(function PageContent(_a, ref) {
    var { children, classes, className, style, flex } = _a, rest = __rest(_a, ["children", "classes", "className", "style", "flex"]);
    const { fullWidth } = useContext(PageContext);
    const innerClassName = cx({
        [classes.fullWidth]: fullWidth,
        [classes.flex]: flex
    }, classes.content);
    return (React.createElement("div", Object.assign({}, rest, { ref: ref, className: cx(classes.root, className), style: style }),
        React.createElement("div", { className: innerClassName }, children)));
});
PageContent.defaultProps = {
    flex: false // In Picasso v4 we want to make default value true
};
PageContent.displayName = 'PageContent';
export default withStyles(styles)(PageContent);
//# sourceMappingURL=PageContent.js.map