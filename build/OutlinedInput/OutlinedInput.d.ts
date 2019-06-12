import React, { ChangeEventHandler, ReactType } from 'react';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';
import { StandardProps } from '../Picasso';
declare type ValueType = Array<string | number | boolean | object> | string | number | boolean | object;
export interface Props extends StandardProps {
    /** The width of the legend */
    labelWidth: number;
    /** If true, the input will take up the full width of its container */
    fullWidth?: boolean;
    disabled?: boolean;
    inputComponent?: ReactType<InputBaseComponentProps>;
    inputProps?: InputBaseComponentProps;
    value?: ValueType;
    onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "disabled" | "children" | "fullWidth" | "className" | "onChange" | "value" | "inputProps" | "inputComponent" | "labelWidth"> & import("@material-ui/core/styles").StyledComponentProps<"input">>;
export default _default;
