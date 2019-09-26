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
import styles from './styles';
export const FormLabel = forwardRef(function FormLabel(_a, ref) {
    var { children, required, disabled, htmlFor, classes, className, style, inline, as: Component = 'label' } = _a, rest = __rest(_a, ["children", "required", "disabled", "htmlFor", "classes", "className", "style", "inline", "as"]);
    const isInline = inline || Component === 'span';
    return (React.createElement(Component
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, htmlFor: htmlFor, className: cx(classes.root, {
            [classes.disabled]: disabled,
            [classes.inline]: isInline
        }, className), style: style }),
        required && React.createElement("span", { className: classes.asterisk }, "*"),
        React.createElement("span", { className: classes.text }, children)));
});
FormLabel.defaultProps = {
    as: 'label',
    inline: false
};
FormLabel.displayName = 'FormLabel';
export default withStyles(styles)(FormLabel);
//# sourceMappingURL=FormLabel.js.map