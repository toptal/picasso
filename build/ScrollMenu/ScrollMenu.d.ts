import React from 'react';
import { StandardProps } from '../Picasso';
export interface Props extends StandardProps {
    selectedIndex?: number | null;
}
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "children" | "className" | "selectedIndex"> & import("@material-ui/core/styles").StyledComponentProps<"menu" | "scrollView">>;
export default _default;
