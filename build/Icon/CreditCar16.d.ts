import React from 'react';
import { StandardProps } from '../Picasso';
declare type ScaleType = 1 | 2 | 3 | 4;
export interface Props extends StandardProps {
    size?: number;
    scale?: ScaleType;
    color?: string;
    base?: number;
}
declare const _default: React.ComponentType<Pick<Props, "color" | "scale" | "size" | "style" | "base" | "className"> & import("@material-ui/core/styles").StyledComponentProps<"inherit" | "black" | "blue" | "green" | "grey" | "red" | "yellow" | "invert" | "root" | "lightGrey" | "darkGrey">>;
export default _default;
