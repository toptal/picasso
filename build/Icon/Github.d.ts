import React from 'react';
import { StandardProps } from '../Picasso';
interface Props extends StandardProps {
    size?: number;
    color?: string;
}
declare const _default: React.ComponentType<Pick<Props, "color" | "size" | "style" | "className"> & import("@material-ui/core/styles").StyledComponentProps<"root">>;
export default _default;
