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
import FormHint from '../FormHint';
import FormError from '../FormError';
import styles from './styles';
export const FormField = forwardRef(function FormField(_a, ref) {
    var { classes, className, style, hint, children, error } = _a, rest = __rest(_a, ["classes", "className", "style", "hint", "children", "error"]);
    return (React.createElement("div", Object.assign({}, rest, { ref: ref, className: cx(classes.root, className), style: style }),
        children,
        error && React.createElement(FormError, { className: classes.error }, error),
        hint && React.createElement(FormHint, { className: classes.hint }, hint)));
});
FormField.defaultProps = {};
FormField.displayName = 'FormField';
export default withStyles(styles)(FormField);
//# sourceMappingURL=FormField.js.map