import { ReactNode, FunctionComponent } from 'react';
import { BaseProps, SpacingType } from '../Picasso';
declare type DirectionType = 'row' | 'column';
declare type AlignItemsType = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
declare type JustifyContentType = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
interface Props extends BaseProps {
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
    /** Content of Container */
    children: ReactNode;
}
/**
 * Container component used for spacing 2 elements
 */
export declare const Container: FunctionComponent<Props>;
export default Container;
