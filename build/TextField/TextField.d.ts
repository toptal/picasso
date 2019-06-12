import React, { FunctionComponent, ReactNode, ChangeEvent } from 'react';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import { StandardProps } from '../Picasso';
declare type IconPosition = 'start' | 'end';
export interface Props extends StandardProps {
    /** The id of the `input` element. */
    id?: string;
    /** Name attribute of the input element */
    name?: string;
    /** The value of the component */
    value?: string;
    /** Placeholder for value */
    placeholder?: string;
    /** Indicate whether `TextField` is in error state */
    error?: boolean;
    /** If true, the `TextField` will be disabled */
    disabled?: boolean;
    /** Take the full width of a container */
    fullWidth?: boolean;
    /** Focus during first mount */
    autoFocus?: boolean;
    /** Helps users to fill forms faster */
    autoComplete?: string;
    /** Whether icon should be placed at the beginning or end of the `TextField` */
    iconPosition?: IconPosition;
    /** Specify icon which should be rendered inside TextField */
    icon?: ReactNode;
    inputProps?: OutlinedInputProps;
    /** Whether `TextField` should be rendered as `TextArea` or not */
    multiline?: boolean;
    /** Specify rows amount for `TextArea` */
    rows?: number;
    rowsMax?: number;
    /** Type attribute of the Input element. It should be a valid HTML5 input type */
    type?: string;
    /**  Callback invoked when `TextField` changes its state */
    onChange?: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
}
export declare const TextField: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "icon" | "disabled" | "children" | "fullWidth" | "error" | "multiline" | "className" | "id" | "placeholder" | "onChange" | "type" | "autoFocus" | "name" | "value" | "iconPosition" | "autoComplete" | "inputProps" | "rows" | "rowsMax"> & import("@material-ui/core/styles").StyledComponentProps<"icon" | "input" | "root" | "inputMultiline" | "rootMultiline" | "rootFixedWidth" | "rootFullWidth" | "iconStart" | "iconEnd">>;
export default _default;
