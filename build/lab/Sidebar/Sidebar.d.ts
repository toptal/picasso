import { FunctionComponent } from 'react';
import { StandardProps, PicassoComponent } from '../../Picasso';
import SidebarMenu from '../SidebarMenu';
import SidebarItem from '../SidebarItem';
export interface Props extends StandardProps {
}
interface StaticProps {
    Menu: typeof SidebarMenu;
    Item: typeof SidebarItem;
}
export declare const Sidebar: FunctionComponent<Props> & StaticProps;
declare const _default: PicassoComponent<Props, StaticProps>;
export default _default;
