import React, { ReactNode, HTMLAttributes } from 'react';
import PageHeader from '../PageHeader';
import PageHeaderMenu from '../PageHeaderMenu';
import PageFooter from '../PageFooter';
import PageContent from '../PageContent';
import PageSidebar from '../lab/Sidebar';
import { StandardProps, PicassoComponentWithRef, CompoundedComponentWithRef } from '../Picasso';
import { PageContextProps } from './types';
export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
    /** Component becomes responsive with width 100% and overrides width prop */
    fullWidth?: boolean;
    /** Define container width in `rem` */
    width?: number;
    /** Horizontally centers the content */
    centered?: boolean;
    /** Children components (`Page.Header`, `Page.Content`, `Page.Footer`) */
    children: ReactNode;
}
interface StaticProps {
    Header: typeof PageHeader;
    HeaderMenu: typeof PageHeaderMenu;
    Content: typeof PageContent;
    Footer: typeof PageFooter;
    Sidebar: typeof PageSidebar;
}
export declare const PageContext: React.Context<PageContextProps>;
export declare const Page: CompoundedComponentWithRef<Props, HTMLDivElement, StaticProps>;
declare const _default: PicassoComponentWithRef<Props, HTMLElement, StaticProps>;
export default _default;
