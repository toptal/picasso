import { FunctionComponent } from 'react';
import MenuItem from '../MenuItem';
import { StandardProps, PicassoComponent } from '../Picasso';
interface Props extends StandardProps {
}
interface StaticProps {
    Item: typeof MenuItem;
}
export declare const Menu: FunctionComponent<Props> & StaticProps;
declare const _default: PicassoComponent<Props, StaticProps>;
export default _default;
