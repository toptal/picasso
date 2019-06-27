import React, { FunctionComponent, ReactNode, MouseEvent } from 'react';
import { StandardProps } from '../Picasso';
interface Props extends StandardProps {
    /** Should be valid `<tr>` children such as `Table.Cell`. */
    children: ReactNode;
    /** If true, the table row will shade on hover */
    hover?: boolean;
    /** If true, the table row will have the selected shading */
    selected?: boolean;
    /** Callback invoked when user clicks on table row */
    onClick?: (event: MouseEvent<HTMLTableRowElement>) => void;
}
export declare const TableRow: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "children" | "selected" | "hover" | "className" | "onClick"> & import("@material-ui/core/styles").StyledComponentProps<"head" | "root" | "hover">>;
export default _default;
