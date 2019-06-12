import React, { FunctionComponent, ReactNode } from 'react';
import { StandardProps } from '../Picasso';
interface Props extends StandardProps {
    /** Zero or more Table.Row elements. */
    children: ReactNode;
}
export declare const TableFooter: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "children" | "className"> & import("@material-ui/core/styles").StyledComponentProps<never>>;
export default _default;
