import { FunctionComponent, ReactNode, HTMLAttributes } from 'react';
import { PaperProps } from '@material-ui/core/Paper';
import ModalTitle from '../ModalTitle';
import ModalContent from '../ModalContent';
import ModalActions from '../ModalActions';
import { StandardProps, PicassoComponent } from '../Picasso';
declare type ContainerValue = HTMLElement | (() => HTMLElement);
export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
    /** Content of Modal component */
    children: ReactNode;
    /** Whether modal should be displayed */
    open: boolean;
    /** Callback executed when backdrop was clicked */
    onBackdropClick?: () => void;
    /** Callback executed when attempting to close modal */
    onClose?: () => void;
    /** Callback executed when modal is being opened */
    onOpen?: () => void;
    /** A node, component instance, or function that returns either. The container will have the portal children appended to it. */
    container?: ContainerValue;
    /** If `true`, the backdrop is not rendered */
    hideBackdrop?: boolean;
    transitionDuration?: number;
    paperProps?: PaperProps;
}
interface StaticProps {
    Content: typeof ModalContent;
    Actions: typeof ModalActions;
    Title: typeof ModalTitle;
}
export declare const Modal: FunctionComponent<Props> & StaticProps;
declare const _default: PicassoComponent<Props, StaticProps>;
export default _default;
