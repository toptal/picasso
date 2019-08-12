import React, { FunctionComponent } from 'react';
import { StandardProps, PicassoComponent } from '../../Picasso';
import SidebarMenu from '../SidebarMenu';
import SidebarItem from '../SidebarItem';
import SidebarLogo from '../SidebarLogo';
import { SidebarContextProps, VariantType } from './types';
export interface Props extends StandardProps {
    /** Style variant of Sidebar and subcomponents */
    variant?: VariantType;
}
interface StaticProps {
    Menu: typeof SidebarMenu;
    Item: typeof SidebarItem;
    Logo: typeof SidebarLogo;
}
export declare const SidebarContext: React.Context<SidebarContextProps>;
export declare const Sidebar: FunctionComponent<Props> & StaticProps;
declare const _default: PicassoComponent<Props, StaticProps>;
export default _default;
