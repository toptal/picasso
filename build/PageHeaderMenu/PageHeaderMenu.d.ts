import React, { FunctionComponent, ReactNode } from 'react';
import { StandardProps } from '../Picasso';
export interface Props extends StandardProps {
    /** User full name to display */
    name: string;
    /** User's organization name */
    organization?: string;
    /** Photo url or custom Avatar component */
    avatar?: ReactNode;
    /** Menu content */
    children: ReactNode;
}
export declare const PageHeaderMenu: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "children" | "avatar" | "className" | "name" | "organization"> & import("@material-ui/core/styles").StyledComponentProps<"content" | "avatar" | "name" | "truncateText">>;
export default _default;
