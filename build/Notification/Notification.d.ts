import { ReactNode, MouseEvent, ReactElement, HTMLAttributes } from 'react';
import { StandardProps, PicassoComponentWithRef, CompoundedComponentWithRef } from '../Picasso';
import NotificationActions from '../NotificationActions';
export declare type VariantType = 'red' | 'green' | 'white' | 'yellow';
export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
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
interface StaticProps {
    Actions: typeof NotificationActions;
}
export declare const Notification: CompoundedComponentWithRef<Props, HTMLElement, StaticProps>;
declare const _default: PicassoComponentWithRef<Props, HTMLElement, StaticProps>;
export default _default;
