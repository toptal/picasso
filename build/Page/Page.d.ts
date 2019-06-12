import React, { FunctionComponent, ReactNode } from 'react';
import PageHeader from '../PageHeader';
import PageHeaderMenu from '../PageHeaderMenu';
import PageFooter from '../PageFooter';
import PageContent from '../PageContent';
import { StandardProps, PicassoComponent } from '../Picasso';
import { PageContextProps } from './types';
interface Props extends StandardProps {
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
}
export declare const PageContext: React.Context<PageContextProps>;
export declare const Page: FunctionComponent<Props> & StaticProps;
declare const _default: PicassoComponent<Props, StaticProps>;
export default _default;
