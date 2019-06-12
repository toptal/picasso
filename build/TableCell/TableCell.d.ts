import React, { FunctionComponent, ReactNode } from 'react';
import { StandardProps } from '../Picasso';
declare type AlignType = 'inherit' | 'left' | 'center' | 'right' | 'justify';
interface Props extends StandardProps {
    /** Set the text-align on the table cell content */
    align?: AlignType;
    /** The table cell contents */
    children: ReactNode;
    /** Indicates for how many columns the cell extends */
    colSpan?: number;
}
export declare const TableCell: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "children" | "className" | "align" | "colSpan"> & import("@material-ui/core/styles").StyledComponentProps<"body" | "head" | "root">>;
export default _default;
