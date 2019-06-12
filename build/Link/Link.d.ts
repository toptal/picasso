import React, { MouseEvent, FunctionComponent, ReactNode, ElementType } from 'react';
import { LinkProps } from '@material-ui/core/Link';
import { StandardProps, TooltipEventListeners } from '../Picasso';
declare type UnderlineType = 'none' | 'hover' | 'always';
declare type VariantType = 'action' | 'default';
interface Props extends StandardProps, TooltipEventListeners {
    /** Content of the component */
    children?: ReactNode;
    /** Destination the link points to */
    href?: string;
    /** Controls when the link should have an underline */
    underline?: UnderlineType;
    /** Callback invoked when component is clicked */
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
    /**
     * The component used for the root node.
     * Either a string to use a DOM element or a component.
     *
     * Currently doesn't support `button` value because of broken typings,
     * it's already fixed at `4.0.0-beta.2`
     * Please, remove this comment after upgrade
     */
    as?: ElementType<LinkProps>;
    /** Either it's a regular link or an _action_ */
    variant?: VariantType;
    /** Indicates the order of receiving focus. If not set will not receive focus. */
    tabIndex?: number;
}
export declare const Link: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "underline" | "children" | "className" | "tabIndex" | "onFocus" | "onBlur" | "onClick" | "onMouseLeave" | "onMouseOver" | "onTouchEnd" | "onTouchStart" | "href" | "variant" | "as"> & import("@material-ui/core/styles").StyledComponentProps<"action">>;
export default _default;
