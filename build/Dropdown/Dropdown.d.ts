import { PopoverOrigin } from '@material-ui/core/Popover';
import { PopperPlacementType } from '@material-ui/core/Popper';
import { HTMLAttributes, ReactNode } from 'react';
import DropdownArrow from '../DropdownArrow';
import { CompoundedComponentWithRef, PicassoComponentWithRef, SpacingType, StandardProps } from '../Picasso';
export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
    /** Anchor element that opens content on click */
    children: ReactNode;
    /** Content element that opens when anchor is clicked */
    content: ReactNode;
    /** Offset of content element relative to anchor element */
    offset?: {
        top?: SpacingType;
        bottom?: SpacingType;
        left?: SpacingType;
        right?: SpacingType;
    };
    /** DEPRECATED. Positioning of content menu relative to anchor */
    anchorOrigin?: PopoverOrigin;
    /** DEPRECATED. Positioning of content menu relative to content */
    transformOrigin?: PopoverOrigin;
    /** Position of the popper relative to the anchor */
    placement?: PopperPlacementType;
    /** Disable auto focus of first item in list or item */
    disableAutoFocus?: boolean;
    /** Disable close on generic close events */
    disableAutoClose?: boolean;
    /** Disable the portal behavior. The children stay within it's parent DOM hierarchy. */
    disablePortal?: boolean;
    /** Callback invoked when component is opened */
    onOpen?(): void;
    /** Callback invoked when component is closed */
    onClose?(): void;
}
interface StaticProps {
    Arrow: typeof DropdownArrow;
    useContext: () => ContextProps;
}
interface ContextProps {
    close: () => void;
}
export declare const Dropdown: CompoundedComponentWithRef<Props, HTMLDivElement, StaticProps>;
declare const _default: PicassoComponentWithRef<Props, HTMLDivElement, StaticProps>;
export default _default;
