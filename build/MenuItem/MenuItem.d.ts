import React, { FunctionComponent, ReactNode } from 'react';
import { StandardProps } from '../Picasso';
declare type MenuItemType = 'li' | 'div' | 'a' | 'button';
interface Props extends StandardProps {
    /** Component name to render the menu item as */
    as?: MenuItemType;
    /** Whether to render disabled item */
    disabled?: boolean;
    /** Whether to render without internal padding */
    disableGutters?: boolean;
    children?: ReactNode;
    /** Callback when menu item is clicked */
    onClick?: () => void;
    /** Value of the item. Can be used when menu item is used inside Select component. */
    value?: string | string[] | number;
}
export declare const MenuItem: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "disabled" | "children" | "className" | "onClick" | "value" | "as" | "disableGutters"> & import("@material-ui/core/styles").StyledComponentProps<"stringContent">>;
export default _default;
