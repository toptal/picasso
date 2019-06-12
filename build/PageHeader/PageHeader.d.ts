import React, { FunctionComponent, ReactNode, ReactElement } from 'react';
import { StandardProps } from '../Picasso';
declare type VariantType = 'dark' | 'light';
export interface Props extends StandardProps {
    /** Title which is displayed along the `Logo` */
    title: string;
    /** Link component to wrap `Logo`  */
    logoLink?: ReactElement;
    /** Content for the right side of the `Header`  */
    rightContent?: ReactNode;
    /** Color variant */
    variant?: VariantType;
}
export declare const PageHeader: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "children" | "title" | "className" | "variant" | "logoLink" | "rightContent"> & import("@material-ui/core/styles").StyledComponentProps<"content" | "left" | "right" | "dark" | "light" | "root" | "fullWidth" | "divider">>;
export default _default;
