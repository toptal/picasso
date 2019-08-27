import React, { ReactNode, HTMLAttributes } from 'react';
import { StandardProps } from '../Picasso';
export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
    /** List of `Button` components which you want to render as `ButtonGroup` */
    children?: ReactNode;
}
export declare const ButtonGroup: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>>;
declare const _default: React.ComponentType<Pick<any, string | number | symbol> & import("@material-ui/core/styles").StyledComponentProps<"button" | "active" | "root">>;
export default _default;
