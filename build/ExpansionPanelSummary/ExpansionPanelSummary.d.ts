import { ReactNode } from 'react';
import { StandardProps } from '../Picasso';
interface Props extends StandardProps {
    expandIcon?: ReactNode;
    children?: ReactNode;
}
declare const _default: import("react").FunctionComponent<Pick<Props, "style" | "children" | "expandIcon" | "className"> & Partial<import("../Picasso").JssProps>>;
export default _default;
