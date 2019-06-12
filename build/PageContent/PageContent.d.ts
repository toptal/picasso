import React, { FunctionComponent, ReactNode } from 'react';
import { StandardProps } from '../Picasso';
interface Props extends StandardProps {
    /** Custom components that render content of page */
    children: ReactNode;
}
export declare const PageContent: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "children" | "className"> & import("@material-ui/core/styles").StyledComponentProps<"content" | "root" | "fullWidth">>;
export default _default;
