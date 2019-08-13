import React, { FunctionComponent, ChangeEvent } from 'react';
import { StandardProps } from '../../Picasso';
export interface Props extends StandardProps {
    /** Minimum slider value */
    min?: number;
    /** Maximum slider value */
    max?: number;
    /** Controlled value of the component */
    value?: number;
    /** Step for the thumb movement */
    step?: number;
    /** Whether component is disabled or not */
    disabled?: boolean;
    /** Callback invoked when slider changes its state. */
    onChange?: (event: ChangeEvent<{}>, value: number) => void;
}
export declare const Slider: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "disabled" | "children" | "value" | "className" | "onChange" | "step" | "max" | "min"> & import("@material-ui/core/styles").StyledComponentProps<"track" | "thumb" | "activated">>;
export default _default;
