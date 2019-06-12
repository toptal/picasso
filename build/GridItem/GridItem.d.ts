import React, { ReactNode, FunctionComponent } from 'react';
import { GridSize } from '@material-ui/core/Grid';
import { StandardProps } from '../Picasso';
interface Props extends StandardProps {
    /** Content of Grid.Item */
    children?: ReactNode;
    /** Defines the number of grids the component is going to use. It's applied for all the screen sizes with the lowest priority */
    small?: GridSize;
    /** Defines the number of grids the component is going to use. It's applied for the medium breakpoint and wider screens */
    medium?: GridSize;
    /** Defines the number of grids the component is going to use. It's applied for the large breakpoint and wider screens */
    large?: GridSize;
}
export declare const GridItem: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "medium" | "style" | "large" | "small" | "children" | "className"> & import("@material-ui/core/styles").StyledComponentProps<never>>;
export default _default;
