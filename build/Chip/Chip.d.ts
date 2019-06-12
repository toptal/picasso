import React, { ReactElement, ReactNode } from 'react';
import { StandardProps, TooltipEventListeners } from '../Picasso';
interface Props extends StandardProps, TooltipEventListeners {
    /** Specify the icon which should be rendered inside Chip */
    icon?: ReactElement;
    /** Text content of the `Chip` component */
    label?: ReactNode;
    /** Delete icon component */
    deleteIcon?: ReactElement;
    /** A callback which is invoked after remove `deleteIcon` is clicked */
    onDelete?: () => void;
}
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "icon" | "children" | "label" | "deleteIcon" | "className" | "onFocus" | "onBlur" | "onMouseLeave" | "onMouseOver" | "onTouchEnd" | "onTouchStart" | "onDelete"> & import("@material-ui/core/styles").StyledComponentProps<"innerLabel">>;
export default _default;
