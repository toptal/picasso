import React from 'react';
import { StandardProps } from '../Picasso';
declare type ScaleType = 1 | 2 | 3 | 4;
export interface Props extends StandardProps {
    scale?: ScaleType;
    color?: string;
    base?: number;
}
declare const _default: React.ComponentType<Pick<Props & React.RefAttributes<SVGSVGElement>, "color" | "scale" | "style" | "base" | "ref" | "className" | "key"> & import("@material-ui/core/styles").StyledComponentProps<"root">>;
export default _default;
