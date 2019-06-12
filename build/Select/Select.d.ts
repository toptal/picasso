import React, { FunctionComponent, ChangeEvent, ReactNode } from 'react';
import { StandardProps } from '../Picasso';
interface Option {
    key: number;
    text: string | ReactNode;
    value: string | number;
}
declare type IconPosition = 'start' | 'end';
export interface Props extends StandardProps {
    /** If true, the 'Select' will be disabled */
    disabled?: boolean;
    /** Indicate whether `Select` is in error state */
    error?: boolean;
    /** Component ID */
    id?: string;
    /** Width of the component which will apply `min-width` to the `input` */
    width?: 'full' | 'shrink' | 'auto';
    /** Placeholder option which is selected by default */
    placeholder?: string;
    /** Whether icon should be placed at the beginning or end of the `TextField` */
    iconPosition?: IconPosition;
    /** Specify icon which should be rendered inside TextField */
    icon?: ReactNode;
    /** Whether `Select` should be rendered as native HTML `<select />` */
    native?: boolean;
    /** Callback invoked when `Select` changes its state. */
    onChange?: (event: ChangeEvent<HTMLSelectElement>, child: ReactNode) => void;
    /** List of options to be rendered as `Select` */
    options: Option[];
    /** Selected value */
    value?: string | number;
}
export declare const Select: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "width" | "style" | "icon" | "disabled" | "children" | "error" | "className" | "id" | "placeholder" | "onChange" | "value" | "iconPosition" | "native" | "options"> & import("@material-ui/core/styles").StyledComponentProps<"icon" | "caret" | "input" | "select" | "root" | "placeholder" | "iconStart" | "iconEnd" | "rootFull" | "rootShrink" | "rootAuto" | "inputNative" | "inputPlaceholder" | "inputPlaceholderDisabled" | "inputValue" | "selectNative" | "caretDisabled" | "iconDisabled">>;
export default _default;
