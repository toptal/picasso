import React, { FunctionComponent, ReactNode } from 'react';
import { StandardProps } from '../Picasso';
interface Props extends StandardProps {
    /** The content of the component, normally `Table.Row` */
    children: ReactNode;
}
export declare const TableBody: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "children" | "className"> & import("@material-ui/core/styles").StyledComponentProps<never>>;
export default _default;
