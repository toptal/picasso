import React, { FunctionComponent } from 'react';
import { StandardProps } from '../Picasso';
interface Props extends StandardProps {
    active?: boolean;
    completed?: boolean;
}
export declare const StepIcon: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "active" | "children" | "completed" | "className"> & import("@material-ui/core/styles").StyledComponentProps<"active" | "root" | "completed">>;
export default _default;
