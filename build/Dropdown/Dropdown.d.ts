import { FunctionComponent, ReactNode, HTMLAttributes } from 'react';
import { PopoverOrigin } from '@material-ui/core/Popover';
import { StandardProps, SpacingType, PicassoComponent } from '../Picasso';
import DropdownArrow from '../DropdownArrow';
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
    /** Positioning of content menu relative to anchor */
    anchorOrigin?: PopoverOrigin;
    /** Positioning of content menu relative to content */
    transformOrigin?: PopoverOrigin;
    /** Disable auto focus of first item in list or item */
    disableAutoFocus?: boolean;
    /** Disable close on generic close events */
    disableAutoClose?: boolean;
}
interface StaticProps {
    Arrow: typeof DropdownArrow;
    useContext: () => ContextProps;
}
interface ContextProps {
    close: () => void;
}
export declare const Dropdown: FunctionComponent<Props> & StaticProps;
declare const _default: PicassoComponent<Props, StaticProps>;
export default _default;
