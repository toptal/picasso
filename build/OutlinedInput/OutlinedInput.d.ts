import React, { ChangeEventHandler, ReactType, ReactNode } from 'react';
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
    inputRef?: React.Ref<any> | React.RefObject<any>;
    value?: ValueType;
    /** Type attribute of the Input element. It should be a valid HTML5 input type */
    type?: string;
    /** If true, the input will indicate an error. */
    error?: boolean;
    startAdornment?: ReactNode;
    endAdornment?: ReactNode;
    notched?: boolean;
    onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "disabled" | "children" | "fullWidth" | "error" | "className" | "onChange" | "type" | "value" | "inputProps" | "endAdornment" | "inputComponent" | "inputRef" | "startAdornment" | "notched" | "labelWidth"> & import("@material-ui/core/styles").StyledComponentProps<"input" | "root">>;
export default _default;
