import React, { FunctionComponent, ReactNode } from 'react';
import { StandardProps } from '../Picasso';
export interface Props extends StandardProps {
    /**
     * If true, the tab will be disabled
     * @default false
     */
    disabled?: boolean;
    /** You can provide your own value. Otherwise, we fallback to the child position index */
    value?: any;
    /** The label element */
    label?: ReactNode;
    selected?: boolean;
    onChange?: (event: React.ChangeEvent<{
        checked: boolean;
    }>, value: any) => void;
    onClick?: React.EventHandler<any>;
}
export declare const Tab: FunctionComponent<Props>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<Props>, "style" | "disabled" | "children" | "label" | "selected" | "className" | "onChange" | "onClick" | "value"> & import("@material-ui/core/styles").StyledComponentProps<never>>;
export default _default;
