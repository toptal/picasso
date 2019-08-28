import React, { ChangeEvent } from 'react';
import { StandardProps } from '../../Picasso';
declare type Item = {
    value: string;
    text: string;
};
export interface Props extends StandardProps {
    /** Placeholder for value */
    placeholder?: string;
    /** Shows the loading icon when options are loading */
    loading?: boolean;
    /** Text prefix for new option */
    newOptionLabel?: string;
    /** List of options with unique labels */
    options?: Item[];
    /** List of pre-selected items values */
    defaultValues?: string[];
    /**  Callback invoked when item is selected */
    onChange?: (selectedValues: string[]) => void;
    /**  Callback invoked when typing value is changed */
    onInputChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
export declare const TagSelector: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLInputElement>>;
declare const _default: React.ComponentType<Pick<Props & React.RefAttributes<HTMLInputElement>, "style" | "ref" | "className" | "placeholder" | "onChange" | "key" | "loading" | "options" | "defaultValues" | "newOptionLabel" | "onInputChange"> & import("@material-ui/core/styles").StyledComponentProps<never>>;
export default _default;
