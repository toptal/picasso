import React, { ReactNode } from 'react';
import { StandardProps } from '../Picasso';
declare type PositionType = 'start' | 'end';
interface Props extends StandardProps {
    children: ReactNode;
    position: PositionType;
    disabled?: boolean;
}
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "position" | "style" | "disabled" | "children" | "className"> & import("@material-ui/core/styles").StyledComponentProps<"root" | "rootDisabled">>;
export default _default;
