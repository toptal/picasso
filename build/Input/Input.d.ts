import React, { ReactNode, ChangeEvent, InputHTMLAttributes } from 'react';
import { BaseProps } from '../Picasso';
declare type IconPosition = 'start' | 'end';
declare type CounterType = 'remaining' | 'entered';
export interface Props extends BaseProps, InputHTMLAttributes<HTMLInputElement> {
    /** The id of the `input` element. */
    id?: string;
    /** Name attribute of the input element */
    name?: string;
    /** The default `input` element value. Use when the component is not controlled. */
    defaultValue?: string;
    /** The value of the `input` element, required for a controlled component. */
    value?: string;
    /** Placeholder for value */
    placeholder?: string;
    /** Indicate whether `Input` is in error state */
    error?: boolean;
    /** If true, the `Input` will be disabled */
    disabled?: boolean;
    /** Width of the component */
    width?: 'full' | 'shrink' | 'auto';
    /** Whether icon should be placed at the beginning or end of the `Input` */
    iconPosition?: IconPosition;
    /** Specify icon which should be rendered inside Input */
    icon?: ReactNode;
    /** Whether `Input` should be rendered as `TextArea` or not */
    multiline?: boolean;
    /** Specify rows amount for `TextArea` */
    rows?: string | number;
    rowsMax?: string | number;
    /** Type attribute of the Input element. It should be a valid HTML5 input type */
    type?: string;
    /** Adds element at the start of the input - can't be used in combination with `iconPosition: start` */
    startAdornment?: ReactNode;
    /** Adds element at the end of the input - can't be used in combination with `iconPosition: end` */
    endAdornment?: ReactNode;
    /**  Callback invoked when `Input` changes its state */
    onChange?: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
    /** Adds a counter of characters */
    limit?: number;
    /** Type of the counter of characters */
    counter?: CounterType;
}
export declare const Input: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLInputElement>>;
export default Input;
