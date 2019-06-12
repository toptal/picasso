import React, { ReactNode } from 'react';
import { JssProps } from '../Picasso';
interface Props extends JssProps {
    children?: ReactNode;
}
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "children"> & import("@material-ui/core/styles").StyledComponentProps<"root">>;
export default _default;
