import React from 'react';
import { StandardProps } from '../Picasso';
export interface Props extends StandardProps {
    /** Content of the component */
    children: string;
    /** Number of characters displayed initially */
    rows?: number;
    /** Text used by action link showing whole content */
    moreText?: string;
    /** Text used by action link hiding whole content */
    lessText?: string;
    /** Define component initial state, whether it should be collapsed or not */
    initialExpanded?: boolean;
    /** Define whether action link should be displayed or not */
    disableToggle?: boolean;
    /** Callback tiggered when show more/less is clicked */
    onToggle?: () => void;
}
export declare const ShowMore: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLSpanElement>>;
declare const _default: React.ComponentType<Pick<Props & React.RefAttributes<HTMLSpanElement>, "style" | "children" | "ref" | "className" | "key" | "rows" | "initialExpanded" | "disableToggle" | "moreText" | "lessText" | "onToggle"> & import("@material-ui/core/styles").StyledComponentProps<"icon" | "iconWrapper" | "toggleText" | "expandedIcon">>;
export default _default;
