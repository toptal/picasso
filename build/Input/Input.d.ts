import React, { ReactType, ChangeEventHandler } from 'react';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';
import { StandardProps } from '../Picasso';
declare type ValueType = Array<string | number | boolean | object> | string | number | boolean | object;
export interface Props extends StandardProps {
    /** If true, the input will not have an underline */
    disableUnderline?: boolean;
    /** If true, the input will take up the full width of its container */
    fullWidth?: boolean;
    disabled?: boolean;
    inputComponent?: ReactType<InputBaseComponentProps>;
    inputProps?: InputBaseComponentProps;
    value?: ValueType;
    onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "disabled" | "children" | "fullWidth" | "className" | "onChange" | "value" | "inputProps" | "inputComponent" | "disableUnderline"> & import("@material-ui/core/styles").StyledComponentProps<"input">>;
export default _default;
