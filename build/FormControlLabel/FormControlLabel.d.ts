import React, { ReactElement, ReactNode } from 'react';
import { StandardProps } from '../Picasso';
interface Props extends StandardProps {
    /** A control element. For instance, it can be be a Radio, a Switch or a Checkbox */
    control: ReactElement;
    /** The text to be used in an enclosing label element */
    label?: ReactNode;
}
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "children" | "label" | "className" | "control"> & import("@material-ui/core/styles").StyledComponentProps<"disabled" | "root">>;
export default _default;
