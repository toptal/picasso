import React, { FunctionComponent, ReactNode } from 'react';
import { StandardProps, SizeType } from '../Picasso';
declare type AlignmentType = boolean | 'auto';
export interface Props extends StandardProps {
    /** User full name to display */
    name: string;
    /** Photo url or custom Avatar component */
    avatar?: ReactNode;
    /** Size */
    size?: SizeType<'xsmall' | 'small'>;
    /** Title that is rendered on the right of name */
    title?: string;
    /** Invert color */
    invert?: boolean;
    /**
     * Center text vertically
     *
     * * auto - if no children is provided text will be centered
     * * manual - based on `center` prop `boolean` value
     */
    center?: AlignmentType;
    /** Additional content of UserBadge */
    children?: ReactNode;
}
export declare const UserBadge: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "center" | "size" | "style" | "invert" | "children" | "title" | "avatar" | "className" | "name"> & import("@material-ui/core/styles").StyledComponentProps<"title" | "root" | "avatar" | "name">>;
export default _default;
