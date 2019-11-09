import React from 'react';
import { SnackbarProvider } from 'notistack';
import { usePageHeader } from '../../Picasso';
import { headerHeight } from '../../PageHeader/styles';
const MAX_NOTIFICATION_MESSAGES = 5;
const NotificationsProvider = ({ children }) => {
    const { hasPageHeader } = usePageHeader();
    return (React.createElement(SnackbarProvider, { maxSnack: MAX_NOTIFICATION_MESSAGES, style: hasPageHeader ? { marginTop: headerHeight.default } : undefined }, children));
};
export default NotificationsProvider;
//# sourceMappingURL=NotificationsProvider.js.map