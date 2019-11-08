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
import React, { forwardRef, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import Container from '../Container';
import styles from './styles';
import { useScreens } from '../utils';
import { PageContext } from '../Page/Page';
const useStyles = makeStyles(styles);
export const PageBanner = forwardRef(function PageBanner(props, ref) {
    const { className, style, children, variant, icon } = props, rest = __rest(props, ["className", "style", "children", "variant", "icon"]);
    const classes = useStyles(props);
    const screens = useScreens();
    const { fullWidth } = useContext(PageContext);
    const contentPadding = screens({
        small: 'xsmall',
        medium: 'xsmall'
    }, 'small');
    return (React.createElement(Container
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, className: cx(classes.root, className), style: style, variant: variant, flex: true }),
        React.createElement(Container, { variant: variant, className: cx({ [classes.fullWidth]: fullWidth }, classes.content), padded: contentPadding, flex: true },
            icon && (React.createElement(Container, { flex: true, alignItems: 'center', className: classes.iconWrapper }, icon)),
            children)));
});
PageBanner.defaultProps = {
    variant: 'yellow'
};
PageBanner.displayName = 'PageBanner';
export default PageBanner;
//# sourceMappingURL=PageBanner.js.map