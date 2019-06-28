import React, { ReactNode, FunctionComponent } from 'react';
import { StandardProps, SpacingType } from '../Picasso';
declare type DirectionType = 'row' | 'column';
declare type AlignItemsType = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
declare type JustifyContentType = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
interface Props extends StandardProps {
    /** Content of Container */
    children: ReactNode;
    /** margin-top for the container transformed to `em` */
    top?: SpacingType;
    /** margin-bottom for the container transformed to `em` */
    bottom?: SpacingType;
    /** margin-left for the container transformed to `em` */
    left?: SpacingType;
    /** margin-right for the container transformed to `em` */
    right?: SpacingType;
    /** padding for the container transformed to `em` */
    padded?: SpacingType;
    /** Whether container should act as inline element `display: inline-block` */
    inline?: boolean;
    /** Use flexbox */
    flex?: boolean;
    /** Set flex direction */
    direction?: DirectionType;
    /** Defines the align-items style property */
    alignItems?: AlignItemsType;
    /** Defines the justify-content style property */
    justifyContent?: JustifyContentType;
    /** Whether container has border or not */
    bordered?: boolean;
}
/**
 * Container component used for spacing 2 elements
 */
export declare const Container: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "alignItems" | "bottom" | "direction" | "justifyContent" | "left" | "right" | "top" | "flex" | "style" | "inline" | "children" | "className" | "bordered" | "padded"> & import("@material-ui/core/styles").StyledComponentProps<string>>;
export default _default;
