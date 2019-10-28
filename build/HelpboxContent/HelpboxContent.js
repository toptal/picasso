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
import Typography from '../Typography';
import styles from './styles';
export const HelpboxContent = forwardRef(function HelpboxContent(_a, ref) {
    var { classes, className, style, children } = _a, rest = __rest(_a, ["classes", "className", "style", "children"]);
    return (React.createElement(Typography
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, classes: classes, className: className, style: style, variant: 'body', as: 'div', size: 'medium', color: 'dark-grey' }), children));
});
HelpboxContent.defaultProps = {};
HelpboxContent.displayName = 'HelpboxContent';
export default withStyles(styles)(HelpboxContent);
//# sourceMappingURL=HelpboxContent.js.map