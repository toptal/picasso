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
import MUILink from '@material-ui/core/Link';
import cx from 'classnames';
import { makeStyles } from '@material-ui/styles';
import styles from './styles';
const useStyles = makeStyles(styles);
export const Link = forwardRef(function Link(props, ref) {
    const { href, underline, onClick, children, className, color, style, as, variant, tabIndex, invert } = props, rest = __rest(props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    , ["href", "underline", "onClick", "children", "className", "color", "style", "as", "variant", "tabIndex", "invert"]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const nativeHTMLAttributes = __rest(rest, []);
    const classes = useStyles(props);
    let fontColor = color;
    if (invert) {
        fontColor = 'white';
        // eslint-disable-next-line no-console
        console.log('Please stop using `invert` it will be removed in next major release. Use color=white instead.');
    }
    return (React.createElement(MUILink
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, nativeHTMLAttributes, { ref: ref, href: href, underline: underline, onClick: onClick, className: cx(classes.root, className, {
            [classes.action]: variant === 'action',
            [classes.white]: fontColor === 'white',
            [classes.black]: fontColor === 'black'
        }), style: style, component: as, tabIndex: tabIndex }), children));
});
Link.defaultProps = {
    as: 'a',
    color: 'blue',
    variant: 'default'
};
Link.displayName = 'Link';
export default Link;
//# sourceMappingURL=Link.js.map