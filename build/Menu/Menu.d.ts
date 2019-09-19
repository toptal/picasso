import { HTMLAttributes } from 'react';
import { MenuListProps } from '@material-ui/core/MenuList';
import { StandardProps, PicassoComponentWithRef, CompoundedComponentWithRef } from '../Picasso';
import MenuItem from '../MenuItem';
export declare type ListNativeProps = HTMLAttributes<HTMLUListElement> & Pick<MenuListProps, 'onKeyDown'>;
export interface Props extends StandardProps, ListNativeProps {
    allowNestedNavigation?: boolean;
}
export interface StaticProps {
    Item: typeof MenuItem;
}
export declare const Menu: CompoundedComponentWithRef<Props, HTMLUListElement, StaticProps>;
declare const _default: PicassoComponentWithRef<Props, HTMLUListElement, StaticProps>;
export default _default;
