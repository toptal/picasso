import React, { FunctionComponent } from 'react';
import { StandardProps } from '../Picasso';
export interface Props extends StandardProps {
    /** Show checkbox initially as checked */
    checked?: boolean;
    /** Disable changing `Checkbox` state */
    disabled?: boolean;
    /** Checkbox can show indeterminate value instead of boolean */
    indeterminate?: boolean;
    /** Text label for the `Checkbox` */
    label?: string;
    /** The id of the input element */
    id?: string;
    /** Mark field as required */
    required?: boolean;
    /** Callback invoked when `Checkbox` changed its value */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    /** Value of the `Checkbox` (applicable only for controlled component) */
    value?: string;
}
export declare const Checkbox: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "disabled" | "children" | "label" | "checked" | "indeterminate" | "required" | "className" | "id" | "onChange" | "value"> & import("@material-ui/core/styles").StyledComponentProps<"disabled" | "root" | "uncheckedIcon" | "checkedIcon" | "indeterminateIcon">>;
export default _default;
