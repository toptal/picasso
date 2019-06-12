import React from 'react';
import { StandardProps } from '../Picasso';
declare type VariantType = 'determinate' | 'indeterminate' | 'static';
interface Props extends StandardProps {
    /** Size of the component */
    size?: number;
    /** Current value for the `static` or `indeterminate` loaders */
    value?: number;
    /** Variant of the `Loader` */
    variant?: VariantType;
}
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "size" | "style" | "children" | "className" | "value" | "variant"> & import("@material-ui/core/styles").StyledComponentProps<"root">>;
export default _default;
