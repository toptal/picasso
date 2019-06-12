import React, { ReactNode } from 'react';
import { StandardProps } from '../Picasso';
declare type VariantType = 'standard' | 'outlined' | 'filled';
export interface Props extends StandardProps {
    variant?: VariantType;
    htmlFor?: string;
    /** Label content */
    children?: ReactNode;
}
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "children" | "className" | "variant" | "htmlFor"> & import("@material-ui/core/styles").StyledComponentProps<"root">>;
export default _default;
