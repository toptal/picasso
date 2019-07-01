import React, { FunctionComponent } from 'react';
import { StandardProps } from '../Picasso';
declare type ComponentType = 'label' | 'span';
export interface Props extends StandardProps {
    /** Content of the label */
    children: string;
    /** Adds asteriks if true */
    required?: boolean;
    /** Is this label for disabled input or not */
    disabled?: boolean;
    /** Specifies an id of the input */
    htmlFor?: string;
    /** Whether label should act as inline element `display: inline-block` */
    inline?: boolean;
    /** Component used for the root node */
    as?: ComponentType;
}
export declare const FormLabel: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "inline" | "disabled" | "children" | "required" | "className" | "as" | "htmlFor"> & import("@material-ui/core/styles").StyledComponentProps<"text" | "inline" | "disabled" | "root" | "asterisk">>;
export default _default;
