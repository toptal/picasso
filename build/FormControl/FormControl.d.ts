import React, { ReactNode } from 'react';
import { StandardProps } from '../Picasso';
interface Props extends StandardProps {
    /** Content of FormControl */
    children?: ReactNode;
    /** Indicate whether `FormControl` is in error state */
    error?: boolean;
    /** If true, the control will be disabled */
    disabled?: boolean;
    /** Take the full width of a container */
    fullWidth?: boolean;
}
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "disabled" | "children" | "fullWidth" | "error" | "className"> & import("@material-ui/core/styles").StyledComponentProps<never>>;
export default _default;
