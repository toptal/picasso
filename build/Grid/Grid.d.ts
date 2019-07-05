import { ReactNode, FunctionComponent, HTMLAttributes } from 'react';
import { GridSpacing, GridItemsAlignment, GridDirection, GridJustification, GridWrap } from '@material-ui/core/Grid';
import GridItem from '../GridItem';
import { StandardProps, PicassoComponent } from '../Picasso';
interface Props extends StandardProps, HTMLAttributes<HTMLElement> {
    /** Grid content containing Grid.Item */
    children?: ReactNode;
    /** Defines the space between the type item components */
    spacing?: GridSpacing;
    /** Defines the orientation of the grid */
    direction?: GridDirection;
    /** Defines the align-items style property based on the direction */
    alignItems?: GridItemsAlignment;
    /** Defines the justify-content style property based on the direction */
    justify?: GridJustification;
    /** Defines the flex-wrap style property based on the direction */
    wrap?: GridWrap;
}
interface StaticProps {
    Item: typeof GridItem;
}
export declare const Grid: FunctionComponent<Props> & StaticProps;
declare const _default: PicassoComponent<Props, StaticProps>;
export default _default;
