import React, { CSSProperties } from 'react';
import { StandardProps } from '../Picasso';
declare type VariantType = 'default' | 'white' | 'black';
export interface Props extends StandardProps {
    /** Whether logo should be shown as TT emblem or full word mark */
    emblem?: boolean;
    /** Variant of the `Logo` */
    variant?: VariantType;
    style?: CSSProperties;
}
export declare const Logo: React.ForwardRefExoticComponent<Props & React.RefAttributes<SVGSVGElement>>;
declare const _default: React.ComponentType<Pick<Props & React.RefAttributes<SVGSVGElement>, "style" | "ref" | "className" | "key" | "variant" | "emblem"> & import("@material-ui/core/styles").StyledComponentProps<"black" | "white" | "default" | "logo" | "logoEmblem">>;
export default _default;
