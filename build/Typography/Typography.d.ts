import React, { FunctionComponent, ReactNode, ReactType } from 'react';
import { PropTypes } from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography';
import { StandardProps, SizeType } from '../Picasso';
declare type VariantType = 'heading' | 'body';
declare type WeightType = 'thin' | 'light' | 'regular' | 'semibold';
declare type ColorType = 'blue' | 'green' | 'red' | 'yellow' | 'grey' | 'light-grey' | 'black' | 'inherit';
export interface Props extends StandardProps {
    /** Font variant inner text */
    variant?: VariantType;
    /** Text content */
    children?: ReactNode;
    /** Controls whether the Typography is inline or not */
    inline?: boolean;
    /** Text align of the inner text */
    align?: PropTypes.Alignment;
    /** Size of the inner text */
    size?: SizeType<'small' | 'medium' | 'large' | 'xlarge'> | 'inherit';
    /** Font weight of the inner text */
    weight?: WeightType;
    /** Invert color */
    invert?: boolean;
    /** Text color */
    color?: ColorType;
    /** Rendered HTML markup */
    as?: ReactType<TypographyProps>;
}
export declare const Typography: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "color" | "size" | "style" | "inline" | "weight" | "invert" | "children" | "className" | "variant" | "align" | "as"> & import("@material-ui/core").StyledComponentProps<"inherit" | "black" | "blue" | "green" | "grey" | "red" | "yellow" | "thin" | "invert" | "light" | "regular" | "bodySmall" | "bodyMedium" | "bodyLarge" | "bodyInherit" | "headingSmall" | "headingMedium" | "headingLarge" | "headingXlarge" | "semibold" | "lightGrey">>;
export default _default;
