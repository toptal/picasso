import React, { FunctionComponent, ReactNode } from 'react';
import { StandardProps } from '../Picasso';
export interface Props extends StandardProps {
    /** Content of Modal */
    children: ReactNode;
}
export declare const ModalContent: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "children" | "className"> & import("@material-ui/core/styles").StyledComponentProps<"root">>;
export default _default;
