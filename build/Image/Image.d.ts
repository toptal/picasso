import React, { CSSProperties, FunctionComponent } from 'react';
import { StandardProps } from '../Picasso';
declare type VariantType = 'default' | 'circular';
export interface Props extends StandardProps {
    /** Image alt text */
    alt: string;
    className?: string;
    /** Image url */
    src: string;
    /** A set of image sources */
    srcSet?: string;
    /** Image shape type */
    variant?: VariantType;
    style?: CSSProperties;
}
export declare const Image: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "children" | "className" | "variant" | "src" | "srcSet" | "alt"> & import("@material-ui/core/styles").StyledComponentProps<"root" | "circular">>;
export default _default;
