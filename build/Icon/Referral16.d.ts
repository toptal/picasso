import React from 'react';
import { StandardProps } from '../Picasso';
declare type ScaleType = 1 | 2 | 3 | 4;
export interface Props extends StandardProps {
    size?: number;
    scale?: ScaleType;
    color?: string;
}
declare const _default: React.ComponentType<Pick<Props, "color" | "scale" | "size" | "style" | "className"> & import("@material-ui/core/styles").StyledComponentProps<"root">>;
export default _default;
