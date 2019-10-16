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
import React, { forwardRef, Fragment, cloneElement } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import cx from 'classnames';
import { capitalize } from '@material-ui/core/utils/helpers';
import { CloseMinor16, Exclamation16 as Alert, CheckMinor16 as Tick, Info16 as Info } from '../Icon';
import Container from '../Container';
import Button from '../Button';
import styles from './styles';
import Typography from '../Typography';
import NotificationActions from '../NotificationActions';
const renderNotificationCloseButton = ({ onClose, classes: { close, closeIcon } }) => (React.createElement(Button, { circular: true, onClick: onClose, className: close, title: 'Close Notification', icon: React.createElement(CloseMinor16, { className: closeIcon }) }));
const renderNotificationIcon = ({ icon, variant, classes }) => {
    const iconProps = {
        className: classes.icon
    };
    // TODO: these are Icons required circular Icon bg color definitions, all Icons should be white on that color
    // Missing the following: https://github.com/toptal/picasso/issues/253
    switch (variant) {
        case 'red':
            // eslint-disable-next-line react/jsx-props-no-spreading
            return React.createElement(Alert, Object.assign({}, iconProps, { color: 'red' }));
        case 'yellow':
            // eslint-disable-next-line react/jsx-props-no-spreading
            return React.createElement(Alert, Object.assign({}, iconProps, { color: 'yellow' }));
        case 'green':
            // eslint-disable-next-line react/jsx-props-no-spreading
            return React.createElement(Tick, Object.assign({}, iconProps, { color: 'green' }));
        default:
            const infoProps = Object.assign(Object.assign({}, iconProps), { color: 'grey' });
            // eslint-disable-next-line react/jsx-props-no-spreading
            return icon ? cloneElement(icon, infoProps) : React.createElement(Info, Object.assign({}, infoProps));
    }
};
const renderNotificationContent = (props) => {
    const { classes: { iconWrapper, content, contentCloseButton }, children, onClose } = props;
    return (React.createElement(Fragment, null,
        React.createElement(Container, { flex: true, alignItems: 'center', className: iconWrapper }, renderNotificationIcon(props)),
        React.createElement(Typography, { size: 'medium', className: cx(content, {
                [contentCloseButton]: onClose
            }), as: 'div' }, children),
        onClose && renderNotificationCloseButton(props)));
};
// eslint-disable-next-line react/display-name
export const Notification = forwardRef(function Notification(props, ref) {
    const { className, classes, variant, elevated, fullWidth } = props, rest = __rest(props, ["className", "classes", "variant", "elevated", "fullWidth"]);
    return (React.createElement(SnackbarContent
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { className: cx(classes[`notification${capitalize(variant)}`], {
            [classes.notificationShadow]: elevated,
            [classes.notificationFullWidth]: fullWidth
        }, classes.notification, className), message: renderNotificationContent(props), ref: ref })));
});
Notification.defaultProps = {
    elevated: false,
    fullWidth: false,
    variant: 'white'
};
Notification.displayName = 'Notification';
Notification.Actions = NotificationActions;
export default withStyles(styles)(Notification);
//# sourceMappingURL=Notification.js.map