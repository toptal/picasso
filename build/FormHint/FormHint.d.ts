import React, { FunctionComponent, ReactNode } from 'react';
import { StandardProps } from '../Picasso';
interface Props extends StandardProps {
    /** The text of the hint */
    children: ReactNode;
}
export declare const FormHint: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "children" | "className"> & import("@material-ui/core/styles").StyledComponentProps<"root" | "hint">>;
export default _default;
