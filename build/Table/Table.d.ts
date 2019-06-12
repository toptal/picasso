import { FunctionComponent, ReactNode } from 'react';
import TableCell from '../TableCell';
import TableBody from '../TableBody';
import TableRow from '../TableRow';
import TableHead from '../TableHead';
import TableFooter from '../TableFooter';
import { StandardProps, PicassoComponent } from '../Picasso';
interface Props extends StandardProps {
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
export declare const Table: FunctionComponent<Props> & StaticProps;
declare const _default: PicassoComponent<Props, StaticProps>;
export default _default;
