import React, { FunctionComponent, ReactNode } from 'react';
import { StandardProps } from '../Picasso';
interface Props extends StandardProps {
    /** The text of the hint */
    hint?: string;
    /** The text of the error */
    error?: string;
    /** The content of the Form.Field */
    children: ReactNode;
}
export declare const FormField: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "children" | "error" | "className" | "hint"> & import("@material-ui/core/styles").StyledComponentProps<"root" | "error" | "hint">>;
export default _default;
