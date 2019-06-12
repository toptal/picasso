import React, { PureComponent } from 'react';
import { StandardProps, SizeType } from '../Picasso';
declare type VariantType = 'square' | 'portrait' | 'landscape';
export interface Props extends StandardProps {
    /** Alt text */
    alt?: string;
    /** User full name to display initials on the avatar */
    name: string;
    /**
     * Size
     * @default xsmall
     */
    size?: SizeType<'xsmall' | 'small' | 'medium' | 'large'>;
    /** Photo url */
    src?: string;
    /**
     * Variant of the avatar shape
     * @default square
     */
    variant?: VariantType;
}
export declare class Avatar extends PureComponent<Props> {
    static defaultProps: Partial<Props>;
    static displayName: string;
    renderLogo(): JSX.Element | null;
    renderInitials(): JSX.Element | null;
    render(): JSX.Element;
}
declare const _default: React.ComponentType<Pick<Pick<Props, never> & Partial<Pick<Props, "size" | "style" | "classes" | "className" | "name" | "variant" | "src" | "alt">> & Partial<Pick<Partial<Props>, never>>, "size" | "style" | "className" | "name" | "variant" | "src" | "alt"> & import("@material-ui/core/styles").StyledComponentProps<"medium" | "text" | "large" | "small" | "square" | "image" | "root" | "xsmall" | "logo" | "portrait" | "landscape" | "clippedCorner" | "textContainer" | "logoContainer">>;
export default _default;
