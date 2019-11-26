import { ReactNode } from 'react';
import { TabsProps } from '@material-ui/core/Tabs';
import Tab from '../Tab';
import { ButtonOrAnchorProps, StandardProps, PicassoComponentWithRef, CompoundedComponentWithRef } from '../Picasso';
export interface Props extends StandardProps, Omit<ButtonOrAnchorProps, 'onChange'> {
    /** Tabs content containing Tab components */
    children: ReactNode;
    /** Callback fired when the value changes. */
    onChange?: TabsProps['onChange'];
    /** The value of the currently selected Tab. If you don't want any selected Tab, you can set this property to false. */
    value: TabsProps['value'];
}
interface StaticProps {
    Tab: typeof Tab;
}
export declare const Tabs: CompoundedComponentWithRef<Props, HTMLButtonElement, StaticProps>;
declare const _default: PicassoComponentWithRef<Props, HTMLButtonElement, StaticProps>;
export default _default;
