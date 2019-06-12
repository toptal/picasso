import React, { FunctionComponent, ReactNode, ChangeEvent } from 'react';
import { StandardProps } from '../Picasso';
declare type VariantType = 'light' | 'dark';
declare type TriggerType = 'hover' | 'click';
declare type PlacementType = 'bottom' | 'left' | 'right' | 'top';
export interface Props extends StandardProps {
    /** Trigger element for tooltip */
    children: ReactNode;
    /** Content to be rendered inside tooltip */
    content?: ReactNode;
    /** Whether tooltip should display arrow */
    arrow?: boolean;
    /** Select color variant to use */
    variant?: VariantType;
    /** Where should the tooltip be positioned */
    placement?: PlacementType;
    /** Called when tooltip is closed */
    onClose?: (event: ChangeEvent<{}>) => void;
    /** Called when tooltip is opened */
    onOpen?: (event: ChangeEvent<{}>) => void;
    /** Whether user can interact with tooltip content */
    interactive?: boolean;
    /** Programatically control tooltip's visibility */
    open?: boolean;
    trigger?: TriggerType;
}
export declare const Tooltip: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "content" | "style" | "open" | "children" | "className" | "variant" | "onClose" | "onOpen" | "arrow" | "placement" | "interactive" | "trigger"> & import("@material-ui/core/styles").StyledComponentProps<"light" | "tooltip" | "arrowPopper" | "arrowPopperLight" | "arrow">>;
export default _default;
