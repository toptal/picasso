import React from 'react';
import { StandardProps, PicassoComponentWithRef, CompoundedComponentWithRef } from '../../Picasso';
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
export declare const Sidebar: CompoundedComponentWithRef<Props, HTMLDivElement, StaticProps>;
declare const _default: PicassoComponentWithRef<Props, HTMLDivElement, StaticProps>;
export default _default;
