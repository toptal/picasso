import { ReactNode, TableHTMLAttributes } from 'react';
import TableCell from '../TableCell';
import TableBody from '../TableBody';
import TableRow from '../TableRow';
import TableHead from '../TableHead';
import TableFooter from '../TableFooter';
import { StandardProps, PicassoComponentWithRef, CompoundedComponentWithRef } from '../Picasso';
interface Props extends StandardProps, TableHTMLAttributes<HTMLTableElement> {
    /** Children components (`Table.Head`, `Table.Body`, `Table.Footer`) */
    children: ReactNode;
}
interface StaticProps {
    Head: typeof TableHead;
    Body: typeof TableBody;
    Row: typeof TableRow;
    Cell: typeof TableCell;
    Footer: typeof TableFooter;
}
export declare const Table: CompoundedComponentWithRef<Props, HTMLTableElement, StaticProps>;
declare const _default: PicassoComponentWithRef<Props, HTMLTableElement, StaticProps>;
export default _default;
