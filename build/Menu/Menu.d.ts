import { FunctionComponent, HTMLAttributes } from 'react';
import { MenuListProps } from '@material-ui/core/MenuList';
import MenuItem from '../MenuItem';
import { StandardProps, PicassoComponent } from '../Picasso';
export declare type ListNativeProps = HTMLAttributes<HTMLUListElement> & Pick<MenuListProps, 'onKeyDown'>;
interface Props extends StandardProps, ListNativeProps {
}
interface StaticProps {
    Item: typeof MenuItem;
}
export declare const Menu: FunctionComponent<Props> & StaticProps;
declare const _default: PicassoComponent<Props, StaticProps>;
export default _default;
