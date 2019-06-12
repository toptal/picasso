import React, { ReactNode, FunctionComponent } from 'react';
import { StandardProps, SizeType } from '../Picasso';
declare type VariantType = 'default' | 'inherit';
export interface Props extends StandardProps {
    /** Text content for the `Loader` */
    children?: ReactNode;
    /** Shows loader as part of other inline elements such as text */
    inline?: boolean;
    /** Size of the `Loader` */
    size?: SizeType<'small' | 'medium' | 'large'>;
    /** Set the value if want to have static loader with the value specified */
    value?: number;
    /** Set this value if you want loader to inherit color of the parent, primary by default */
    variant?: VariantType;
}
export declare const Loader: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "size" | "style" | "inline" | "children" | "className" | "value" | "variant"> & import("@material-ui/core/styles").StyledComponentProps<"inline" | "label" | "wrapper" | "spinnerDefault" | "spinnerInherit">>;
export default _default;
