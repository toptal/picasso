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
import MUITypography from '@material-ui/core/Typography';
import cx from 'classnames';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const VARIANTS = {
    heading: {
        small: 'h4',
        medium: 'h3',
        large: 'h2',
        xlarge: 'h1'
    },
    body: {
        small: 'body1',
        medium: 'body1',
        large: 'body1',
        inherit: 'body1'
    }
};
export const Typography = forwardRef(function Typography(_a, ref) {
    var { variant, children, size, align, className, classes, style, inline, as, weight, color, invert, noWrap } = _a, rest = __rest(_a, ["variant", "children", "size", "align", "className", "classes", "style", "inline", "as", "weight", "color", "invert", "noWrap"]);
    const resolvedVariant = VARIANTS[variant][size];
    const variantClassName = kebabToCamelCase(`${variant}-${size}`);
    const colorClassName = kebabToCamelCase(`${color}`);
    const rootClass = cx({
        [classes.invert]: invert
    }, classes[variantClassName], classes[weight], classes[colorClassName]);
    return (React.createElement(MUITypography
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, align: align, className: className, classes: {
            root: rootClass
        }, style: style, variant: resolvedVariant, display: inline ? 'inline' : 'initial', component: as, noWrap: noWrap }), children));
});
Typography.defaultProps = {
    inline: false,
    noWrap: false,
    size: 'inherit',
    variant: 'body'
};
Typography.displayName = 'Typography';
export default withStyles(styles)(Typography);
//# sourceMappingURL=Typography.js.map