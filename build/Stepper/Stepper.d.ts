import React, { FunctionComponent } from 'react';
import '../StepIcon';
import { StandardProps } from '../Picasso';
export interface Props extends StandardProps {
    /** The index of the active step */
    active?: number;
    /** The component will take up the full width of its container */
    fullWidth?: boolean;
    /** Hide labels of non active steps */
    hideLabels?: boolean;
    /** Array of the step labels */
    steps: string[];
}
export declare const Stepper: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "active" | "children" | "fullWidth" | "className" | "hideLabels" | "steps"> & import("@material-ui/core/styles").StyledComponentProps<"fullWidth">>;
export default _default;
