import React, { ReactNode, HTMLAttributes, ReactElement } from 'react';
import { BaseProps } from '../Picasso';
import { VariantType } from '../Container';
export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
    /** Children components */
    children: ReactNode;
    /** Color variant of Banner */
    variant?: VariantType;
    /** Add <Icon /> before Banner content  */
    icon?: ReactElement;
}
export declare const PageBanner: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>>;
export default PageBanner;
