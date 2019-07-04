import React, { FunctionComponent } from 'react';
import { StandardProps } from '../Picasso';
export interface FileInfo {
    name: string;
    location: string;
}
export interface Props extends StandardProps {
    /** If true, the 'FileInput' will be disabled */
    disabled?: boolean;
    /** Indicate whether `FileInput` is in error state */
    error?: boolean;
    /** A string that defines the file types the file input should accept. */
    accept?: string;
    /** Current progress of upload */
    progress?: number | boolean;
    /** Status message indicating various states during upload or error */
    status?: string;
    /** Width of the component which will apply `min-width` to the `input` */
    width?: 'full' | 'shrink' | 'auto';
    /** Descriptor containing file name and location */
    value?: FileInfo;
    /** Callback invoked when `FileInput` changes its state by selecting new files. */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export declare const FileInput: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "width" | "style" | "progress" | "disabled" | "children" | "error" | "className" | "onChange" | "value" | "accept" | "status"> & import("@material-ui/core/styles").StyledComponentProps<"button" | "input" | "root" | "loader" | "inputValue" | "inputValueDisabled" | "nativeInput" | "adornmentStart">>;
export default _default;
