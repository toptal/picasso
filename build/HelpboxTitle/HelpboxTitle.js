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
import styles from './styles';
import Container from '../Container';
import Typography from '../Typography';
export const HelpboxTitle = forwardRef(function HelpboxTitle(_a, ref) {
    var { classes, className, style, children } = _a, rest = __rest(_a, ["classes", "className", "style", "children"]);
    return (React.createElement(Container
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, classes: classes, className: className, style: style, bottom: 'medium' }),
        React.createElement(Typography, { variant: 'heading', size: 'small' }, children)));
});
HelpboxTitle.defaultProps = {};
HelpboxTitle.displayName = 'HelpboxTitle';
export default withStyles(styles)(HelpboxTitle);
//# sourceMappingURL=HelpboxTitle.js.map