import React from 'react';
import { StandardProps } from '../Picasso';
declare type ColorType = 'red' | 'yellow' | 'blue';
export interface Props extends StandardProps {
    /** Indicator color */
    color: ColorType;
}
export declare const Indicator: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>>;
declare const _default: React.ComponentType<Pick<Props & React.RefAttributes<HTMLDivElement>, "color" | "style" | "ref" | "className" | "key"> & import("@material-ui/core/styles").StyledComponentProps<"blue" | "red" | "yellow" | "root">>;
export default _default;
