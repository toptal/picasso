import React from 'react';
import { OptionsObject } from 'notistack';
import { SnackbarOrigin } from '@material-ui/core/Snackbar';
export declare const useNotifications: () => {
    showError: (content: React.ReactNode, icon?: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined, options?: OptionsObject | undefined) => string | number | null | undefined;
    showInfo: (content: React.ReactNode, icon?: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined, options?: OptionsObject | undefined) => string | number | null | undefined;
    showSuccess: (content: React.ReactNode, icon?: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined, options?: OptionsObject | undefined) => string | number | null | undefined;
    showCustomNotification: (Content: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>, position?: SnackbarOrigin | undefined, options?: OptionsObject | undefined) => string | number | null | undefined;
    closeNotification: (key?: string | number | undefined) => void;
};
