import React, { ChangeEvent } from 'react';
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
export declare const Slider: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLElement>>;
declare const _default: React.ComponentType<Pick<Props & React.RefAttributes<HTMLElement>, "style" | "disabled" | "ref" | "value" | "className" | "onChange" | "step" | "key" | "max" | "min"> & import("@material-ui/core/styles").StyledComponentProps<"track" | "root" | "rail" | "thumb">>;
export default _default;
