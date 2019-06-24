import React, { ReactNode, FunctionComponent, ChangeEvent } from 'react';
import { StandardProps } from '../Picasso';
export interface Props extends StandardProps {
    /** Always visible part of accordion */
    children?: ReactNode;
    /** Collapsible content of `Accordion` */
    content: ReactNode;
    /** Define accordion content state, whether it should be collapsed or displayed */
    expanded?: boolean;
    /** Callback invoked when `Accordion` item is toggled */
    onChange?: (event: ChangeEvent<{}>, expanded: boolean) => void;
}
export declare const Accordion: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "content" | "style" | "expanded" | "children" | "className" | "onChange"> & import("@material-ui/core/styles").StyledComponentProps<"expanded" | "details" | "summary" | "root" | "expandIcon">>;
export default _default;
