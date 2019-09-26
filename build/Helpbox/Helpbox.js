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
import Container from '../Container';
import HelpboxTitle from '../HelpboxTitle';
import HelpboxContent from '../HelpboxContent';
import HelpboxActions from '../HelpboxActions';
import { Close16 } from '../Icon';
import Button from '../Button';
import styles from './styles';
export const HelpboxContext = React.createContext({});
// eslint-disable-next-line react/display-name
export const Helpbox = forwardRef(function Helpbox(_a, ref) {
    var { classes, className, style, children, variant, onClose } = _a, rest = __rest(_a, ["classes", "className", "style", "children", "variant", "onClose"]);
    return (React.createElement(Container
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, className: cx(classes.root, className), style: style, bordered: true, variant: variant, padded: 'large' }),
        React.createElement(HelpboxContext.Provider, { value: { closeable: Boolean(onClose) } }, children),
        onClose && (React.createElement(Button, { className: classes.closeButton, circular: true, onClick: onClose, icon: React.createElement(Close16, { color: 'dark-grey' }) }))));
});
Helpbox.defaultProps = {};
Helpbox.displayName = 'Helpbox';
Helpbox.Title = HelpboxTitle;
Helpbox.Content = HelpboxContent;
Helpbox.Actions = HelpboxActions;
export default withStyles(styles)(Helpbox);
//# sourceMappingURL=Helpbox.js.map