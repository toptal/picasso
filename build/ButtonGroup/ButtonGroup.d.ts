import React, { ReactNode, FunctionComponent } from 'react';
import { StandardProps } from '../Picasso';
interface Props extends StandardProps {
    /** List of `Button` components which you want to render as `ButtonGroup` */
    children?: ReactNode;
}
export declare const ButtonGroup: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<any, string | number | symbol> & import("@material-ui/core/styles").StyledComponentProps<"button" | "root">>;
export default _default;
