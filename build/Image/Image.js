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
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
export const Image = forwardRef(function Image(_a, ref) {
    var { src, srcSet, alt, classes, className, variant, style } = _a, rest = __rest(_a, ["src", "srcSet", "alt", "classes", "className", "variant", "style"]);
    return (React.createElement("img", Object.assign({}, rest, { ref: ref, src: src, srcSet: srcSet, alt: alt, className: cx({
            [classes.circular]: variant === 'circular'
        }, classes.root, className), style: style })));
});
Image.defaultProps = {
    variant: 'default'
};
Image.displayName = 'Image';
export default withStyles(styles)(Image);
//# sourceMappingURL=Image.js.map