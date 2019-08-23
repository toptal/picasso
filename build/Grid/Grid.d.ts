import { ReactNode, HTMLAttributes } from 'react';
import { GridItemsAlignment, GridDirection, GridJustification, GridWrap } from '@material-ui/core/Grid';
import GridItem from '../GridItem';
import { StandardProps, PicassoComponentWithRef, CompoundedComponentWithRef } from '../Picasso';
interface Props extends StandardProps, HTMLAttributes<HTMLElement> {
    /** Grid content containing Grid.Item */
    children?: ReactNode;
    /** Defines the space between the type item components */
    spacing?: 0 | 8 | 16 | 32 | 64 | 72 | 80;
    /** Defines the orientation of the grid */
    direction?: GridDirection;
    /** Defines the align-items style property based on the direction */
    alignItems?: GridItemsAlignment;
    /** Defines the justify-content style property based on the direction */
    justifyContent?: GridJustification;
    /** Defines the flex-wrap style property based on the direction */
    wrap?: GridWrap;
}
interface StaticProps {
    Item: typeof GridItem;
}
export declare const Grid: CompoundedComponentWithRef<Props, HTMLDivElement, StaticProps>;
declare const _default: PicassoComponentWithRef<Props, HTMLDivElement, StaticProps>;
export default _default;
