import React, { forwardRef } from 'react';
import cx from 'classnames';
import { useSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import PicassoNotification from '../../Notification';
import styles from './styles';
const defaultPosition = {
    vertical: 'top',
    horizontal: 'right'
};
const StyledNotification = withStyles(styles)(
// eslint-disable-next-line react/display-name
forwardRef(function Notification({ content, icon, key, onClose, variant = 'white', classes }, ref) {
    return (React.createElement(PicassoNotification, { variant: variant, elevated: true, icon: icon, key: key, onClose: onClose, className: cx({
            [classes.generalNotification]: variant === 'white',
            [classes.formNotification]: variant !== 'white'
        }), ref: ref }, content));
}));
export const useNotifications = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const getNotification = (variant) => (content, icon, options) => {
        const closeNotification = () => {
            if (!notificationId) {
                return;
            }
            closeSnackbar(notificationId);
        };
        const notificationId = enqueueSnackbar('', Object.assign({ anchorOrigin: defaultPosition, 
            // eslint-disable-next-line react/display-name
            children: (key) => (React.createElement(StyledNotification, { content: content, icon: icon, key: key, variant: variant, onClose: closeNotification })) }, options));
        return notificationId;
    };
    const showCustomNotification = (Content, position, options) => enqueueSnackbar('', Object.assign({ anchorOrigin: position || defaultPosition, 
        // eslint-disable-next-line react/display-name
        children: (key) => React.cloneElement(Content, { key }) }, options));
    return {
        showError: getNotification('red'),
        showInfo: getNotification(),
        showSuccess: getNotification('green'),
        showCustomNotification: showCustomNotification,
        closeNotification: closeSnackbar
    };
};
//# sourceMappingURL=use-notifications.js.map