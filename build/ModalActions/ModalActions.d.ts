import React, { FunctionComponent, ReactNode } from 'react';
import { StandardProps } from '../Picasso';
export interface Props extends StandardProps {
    /** Action content (e.g. Buttons) */
    children: ReactNode;
}
export declare const ModalActions: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "children" | "className"> & import("@material-ui/core/styles").StyledComponentProps<"root">>;
export default _default;
