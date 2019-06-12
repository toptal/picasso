import React, { FunctionComponent, ReactNode, MouseEvent, ReactElement } from 'react';
import { StandardProps } from '../Picasso';
declare type VariantType = 'red' | 'green' | 'white' | 'yellow';
export interface Props extends StandardProps {
    /** Main content of the Notification */
    children: ReactNode;
    /** Callback invoked when close is clicked */
    onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
    /** Style variant of Notification */
    variant?: VariantType;
    /** Add <Icon /> before Notification content  */
    icon?: ReactElement;
    /** Enable elevated appearance for Notification */
    elevated?: boolean;
    /** Take the full width of a container */
    fullWidth?: boolean;
}
export declare const Notification: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "icon" | "children" | "fullWidth" | "className" | "variant" | "onClose" | "elevated"> & import("@material-ui/core/styles").StyledComponentProps<"content" | "notification" | "notificationShadow" | "notificationRed" | "notificationGreen" | "notificationWhite" | "notificationYellow" | "notificationFullWidth" | "contentCloseButton" | "iconWrapper" | "close" | "closeIcon">>;
export default _default;
