import React, { CSSProperties, FunctionComponent } from 'react';
import { StandardProps } from '../Picasso';
declare type VariantType = 'default' | 'white' | 'black';
interface Props extends StandardProps {
    /** Whether logo should be shown as TT emblem or full word mark */
    emblem?: boolean;
    /** Variant of the `Logo` */
    variant?: VariantType;
    style?: CSSProperties;
}
export declare const Logo: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "children" | "className" | "variant" | "emblem"> & import("@material-ui/core/styles").StyledComponentProps<"black" | "white" | "default" | "logo" | "logoEmblem">>;
export default _default;
