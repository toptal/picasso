import React, { FunctionComponent } from 'react';
import { StandardProps } from '../Picasso';
interface Props extends StandardProps {
    hideLabel: boolean;
    children: string;
    active?: boolean;
    completed?: boolean;
}
export declare const StepLabel: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "active" | "children" | "completed" | "className" | "hideLabel"> & import("@material-ui/core/styles").StyledComponentProps<"hidden" | "label" | "root">>;
export default _default;
