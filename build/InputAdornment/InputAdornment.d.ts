import React, { ReactNode } from 'react';
import { StandardProps } from '../Picasso';
declare type PositionType = 'start' | 'end';
interface Props extends StandardProps {
    children: ReactNode;
    position: PositionType;
}
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "position" | "style" | "children" | "className"> & import("@material-ui/core/styles").StyledComponentProps<never>>;
export default _default;
