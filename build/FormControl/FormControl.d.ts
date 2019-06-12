import React, { ReactNode } from 'react';
import { StandardProps } from '../Picasso';
interface Props extends StandardProps {
    /** Content of FormControl */
    children?: ReactNode;
    /** Indicate whether `FormControl` is in error state */
    error?: boolean;
    /** If true, the control will be disabled */
    disabled?: boolean;
}
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "disabled" | "children" | "error" | "className"> & import("@material-ui/core/styles").StyledComponentProps<never>>;
export default _default;
