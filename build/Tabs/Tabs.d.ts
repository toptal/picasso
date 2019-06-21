import React, { FunctionComponent, ReactNode } from 'react';
import Tab from '../Tab';
import { StandardProps, PicassoComponent } from '../Picasso';
export interface Props extends StandardProps {
    /** Tabs content containing Tab components */
    children: ReactNode;
    /** Callback fired when the value changes. */
    onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
    /** The value of the currently selected Tab. If you don't want any selected Tab, you can set this property to false. */
    value: any;
}
interface StaticProps {
    Tab: typeof Tab;
}
export declare const Tabs: FunctionComponent<Props> & StaticProps;
declare const _default: PicassoComponent<Props, StaticProps>;
export default _default;
