import React, { ReactNode, ElementType, AnchorHTMLAttributes } from 'react';
import { BaseProps, OverridableComponent } from '../Picasso';
declare type UnderlineType = 'none' | 'hover' | 'always';
declare type VariantType = 'action' | 'default';
export declare type Props = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
    /** Content of the component */
    children?: ReactNode;
    /** Destination the link points to */
    href?: string;
    /** Controls when the link should have an underline */
    underline?: UnderlineType;
    /** Callback invoked when component is clicked */
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    /**
     * The component used for the root node.
     * Either a string to use a DOM element or a component.
     */
    as?: ElementType;
    /** Either it's a regular link or an _action_ */
    variant?: VariantType;
    /** Indicates the order of receiving focus. If not set will not receive focus. */
    tabIndex?: number;
    /** Uses white text color for dark background */
    invert?: boolean;
};
export declare const Link: OverridableComponent<Props>;
export default Link;
