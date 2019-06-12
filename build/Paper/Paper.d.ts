import React, { ReactNode, FunctionComponent } from 'react';
import { StandardProps } from '../Picasso';
interface Props extends StandardProps {
    /** Content of component */
    children: ReactNode;
}
export declare const Paper: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "children" | "className"> & import("@material-ui/core/styles").StyledComponentProps<never>>;
export default _default;
