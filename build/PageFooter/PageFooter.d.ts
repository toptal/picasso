import React, { FunctionComponent, ReactNode } from 'react';
import { StandardProps } from '../Picasso';
interface Props extends StandardProps {
    /** Content for the right side of the `Footer`  */
    rightContent?: ReactNode;
}
export declare const PageFooter: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "children" | "className" | "rightContent"> & import("@material-ui/core/styles").StyledComponentProps<"content" | "left" | "right" | "root" | "fullWidth" | "centered">>;
export default _default;
