import React, { ChangeEventHandler, ReactType, ReactNode } from 'react';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';
import { StandardProps } from '../Picasso';
declare type ValueType = Array<string | number | boolean | object> | string | number | boolean | object;
export interface Props extends StandardProps {
    /** The id of the `input` element. */
    id?: string;
    /** Name attribute of the input element */
    name?: string;
    /** Placeholder for value */
    placeholder?: string;
    /** Focus during first mount */
    autoFocus?: boolean;
    /** Helps users to fill forms faster */
    autoComplete?: string;
    /** Width of the component which will apply `min-width` to the `input` */
    width?: 'full' | 'shrink' | 'auto';
    disabled?: boolean;
    inputComponent?: ReactType<InputBaseComponentProps>;
    inputProps?: InputBaseComponentProps;
    inputRef?: React.Ref<any> | React.RefObject<any>;
    value?: ValueType;
    /** Whether `TextField` should be rendered as `TextArea` or not */
    multiline?: boolean;
    /** Specify rows amount for `TextArea` */
    rows?: string | number;
    rowsMax?: string | number;
    /** Type attribute of the Input element. It should be a valid HTML5 input type */
    type?: string;
    /** If true, the input will indicate an error. */
    error?: boolean;
    startAdornment?: ReactNode;
    endAdornment?: ReactNode;
    onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "width" | "style" | "disabled" | "children" | "error" | "multiline" | "className" | "id" | "placeholder" | "onChange" | "type" | "autoFocus" | "name" | "value" | "autoComplete" | "rows" | "rowsMax" | "inputComponent" | "inputProps" | "inputRef" | "startAdornment" | "endAdornment"> & import("@material-ui/core/styles").StyledComponentProps<"input" | "root" | "inputMultiline" | "rootFull" | "rootShrink" | "rootAuto">>;
export default _default;
