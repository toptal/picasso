import React from 'react';
import { StandardProps, ColorType } from '../Picasso';
declare type ScaleType = 1 | 2 | 3 | 4;
export interface Props extends StandardProps {
    scale?: ScaleType;
    color?: ColorType | string;
    base?: number;
}
declare const _default: React.ComponentType<Pick<Props & React.RefAttributes<SVGSVGElement>, "color" | "scale" | "style" | "base" | "ref" | "className" | "key"> & import("@material-ui/core/styles").StyledComponentProps<"inherit" | "black" | "blue" | "green" | "grey" | "red" | "yellow" | "invert" | "root" | "lightGrey" | "darkGrey">>;
export default _default;
