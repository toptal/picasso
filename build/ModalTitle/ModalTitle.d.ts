import React, { FunctionComponent, ReactNode } from 'react';
import { StandardProps } from '../Picasso';
export interface Props extends StandardProps {
    /** Title content */
    children: ReactNode;
}
export declare const ModalTitle: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "children" | "className"> & import("@material-ui/core/styles").StyledComponentProps<"root">>;
export default _default;
